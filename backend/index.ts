import dotenv from 'dotenv';

dotenv.config();

import app from './src/app';

const PORT = process.env.PORT || 3000;

try {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}.`);
    });
} catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
}
