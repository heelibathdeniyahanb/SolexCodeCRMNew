import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Image = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`https://localhost:7143/api/user/GetUserImage/2/GetUserImage`, {
                    responseType: 'blob' // Important to get the image as a blob
                });
                const imageUrl = URL.createObjectURL(response.data);
                setImageSrc(imageUrl);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchImage();
    }, []);

    if (error) {
        return <div>Error loading image: {error}</div>;
    }

    return (
        <div>
            {imageSrc ? <img src={imageSrc} alt="User"  /> : <p>Loading image...</p>}
        </div>
    );
};

export default Image;
