const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subject: {
        entities: {
            idPattern: {
                type: [String],
                required: true
            }
        },
        condition: {
            attrs: {
                type: [String],
                required: true
            }
        },
        collection: {
            name: {
                type: String,
                required: true
            }
        }
    },
    notification: {
        http: {
            url: {
                type: String,
                required: true
            }
        }
    },
    attrsFormat: {
        type: String
    },
    expires: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    counter: {
        type: Number,
        required: true,
        default: 0
    }
});

let SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema);

module.exports = SubscriptionModel;