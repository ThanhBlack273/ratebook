import Validator from 'validatorjs';
import * as db from '../models';
import { Table } from 'sequelize-typescript';

Validator.registerAsync(
    'existUsers',
    async function (value, args, attribute, passes) {
        try {
            // if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
            // const attArr = attribute.split(',');
            // if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

            // //assign array index 0 and 1 to table and column respectively
            // const { 0: nameTable, 1: nameColumn } = attArr;

            const table = db[args];

            let msg = `${attribute} has problem `;
            if (args == 'User') {
                msg = attribute == 'email' ? `${attribute} has already been taken ` : `${attribute} already in use`;
            }

            const user = await table.findOne({
                where: {
                    [attribute]: value,
                },
            });
            if (user) {
                passes(false, msg); // return false if value exists
                return;
            }
            passes(true, 'validated');
        } catch (err) {
            passes(false, err);
        }
    },
    'validated',
);

Validator.registerAsync(
    'existBooks',
    async function (value, args, attribute, passes) {
        try {
            if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
            //split table and column
            // const attArr = attribute.split(',');
            // if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

            // //assign array index 0 and 1 to table and column respectively
            // const { 0: nameTable, 1: nameColumn } = attArr;

            const table = db[args];
            const msg = 'Your book has already been subscribed';

            const user = await table.findOne({
                where: {
                    [attribute]: value,
                },
            });
            if (user) {
                passes(false, msg); // return false if value exists
                return;
            }
            passes(true, 'validated');
        } catch (err) {
            passes(false, err);
        }
    },
    'validated',
);

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
// Tighten password policy
Validator.register(
    'strictPassword',
    (value: string) => passwordRegex.test(value),
    'password must contain at least one uppercase letter, one lowercase letter and one number',
);

export default Validator;
