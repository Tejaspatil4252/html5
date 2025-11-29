import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const PlanDashboard = ({ selectedBranch, user }) => {
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedPlanForAdd, setSelectedPlanForAdd] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null });
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    mobileNo: "",
  });
  const [loading, setLoading] = useState(false);
  const [activePlans, setActivePlans] = useState([]);
  const [queuedPlans, setQueuedPlans] = useState({});
  const [jumpLoading, setJumpLoading] = useState({});
  const [pricingData, setPricingData] = useState(null);
  const [availableProducts, setAvailableProducts] = useState([]);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    productId: null,
    planName: null,
    billingCycle: null,
  });

  // ✅ DYNAMIC: Fetch available products from pricing data
  useEffect(() => {
    if (pricingData) {
      const products = Object.keys(pricingData);
      setAvailableProducts(products);

      // Initialize queued plans structure dynamically
      const initialQueuedPlans = {};
      products.forEach((product) => {
        initialQueuedPlans[product] = [];
      });
      setQueuedPlans(initialQueuedPlans);
    }
  }, [pricingData]);

  // Fetch data
  useEffect(() => {
    if (selectedBranch) {
      fetchActivePlans();
      fetchQueuedPlans();
      fetchUsers();
      fetchPricingData();
    }
  }, [selectedBranch]);

  // Fetch pricing data
  const fetchPricingData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/api/pricing/all", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPricingData(data);
      }
    } catch (error) {
      console.error("Failed to fetch pricing data:", error);
    }
  };

  // Get plan theme based on plan name
  const getPlanTheme = (planName) => {
    const planNameLower = planName?.toLowerCase() || "";

    if (planNameLower.includes("silver")) {
      return {
        gradient: "from-gray-400 to-gray-600",
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-800",
        badge: "bg-gray-100 text-gray-800",
        price: "text-gray-600",
        light: "bg-gray-500/10",
      };
    } else if (planNameLower.includes("gold")) {
      return {
        gradient: "from-yellow-500 to-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-800",
        badge: "bg-yellow-100 text-yellow-800",
        price: "text-yellow-600",
        light: "bg-yellow-500/10",
      };
    } else if (planNameLower.includes("diamond")) {
      return {
        gradient: "from-cyan-400 to-blue-500",
        bg: "bg-cyan-50",
        border: "border-cyan-200",
        text: "text-cyan-800",
        badge: "bg-cyan-100 text-cyan-800",
        price: "text-cyan-600",
        light: "bg-cyan-500/10",
      };
    } else {
      return {
        gradient: "from-red-500 to-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
        badge: "bg-red-100 text-red-800",
        price: "text-red-600",
        light: "bg-red-500/10",
      };
    }
  };

  // ✅ DYNAMIC: Enrich active plans with product info
  const getEnrichedActivePlans = () => {
    if (!pricingData || !activePlans.length || !selectedBranch) return [];

    return activePlans.map((plan) => {
      // Get product name from pricing data
      const productName = plan.productId?.replace("1", "") || plan.productId;
      const productData = pricingData[productName];

      if (!plan.planId) {
        return {
          ...plan,
          productName: productName,
          planName: "No Active Plan",
          userLimit: 0,
          features: [],
          price: 0,
        };
      }

      let planDetails = null;

      if (productData) {
        ["monthly", "quarterly", "yearly"].forEach((cycle) => {
          if (productData[cycle]) {
            const found = productData[cycle].find(
              (p) => p.planId === plan.planId
            );
            if (found) planDetails = found;
          }
        });
      }

      const userLimit = planDetails
        ? extractUserLimitFromFeatures(planDetails.features || [])
        : plan.userLimit || 0;
      const planName = planDetails?.plan || "Plan Not Found";
      const price = planDetails?.discountedPrice || 0;

      return {
        ...plan,
        productName: productName,
        planName: planName,
        userLimit: userLimit,
        features: planDetails?.features || [],
        price: price,
        theme: getPlanTheme(planName),
      };
    });
  };

  const extractUserLimitFromFeatures = (features) => {
    for (const feature of features) {
      if (feature.toLowerCase().includes("user")) {
        const match = feature.match(/\d+/);
        if (match) return parseInt(match[0]);
      }
    }
    return 0;
  };

  // ✅ DYNAMIC: Get users for plan based on assignedPlanId
  const getUsersForPlan = (planId, productId) => {
    return users.filter((user) => user.assignedPlanId === planId);
  };

  const canAddMoreUsers = (plan) => {
    const planUsers = getUsersForPlan(plan.planId, plan.productId);
    return planUsers.length < plan.userLimit;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // API Functions
  const fetchActivePlans = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:8080/api/subscriptions/branch/${selectedBranch.branchId}/active`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const plans = await response.json();
        setActivePlans(plans || []);
      }
    } catch (error) {
      console.error("Failed to fetch active plans:", error);
      toast.error("Failed to load subscription details");
    }
  };

  // ✅ DYNAMIC: Fetch queued plans for all available products
  const fetchQueuedPlans = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!availableProducts.length) return;

      // Fetch queue for each available product
      const queuePromises = availableProducts.map((product) =>
        fetch(
          `http://localhost:8080/api/subscriptions/queue?branchId=${selectedBranch.branchId}&productId=${product}1`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ).then((response) =>
          response.ok ? response.json() : { queueItems: [] }
        )
      );

      const queueResults = await Promise.all(queuePromises);

      // Update queued plans state dynamically
      const updatedQueuedPlans = {};
      availableProducts.forEach((product, index) => {
        updatedQueuedPlans[product] = enrichQueueWithPlanDetails(
          queueResults[index].queueItems || [],
          product
        );
      });

      setQueuedPlans(updatedQueuedPlans);
    } catch (error) {
      console.error("Failed to fetch queued plans:", error);
    }
  };

  // ✅ DYNAMIC: Enrich queue with plan details
  const enrichQueueWithPlanDetails = (queueItems, productName) => {
    if (!pricingData || !queueItems.length) return queueItems;

    const productData = pricingData[productName];

    return queueItems.map((queueItem) => {
      let planName = queueItem.planName;
      let billingCycle = "monthly";
      let features = [];
      let price = 0;

      ["monthly", "quarterly", "yearly"].forEach((cycle) => {
        if (productData && productData[cycle]) {
          const foundPlan = productData[cycle].find(
            (p) => p.planId === queueItem.planId
          );
          if (foundPlan) {
            planName = foundPlan.plan;
            billingCycle = cycle;
            features = foundPlan.features || [];
            price = foundPlan.discountedPrice || 0;
          }
        }
      });

      const userLimit = extractUserLimitFromFeatures(features);

      return {
        ...queueItem,
        productName: productName,
        planName: planName,
        billingCycle: billingCycle,
        userLimit: userLimit,
        price: price,
        features: features,
        theme: getPlanTheme(planName),
        fullPlanName: `${planName} (${billingCycle})`,
      };
    });
  };

  // Fixed data loading order
  useEffect(() => {
    if (selectedBranch) {
      const fetchAllData = async () => {
        await fetchPricingData();
        // fetchQueuedPlans will be called via pricingData useEffect
        fetchActivePlans();
        fetchUsers();
      };

      fetchAllData();
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (pricingData && selectedBranch && availableProducts.length > 0) {
      fetchQueuedPlans();
    }
  }, [pricingData, selectedBranch, availableProducts]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:8080/api/branch-users/branches/${selectedBranch.branchId}?companyId=${selectedBranch.companyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success) setUsers(data.users || []);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DYNAMIC: Handle jump to next plan with correct productId
  const handleJumpToNextPlan = async (productId) => {
    console.log("🔄 Jump called with productId:", productId);
    try {
      setJumpLoading((prev) => ({ ...prev, [productId]: true }));
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `http://localhost:8080/api/subscriptions/jump?branchId=${selectedBranch.branchId}&productId=${productId}`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.ok) {
        toast.success(`Successfully activated next plan`);
        window.location.reload();
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Failed to activate next plan");
      }
    } catch (error) {
      console.error("Jump error:", error);
      toast.error("Failed to activate next plan");
    } finally {
      setJumpLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  

const handleAddUser = async () => {
  // ✅ COMPREHENSIVE VALIDATION
  const validationErrors = validateUserForm(newUser);
  
  if (Object.keys(validationErrors).length > 0) {
    // Show the first validation error
    const firstError = Object.values(validationErrors)[0];
    toast.error(firstError);
    return;
  }
  
  if (!selectedPlanForAdd) {
    toast.error("Please select a plan first");
    return;
  }

  try {
    setLoading(true);
    const token = localStorage.getItem("authToken");

    const response = await fetch(
      `http://localhost:8080/api/branch-users/branches/${selectedBranch.branchId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId: selectedBranch.companyId,
          userName: newUser.username.trim(),
          email: newUser.email.trim(),
          mobileNo: newUser.mobileNo.trim(),
          password: newUser.password,
          assignedPlanId: selectedPlanForAdd.planId,
          createdBy: user?.userId || "admin",
        }),
      }
    );

    const data = await response.json();
    if (data.success) {
      toast.success("User created successfully!");
      setNewUser({ username: "", password: "", email: "", mobileNo: "" });
      setSelectedPlanForAdd(null);
      setShowAddForm(false);
      fetchUsers();
    } else {
      toast.error(data.message || "Failed to create user");
    }
  } catch (error) {
    toast.error("Failed to create user");
  } finally {
    setLoading(false);
  }
};

// ✅ ADD THIS VALIDATION FUNCTION
const validateUserForm = (userData) => {
  const errors = {};
  
  // Username validation
  if (!userData.username?.trim()) {
    errors.username = "Username is required";
  } else if (userData.username.trim().length < 2) {
    errors.username = "Username must be at least 2 characters";
  }
  
  // Email validation
  if (!userData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!userData.email.match(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
    errors.email = "Please enter a valid email address";
  }
  
  // Mobile validation
  if (!userData.mobileNo?.trim()) {
    errors.mobileNo = "Mobile number is required";
  } else if (!userData.mobileNo.match(/^\d{10}$/)) {
    errors.mobileNo = "Mobile number must be exactly 10 digits";
  }
  
  // Password validation
  if (!userData.password?.trim()) {
    errors.password = "Password is required";
  } else if (userData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  
  return errors;
};

const handleUpdateUser = async () => {
  // ✅ COMPREHENSIVE VALIDATION
  const validationErrors = validateUpdateUserForm(editingUser);
  
  if (Object.keys(validationErrors).length > 0) {
    // Show the first validation error
    const firstError = Object.values(validationErrors)[0];
    toast.error(firstError);
    return;
  }

  try {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `http://localhost:8080/api/branch-users/branches/${selectedBranch.branchId}/users/${editingUser.autoId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId: selectedBranch.companyId,
          userName: editingUser.userName.trim(),
          email: editingUser.email.trim(),
          mobileNo: editingUser.mobileNo.trim(),
          newPassword: editingUser.newPassword || "",
          editedBy: user?.userId || "admin",
        }),
      }
    );

    const data = await response.json();
    if (data.success) {
      toast.success("User updated successfully!");
      setEditingUser(null);
      setShowUpdateForm(false);
      fetchUsers();
    } else {
      toast.error(data.message || "Failed to update user");
    }
  } catch (error) {
    toast.error("Failed to update user");
  } finally {
    setLoading(false);
  }
};

// ✅ ADD THIS VALIDATION FUNCTION FOR UPDATE
const validateUpdateUserForm = (userData) => {
  const errors = {};
  
  // Username validation
  if (!userData.userName?.trim()) {
    errors.userName = "Username is required";
  } else if (userData.userName.trim().length < 2) {
    errors.userName = "Username must be at least 2 characters";
  }
  
  // Email validation
  if (!userData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!userData.email.match(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
    errors.email = "Please enter a valid email address";
  }
  
  // Mobile validation
  if (!userData.mobileNo?.trim()) {
    errors.mobileNo = "Mobile number is required";
  } else if (!userData.mobileNo.match(/^\d{10}$/)) {
    errors.mobileNo = "Mobile number must be exactly 10 digits";
  }
  
  // Password validation (optional but must be strong if provided)
  if (userData.newPassword && userData.newPassword.length < 6) {
    errors.newPassword = "Password must be at least 6 characters";
  }
  
  return errors;
};

  const handleConfirmDelete = async () => {
    if (!deleteModal.user) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:8080/api/branch-users/branches/${
          selectedBranch.branchId
        }/users/${deleteModal.user.autoId}?companyId=${
          selectedBranch.companyId
        }&editedBy=${user?.userId || "admin"}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(
          `User "${deleteModal.user.userName}" deleted successfully!`
        );
        fetchUsers();
        setDeleteModal({ isOpen: false, user: null });
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const startAddUser = (plan) => {
    setSelectedPlanForAdd(plan);
    setShowAddForm(true);
  };

  const startEditUser = (user) => {
    setEditingUser({ ...user, newPassword: "" });
    setShowUpdateForm(true);
  };

  if (!selectedBranch) return null;

  const enrichedActivePlans = getEnrichedActivePlans();

  // ✅ DYNAMIC: Calculate users per product
  const getUsersPerProduct = () => {
    const usersPerProduct = {};
    availableProducts.forEach((product) => {
      usersPerProduct[product] = users.filter((user) => {
        if (!user.assignedPlanId) return false;
        // Check if user's assigned plan belongs to this product
        // Check if user's assigned plan belongs to this product
        const userProduct = user.assignedPlanId.replace(/\d+$/, ""); // Remove numbers from end
        return userProduct === product.replace("1", "");
      }).length;
    });
    return usersPerProduct;
  };

  const usersPerProduct = getUsersPerProduct();

  if (enrichedActivePlans.length === 0) {
    return (
      <div className="py-12 bg-white text-center">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">📋</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          No Active Plans
        </h3>
        <p className="text-gray-600 mb-8 text-lg">
          You don't have any active plans for{" "}
          <strong>{selectedBranch.branchName}</strong>.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 2000, behavior: "smooth" })}
          className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold"
        >
          View Pricing Plans
        </button>
      </div>
    );
  }

  // Queue Plan Card Component
  const QueuePlanCard = ({ queuedPlan }) => (
    <div
      className={`bg-white rounded-2xl p-6 border ${queuedPlan.theme?.border} shadow-sm`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 ${queuedPlan.theme?.badge} rounded-full text-xs font-medium`}
            >
              Position #{queuedPlan.position}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {queuedPlan.billingCycle}
            </span>
          </div>

          <h4 className="font-semibold text-gray-800 text-lg">
            {queuedPlan.fullPlanName}
          </h4>

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span>👥 {queuedPlan.userLimit} Users</span>
            <span className={`font-semibold ${queuedPlan.theme?.price}`}>
              {formatPrice(queuedPlan.price)}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500">Purchased</div>
          <div className="text-sm font-medium text-gray-800">
            {formatDate(queuedPlan.purchasedDate)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-8 mt-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-3 shadow-lg border border-red-100 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              📊 Plan Dashboard - {selectedBranch.branchName}
            </h2>
          </div>
          <p className="text-gray-600">Manage your subscriptions and users</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Active Subscriptions - Full Width */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Active Subscriptions
              </h3>
              <div className="text-sm text-gray-500">
                {enrichedActivePlans.length} Active Plan
                {enrichedActivePlans.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div
              className={`grid ${
                enrichedActivePlans.length === 1
                  ? "grid-cols-1 max-w-2xl mx-auto"
                  : "grid-cols-1 lg:grid-cols-2"
              } gap-6`}
            >
              {enrichedActivePlans.map((plan) => {
                const planUsers = getUsersForPlan(plan.planId, plan.productId);
                const usagePercentage =
                  (planUsers.length / plan.userLimit) * 100;
                const daysRemaining = getDaysRemaining(plan.endDate);
                const nextInQueue = queuedPlans[plan.productName]?.[0];
                const hasUpcomingPlan = !!nextInQueue;

                return (
                  <div
                    key={plan.subscriptionId}
                    className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col ${
                      enrichedActivePlans.length === 1 ? "max-w-2xl" : ""
                    }`}
                  >
                    {/* Plan Header with Dynamic Colors */}
                    <div
                      className={`bg-gradient-to-r ${plan.theme?.gradient} p-6 text-white`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-bold mb-2">
                            {plan.productName} {plan.planName}
                          </h4>
                          <div className="flex items-center gap-3">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                              {formatPrice(plan.price)}
                            </span>
                            <span className="text-white/80 text-sm">
                              {plan.billingCycle}
                            </span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                          <span className="text-lg">
                            {plan.productName === "EYMS" ? "💼" : "🚀"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Plan Details */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="space-y-4 flex-1">
                        {/* Dates */}
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <div className="text-gray-600">Start Date</div>
                            <div className="font-semibold text-gray-800">
                              {formatDate(plan.startDate)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-600">End Date</div>
                            <div className="font-semibold text-gray-800">
                              {formatDate(plan.endDate)}
                            </div>
                          </div>
                        </div>

                        {/* Validity & Usage */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">
                              Days Remaining
                            </span>
                            <div
                              className={`font-semibold ${
                                daysRemaining < 7
                                  ? "text-red-600"
                                  : "text-gray-800"
                              }`}
                            >
                              {daysRemaining} days
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>User Allocation</span>
                              <span className="font-semibold">
                                {planUsers.length} / {plan.userLimit}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-1000 ${
                                  usagePercentage < 70
                                    ? "bg-green-500"
                                    : usagePercentage < 90
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width: `${Math.min(usagePercentage, 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Upcoming Plan */}
                        {hasUpcomingPlan && (
                          <div
                            className={`bg-gradient-to-r ${nextInQueue.theme?.light} rounded-xl p-3 border ${nextInQueue.theme?.border}`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <div className="text-xs text-gray-600 mb-1">
                                  Upcoming Plan
                                </div>
                                <div className="font-semibold text-gray-800 text-sm">
                                  {nextInQueue.planName} •{" "}
                                  {nextInQueue.billingCycle}
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  setConfirmModal({
                                    isOpen: true,
                                    productId: plan.productId,
                                    planName: nextInQueue.planName,
                                    billingCycle: nextInQueue.billingCycle,
                                  })
                                }
                                disabled={jumpLoading[plan.productId]} // ← FIXED
                                className={`px-3 py-1 rounded-lg font-semibold text-xs ${
                                  jumpLoading[plan.productId] // ← FIXED
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-red-600 text-white hover:bg-red-700"
                                }`}
                              >
                                {jumpLoading[plan.productId]
                                  ? "Activating..."
                                  : "Activate"}{" "}
                                {/* ← FIXED */}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Add User Button */}
                      <button
                        onClick={() => startAddUser(plan)}
                        disabled={!canAddMoreUsers(plan) || loading}
                        className={`w-full py-3 rounded-xl font-semibold transition-all mt-auto ${
                          !canAddMoreUsers(plan) || loading
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl"
                        }`}
                      >
                        {!canAddMoreUsers(plan)
                          ? "User Limit Reached"
                          : `Add User to ${plan.productName}`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC: User Summary */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                User Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableProducts.map((product) => (
                  <div
                    key={product}
                    className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200"
                  >
                    <div className="text-3xl font-bold text-blue-600">
                      {usersPerProduct[product] || 0}
                    </div>
                    <div className="text-sm text-blue-800 mt-2">
                      {product} Users
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            User Management ({users.length})
          </h3>

          {loading ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👤</span>
              </div>
              No users added yet
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((user) => {
                const userPlan = activePlans.find(
                  (plan) => plan.planId === user.assignedPlanId
                );
                const productName = userPlan
                  ? userPlan.productId?.replace("1", "")
                  : "";

                return (
                  <div
                    key={user.autoId}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {user.userName?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        {/* Plan Badge */}
                        {user.assignedPlanId && (
                          <div className="absolute -bottom-1 -right-1">
                            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                              <span className="text-[8px] text-white font-bold">
                                {productName?.charAt(0) || "P"}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-gray-800">
                            {user.userName}
                          </div>
                          {/* Plan Text Badge */}
                          {user.assignedPlanId && productName && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {productName}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEditUser(user)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, user })}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modals (same as before) */}
        {showAddForm && selectedPlanForAdd && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">
                Add User to {selectedPlanForAdd.productType}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className="w-full border rounded-lg p-3"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full border rounded-lg p-3"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full border rounded-lg p-3"
                />
                <input
                  type="tel"
                  placeholder="Mobile No"
                  value={newUser.mobileNo}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      mobileNo: e.target.value,
                    }))
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  disabled={loading}
                  className={`flex-1 py-2 rounded-lg ${
                    loading
                      ? "bg-gray-400"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {loading ? "Adding..." : "Add User"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showUpdateForm && editingUser && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Update User</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={editingUser.userName || ""}
                  onChange={(e) =>
                    setEditingUser((prev) => ({
                      ...prev,
                      userName: e.target.value,
                    }))
                  }
                  className="w-full border rounded-lg p-3"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editingUser.email || ""}
                  onChange={(e) =>
                    setEditingUser((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full border rounded-lg p-3"
                />
                <input
                  type="tel"
                  placeholder="Mobile No"
                  value={editingUser.mobileNo || ""}
                  onChange={(e) =>
                    setEditingUser((prev) => ({
                      ...prev,
                      mobileNo: e.target.value,
                    }))
                  }
                  className="w-full border rounded-lg p-3"
                />
                <input
                  type="password"
                  placeholder="New Password (optional)"
                  value={editingUser.newPassword || ""}
                  onChange={(e) =>
                    setEditingUser((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowUpdateForm(false)}
                  className="flex-1 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUser}
                  disabled={loading}
                  className={`flex-1 py-2 rounded-lg ${
                    loading
                      ? "bg-gray-400"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteModal.isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center">
              <h3 className="text-xl font-bold mb-2">Delete User</h3>
         <p className="text-gray-600 mb-4">
    ⚠️ This action cannot be undone! Are you sure you want to 
    <strong> permanently delete</strong> {" "}
    <strong>{deleteModal.user?.userName}</strong>?
</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal({ isOpen: false, user: null })}
                  className="flex-1 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Confirmation Modal */}
        {confirmModal.isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Confirm Plan Activation
                </h3>
                <p className="text-gray-600">
                  Are you sure you want to activate{" "}
                  <strong>
                    {confirmModal.planName} ({confirmModal.billingCycle})
                  </strong>
                  ?
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  This will replace your current{" "}
                  {confirmModal.productId?.replace("1", "")} plan.
                </p>
              </div>

              <div className="flex gap-3">
                {/* Cancel Button */}
                <button
                  onClick={() =>
                    setConfirmModal({
                      isOpen: false,
                      productId: null,
                      planName: null,
                      billingCycle: null,
                    })
                  }
                  className="flex-1 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all font-semibold"
                >
                  Cancel
                </button>

                {/* Confirm Button - ONLY THIS ONE */}
                <button
                  onClick={() => {
                    handleJumpToNextPlan(confirmModal.productId);
                    setConfirmModal({
                      isOpen: false,
                      productId: null,
                      planName: null,
                      billingCycle: null,
                    });
                  }}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold"
                >
                  Confirm Activation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanDashboard;
