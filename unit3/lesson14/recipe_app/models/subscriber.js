
// Create a new schema
// with mongoose.Schema.
const subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number // Add schema properties.
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
