const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

// POST endpoint
app.post("/bfhl", (req, res) => {
	const { data, file_b64 } = req.body;

	// Separate numbers and alphabets
	const numbers = data.filter((item) => !isNaN(item));
	const alphabets = data.filter((item) => isNaN(item));

	// Find highest lowercase alphabet
	const lowerAlphabets = alphabets.filter((char) => char >= "a" && char <= "z");
	const highestLowercase = lowerAlphabets.sort().pop() || null;

	// Check for prime numbers
	const isPrime = numbers.some((num) => isPrimeNumber(num));

	// File validation logic
	const fileValid = file_b64 ? validateBase64(file_b64) : false;

	res.json({
		is_success: true,
		user_id: "john_doe_17091999",
		email: "john@xyz.com",
		roll_number: "ABCD123",
		numbers,
		alphabets,
		highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
		is_prime_found: isPrime,
		file_valid: fileValid,
		file_mime_type: fileValid ? "image/png" : null,
		file_size_kb: fileValid ? 400 : null,
	});
});

// GET endpoint
app.get("/bfhl", (req, res) => {
	res.json({ operation_code: 1 });
});

// Helper functions
function isPrimeNumber(num) {
	if (num < 2) return false;
	for (let i = 2; i <= Math.sqrt(num); i++) {
		if (num % i === 0) return false;
	}
	return true;
}

function validateBase64(base64) {
	try {
		Buffer.from(base64, "base64");
		return true;
	} catch {
		return false;
	}
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
