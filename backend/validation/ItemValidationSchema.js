const { log } = require('console');
const Joi = require('joi');

itemSchema = Joi.object({

    name: Joi.string()
        .max(30)
        .required(),

    description: Joi.string()
        .max(30)
        .required(),

     count: Joi.number()
     .min(0)
})



async function validateItem(item)
{

    try {
        const {name, description, count} = item;
        //await console.log(schema.validateAsync({ name, description , count }));
        return await itemSchema.validateAsync({ name, description , count })
 
    } catch (error) {
        // console.log("Here");
        // console.log(error);
        throw error.details[0]
    }
}

module.exports = validateItem

// try {
//     const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) { }