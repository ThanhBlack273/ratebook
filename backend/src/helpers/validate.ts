import Validator from 'validatorjs';
import db from '../models';

Validator.registerAsync(
    'exist',
    function (value, args, attribute, passes) {
        try {
            if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
            //split table and column
            const attArr = attribute.split(',');
            if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

            //assign array index 0 and 1 to table and column respectively
            const { 0: nameTable, 1: nameColumn } = attArr;

            const table = db[nameTable];
            let msg = `${nameColumn} has problem `;
            if (nameTable == 'users') {
                msg = nameColumn == 'email' ? `${nameColumn} has already been taken ` : `${nameColumn} already in use`;
            } else {
                msg = 'Your book has already been subscribed';
            }

            table
                .findOne({
                    where: {
                        [nameColumn]: value,
                    },
                })
                .then((user) => {
                    if (user) {
                        passes(false, msg); // return false if value exists
                        return;
                    }
                    passes(true, 'validated');
                });
        } catch (err) {
            passes(false, err);
        }
    },
    'validated',
);

Validator.registerAsync(
    'exist',
    function (value, args, attribute, passes) {
        try {
            if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
            //split table and column
            const attArr = attribute.split(',');
            if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

            //assign array index 0 and 1 to table and column respectively
            const { 0: nameTable, 1: nameColumn } = attArr;

            const table = db[nameTable];
            let msg = `${nameColumn} has problem `;
            if (nameTable == 'users') {
                msg = nameColumn == 'email' ? `${nameColumn} has already been taken ` : `${nameColumn} already in use`;
            } else {
                msg = 'Your book has already been subscribed';
            }

            table
                .findOne({
                    where: {
                        [nameColumn]: value,
                    },
                })
                .then((user) => {
                    if (user) {
                        passes(false, msg); // return false if value exists
                        return;
                    }
                    passes();
                });
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
