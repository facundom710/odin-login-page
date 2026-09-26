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

    id_card: `
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
    `,

    email: `
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
    `,

    phone: `
        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
    `,

    lock: `
        <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
        <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415"/>
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
            icon: icons.phone,
            validation: {
                pattern: "^\\+[0-9]{1,3}[\\s\\-]?[0-9\\s\\(\\)\\-]{6,18}$"
            }
        }
    ],

    [
        {
            label: "PASSWORD",
            id: "password",
            type: "password",
            icon: icons.lock,
            validation: {
                minlength: 8,
                maxlength: 20
            }
        },

        {
            label: "CONFIRM PASSWORD",
            id: "confirm-password",
            type: "password",
            icon: icons.lock,
            validation: {
                minlength: 8,
                maxlength: 20
            }
        }
    ]
];

const passwFields = [
    [
        {
            label: "EMAIL",
            id: "passrec-email",
            type: "email",
            icon: icons.email,
        },
        {
            label: "NEW PASSWORD",
            id: "passrec-newpass",
            type: "password",
            icon: icons.lock,
            validation: {
                minlength: 8,
                maxlength: 20
            }
        },
        {
            label: "CONFIRM PASSWORD",
            id: "passrec-newpass-confirm",
            type: "password",
            icon: icons.lock,
            validation: {
                minlength: 8,
                maxlength: 20
            }
        }
    ]
]

const loginFields = [
    [
        {
            label: "EMPLOYEE ID",
            id: "employee-id",
            type: "text",
            icon: icons.id_card,
            validation: {
                minlength: 6,
                maxlength: 7
            }
        },
        {
            label: "PASSWORD",
            id: "password",
            type: "password",
            icon: icons.lock,
            validation: {
                minlength: 8,
                maxlength: 20
            }
        }
    ]
]

// ============================================================
// FIELD GENERATION
// ============================================================

function createRequirements(req = {}) {
    return Object.entries(req)
        .map(([attribute, value]) => `${attribute}="${value}"`)
        .join(" ");
}


function createField({ label, id, type, icon, validation }) {
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
                    ${createRequirements(validation)}
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
    actualForm = "login-form";

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

// ============================================================
// FORM VALIDATION
// ============================================================

function testFormValidity() {
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
        console.log(`--- ${input.id} ---`);
        console.log("Value:", input.value);
        console.log("Required:", input.required);
        console.log("Minlength:", input.minLength);
        console.log("Maxlength:", input.maxLength);
        console.log("Pattern:", input.pattern);
        console.log("Valid:", input.checkValidity());
        console.log("Validity:", input.validity);

        if (input.validity.valueMissing) {
            console.log("❌ Required: field is empty");
        }

        if (input.validity.tooShort) {
            console.log("❌ Too short");
        }

        if (input.validity.tooLong) {
            console.log("❌ Too long");
        }

        if (input.validity.typeMismatch) {
            console.log("❌ Invalid type");
        }

        if (input.validity.patternMismatch) {
            console.log("❌ Pattern mismatch");
        }

        console.log("");
    });

    console.log("FORM VALID:", form.checkValidity());
}


// ============================================================
// FORM SUBMIT
// ============================================================

form.addEventListener("submit", (event) => {
    testFormValidity();

    if (!form.checkValidity()) {
        event.preventDefault();
    }
    event.preventDefault();

});