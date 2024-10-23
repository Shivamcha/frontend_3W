import React from 'react';

const ImageWithFallback = ({ src, alt, className, onLoad, ...props }) => {
    const [error, setError] = React.useState(false);
    
    const handleError = (e) => {
        if (!error) {
            // Only try to correct the path once to avoid infinite loops
            const correctedSrc = src.replace(/\\/g, '/');
            if (e.target.src !== correctedSrc) {
                e.target.src = correctedSrc;
                setError(true);
            } else {
                console.error('Image failed to load:', src);
                // You could set a fallback image here
                // e.target.src = '/placeholder-image.jpg';
            }
        }
    };

    return (
        <img
            src={src.replace(/\\/g, '/')}
            alt={alt}
            className={className}
            onError={handleError}
            onLoad={onLoad}
            {...props}
        />
    );
};

export default ImageWithFallback;