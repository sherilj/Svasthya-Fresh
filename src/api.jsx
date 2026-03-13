export const API_BASE_URL = "http://65.1.85.74:8082";

const fetchJson = async (url, options = {}) => {
	const res = await fetch(url, options);
	const text = await res.text();
	let data = null;

	try {
		data = text ? JSON.parse(text) : null;
	} catch {
		data = text;
	}

	if (!res.ok) {
		const error = new Error((data && data.message) || text || `HTTP ${res.status}`);
		error.response = { data, status: res.status };
		throw error;
	}

	return { data, status: res.status };
};

// Fetches profile details for the logged-in user.
export const getUserProfile = (token) => fetch(`${API_BASE_URL}/api/v1/users/profile`, {
	headers: { "Authorization": `Bearer ${token}` },
});

// Fetches user account details (like user_id) for the logged-in user.
export const getUserInfo = (token) => fetch(`${API_BASE_URL}/api/v1/users`, {
	headers: { "Authorization": `Bearer ${token}` },
});

// Fetches all saved addresses for the logged-in user.
export const getAddresses = (token) => fetch(`${API_BASE_URL}/api/v1/addresses`, {
	headers: { "Authorization": `Bearer ${token}` },
});

// Updates profile details for the logged-in user.
export const updateUserProfile = (token, payload) => fetch(`${API_BASE_URL}/api/v1/users/profile`, {
	method: "PUT",
	headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
	body: JSON.stringify(payload),
});

// Creates a new address for the logged-in user.
export const createAddress = (token, payload) => fetch(`${API_BASE_URL}/api/v1/addresses`, {
	method: "POST",
	headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
	body: JSON.stringify(payload),
});

// Updates an existing address for the logged-in user.
export const editAddress = (token, addressId, payload) => fetch(`${API_BASE_URL}/api/v1/addresses/${addressId}`, {
	method: "PUT",
	headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
	body: JSON.stringify(payload),
});

// Deletes an address for the logged-in user.
export const removeAddress = (token, addressId) => fetch(`${API_BASE_URL}/api/v1/addresses/${addressId}`, {
	method: "DELETE",
	headers: { "Authorization": `Bearer ${token}` },
});

// Fetches the current cart for the logged-in user.
export const getCart = (token) => fetch(`${API_BASE_URL}/api/v1/cart`, {
	headers: { "Authorization": `Bearer ${token}` },
});

// Adds an item to cart using variant id and quantity.
export const addCartItem = (token, payload) => fetch(`${API_BASE_URL}/api/v1/cart/add`, {
	method: "POST",
	headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
	body: JSON.stringify(payload),
});

// Increases cart item quantity for a specific variant.
export const incrementCartItem = (token, variantId) => fetch(`${API_BASE_URL}/api/v1/cart/increment/${variantId}`, {
	method: "POST",
	headers: { "Authorization": `Bearer ${token}` },
});

// Decreases cart item quantity for a specific variant.
export const decrementCartItem = (token, variantId) => fetch(`${API_BASE_URL}/api/v1/cart/decrement/${variantId}`, {
	method: "POST",
	headers: { "Authorization": `Bearer ${token}` },
});

// Removes a specific item from the cart using variant id.
export const removeCartItem = (token, variantId) => fetch(`${API_BASE_URL}/api/v1/cart/${variantId}`, {
	method: "DELETE",
	headers: { "Authorization": `Bearer ${token}` },
});

// Clears all items from the cart.
export const clearCart = (token) => fetch(`${API_BASE_URL}/api/v1/cart/clear`, {
	method: "DELETE",
	headers: { "Authorization": `Bearer ${token}` },
});

// Sends OTP to a mobile number during auth.
export const sendOtp = (payload) => fetchJson(`${API_BASE_URL}/api/v1/auth/send-otp`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(payload),
});

// Verifies OTP and returns auth/user response.
export const verifyOtp = (payload) => fetchJson(`${API_BASE_URL}/api/v1/auth/verify-otp`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(payload),
});
