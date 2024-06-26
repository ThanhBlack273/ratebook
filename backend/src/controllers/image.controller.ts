import cloudinary from '../config/cloudinary.config';

export const upImage = async (req, res) => {
    try {
        if (req.file !== undefined) {
            await cloudinary.uploader
                .upload(req.file.path)
                .then((img) => {
                    return res.status(201).send({ photoLink: img.url });
                })
                .catch((err) => {
                    return res.status(500).send({ error: err.message });
                });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const delImage = async (req, res) => {
    try {
        const listLink = req.body.oldLink;
        listLink.forEach(async (element) => {
            await cloudinary.uploader.destroy(element?.split('/').pop().split('.').shift()).catch((err) => {
                res.status(500).send({ error: err.message });
                return;
            });
        });
        res.status(200).send({});
        return;
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
