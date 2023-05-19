const express = require("express");
const Stripe require("stripe");

const app = express();
const port = process.env.port || 8080;
const SECRET_KEY =
  "sk_test_51Mz2mOFtSbngplj5dgubjYKYthofYdr6MP36ZJjrc2qzrlFBRyBXT9qF3obsLgyEqdonBFWCjD7snB5S2iFyx7oN00uYuJPUs3";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

app.post("/create-payment-intent/:id", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: atob(req.params.id),
      currency: "usd",
      payment_method_types: ["card"],
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
