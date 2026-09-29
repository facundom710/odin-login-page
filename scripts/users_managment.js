// ============================================================
// USERS DATA
// ============================================================

const users = [];


// Generate a unique ID with the format "123-456"
function generateId() {
    const part1 = String(Math.floor(Math.random() * 900) + 100); // 100–999
    const part2 = String(Math.floor(Math.random() * 900) + 100); // 100–999
    return `${part1}-${part2}`;
}


// ============================================================
// REGISTER USER
// ============================================================

// Check if email and phone are original, then create the user.
// Returns { success, user?, error? }
function registerUser({ name, surname, email, phone, password }) {

    const emailExists = users.some((u) => u.email === email);
    if (emailExists) return { success: false, error: "email" };

    const phoneExists = users.some((u) => u.phone === phone);
    if (phoneExists) return { success: false, error: "phone" };

    const newUser = {
        id: generateId(),
        name,
        surname,
        email,
        phone,
        password
    };

    users.push(newUser);

    return { success: true, user: newUser };
}


// ============================================================
// LOGIN USER
// ============================================================

// Verify if the user exists and credentials match.
// Returns { success, user? }
function loginUser(id, password) {

    const user = users.find((u) => u.id === id && u.password === password);

    if (!user) return { success: false };

    return { success: true, user };
}


// ============================================================
// RECOVER PASSWORD
// ============================================================

// Verify if the user exists by email and replace the password.
// Returns { success, user? }
function recoverPassword(email, newPassword) {

    const user = users.find((u) => u.email === email);

    if (!user) return { success: false };

    user.password = newPassword;

    return { success: true, user };
}