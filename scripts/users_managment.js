let users = {};

let actualForm = "login";

// ============================================================
// DOM ELEMENTS
// ============================================================

const infoText = document.querySelector(".info p");
const formField = document.querySelector("fieldset");
const form = document.querySelector("form");
const footerHelp = document.querySelector("footer p.help-txt")


// ============================================================
// SVG ICONS
// ============================================================

const icons = {
    user: `
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
        />
    `,

    email: `
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z" />
        <path d="m0 4 8 5 8-5" />
    `,

    phone: `
        <path d="M3.654 1.328a.678.678 0 0 1 1.015-.063l2.29 2.29a.678.678 0 0 1 .063.876l-1.17 1.528a.678.678 0 0 0-.075.683c.414.828 1.105 1.52 1.933 1.933a.678.678 0 0 0 .683-.075l1.528-1.17a.678.678 0 0 1 .876.063l2.29 2.29a.678.678 0 0 1-.063 1.015l-1.101.826a2.678 2.678 0 0 1-2.805.276A12.035 12.035 0 0 1 1.3 5.157a2.678 2.678 0 0 1 .276-2.805z" />
    `,

    lock: `
        <path d="M8 1a3 3 0 0 0-3 3v3h6V4a3 3 0 0 0-3-3" />
        <path d="M3 7h10v7H3z" />
    `
};


// ============================================================
// FORM FIELD DATA
// ============================================================

const signupFields = [
    [
        {
            label: "NAME",
            id: "name",
            type: "text",
            icon: icons.user
        },

        {
            label: "SURNAME",
            id: "surname",
            type: "text",
            icon: icons.user
        }
    ],

    [
        {
            label: "EMAIL",
            id: "email",
            type: "email",
            icon: icons.email
        },

        {
            label: "PHONE",
            id: "phone",
            type: "tel",
            icon: icons.phone
        }
    ],

    [
        {
            label: "PASSWORD",
            id: "password",
            type: "password",
            icon: icons.lock
        },

        {
            label: "CONFIRM PASSWORD",
            id: "confirm-password",
            type: "password",
            icon: icons.lock
        }
    ]
];

const passwFields = [
    [
        {
            label: "EMAIL",
            id: "passrec-email",
            type: "email",
            icon: icons.email
        },
        {
            label: "NEW PASSWORD",
            id: "passrec-newpass",
            type: "password",
            icon: icons.lock
        },
        {
            label: "CONFIRM PASSWORD",
            id: "passrec-newpass-confirm",
            type: "password",
            icon: icons.lock
        }
    ]
]

const loginFields = [
    [
        {
            label: "EMPLOYEE ID",
            id: "employee-id",
            type: "text",
            icon: icons.user
        },
        {
            label: "PASSWORD",
            id: "password",
            type: "password",
            icon: icons.lock
        }
    ]
]

// ============================================================
// FIELD GENERATION
// ============================================================

function createField({ label, id, type, icon }) {
    return `
        <div class="${id}-field">

            <label for="${id}">${label}</label>

            <div class="form-field">

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="field-icon"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                >
                    ${icon}
                </svg>

                <input
                    type="${type}"
                    id="${id}"
                    required
                >

            </div>

        </div>
    `;
}


function createRow(fields) {
    return `
        <div class="form-row">
            ${fields.map(createField).join("")}
        </div>
    `;
}


// ============================================================
// SIGNUP FORM
// ============================================================

function loadSignup() {
    actualForm = "signup";

    if(form.classList.contains("login-form")) form.classList.remove("login-form");

    if(form.classList.contains("recoverpass-form")) form.classList.remove("recoverpass-form");

    form.classList.add("signup-form");

    footerHelp.innerHTML = `Already have an account? <a onclick="loadLogin()">Log in!</a>`

    formField.innerHTML = `${signupFields
        .map(createRow)
        .join("")}

        <button type="submit">SIGN UP</button>`
};

function loadRecoverpass() {
    actualForm = "recoverpass";

    if(form.classList.contains("login-form")) form.classList.remove("login-form");

    if(form.classList.contains("signup-form")) form.classList.remove("signup-form");

    form.classList.add("recoverpass-form");

    footerHelp.innerHTML = `<a onclick="loadLogin()">Go back to login</a>`

    formField.innerHTML = `${passwFields
        .map(createRow)
        .join("")}

        <button type="submit">CHANGE PASSWORD</button>`
};

function loadLogin() {
    actualForm = "recoverpass";

    if(form.classList.contains("recoverpass-form")) form.classList.remove("recoverpass-form");

    if(form.classList.contains("signup-form")) form.classList.remove("signup-form");

    form.classList.add("login-form");

    footerHelp.innerHTML = `Doesn't have an user yet? <a onclick="loadSignup()">Sign up!</a>`

    formField.innerHTML = `${loginFields
        .map(createRow)
        .join("")}
        
        <p class="help-txt forgot-pass">Forgot your password? <a onclick="loadRecoverpass()">Change it here!</a></p>

        <button type="submit">LOG IN</button>`
};

loadLogin();