export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const payload = {
      ...req.body,
      access_key: process.env.WEB3FORMS_KEY
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
