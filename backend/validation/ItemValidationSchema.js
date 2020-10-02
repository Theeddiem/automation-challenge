const Joi = require('joi');

itemSchema = Joi.object({

    name: Joi.string()
        .max(30)
        .required(),

    description: Joi.string()
        .max(80)
        .required(),

     count: Joi.number()
     .min(0)
})



async function validateItem(item)
{

    try {
        const {name, description, count} = item;
        return await itemSchema.validateAsync({ name, description , count })
 
    } catch (error) {
        throw error.details[0]
    }
}

module.exports = validateItem  
