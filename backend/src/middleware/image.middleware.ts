import Validator from '../helpers/validate';
import { Op } from 'sequelize';

const isValidUrl = (urlString) => {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$',
        'i',
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
};
const validLinkImage = async (req, res, next) => {
    try {
        if (req.body.oldLink != undefined || req.body.oldLink.length != 0) {
            const listLink = req.body.oldLink;
            for (const element of listLink) {
                if (isValidUrl(element)) {
                    const domain = new URL(element);
                    if (domain.host !== 'res.cloudinary.com') {
                        return res.status(422).send({
                            error: 'Wrong image link',
                        });
                    }
                } else {
                    return res.status(422).send({
                        error: 'Wrong image link',
                    });
                }
            }

            return next();
        }
        return res.status(422).send({
            error: 'Wrong image link',
        });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

const validate = {
    validLinkImage: validLinkImage,
};
export default validate;
