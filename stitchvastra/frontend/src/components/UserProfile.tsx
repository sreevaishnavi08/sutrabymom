import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    const [bodyType, setBodyType] = useState('');
    const [age, setAge] = useState('');
    const [stylePreferences, setStylePreferences] = useState('');
    const [occasionTypes, setOccasionTypes] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Logic to save user preferences to the backend
        const response = await fetch('http://localhost:5000/api/preferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: 'user123', // Replace with actual user ID
                bodyType,
                age,
                stylePreferences,
                occasionTypes,
            }),
        });
        const data = await response.json();
        console.log(data.message);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Body Type:
                <input type="text" value={bodyType} onChange={(e) => setBodyType(e.target.value)} />
            </label>
            <label>
                Age:
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
            <label>
                Style Preferences:
                <input type="text" value={stylePreferences} onChange={(e) => setStylePreferences(e.target.value)} />
            </label>
            <label>
                Occasion Types:
                <input type="text" value={occasionTypes} onChange={(e) => setOccasionTypes(e.target.value)} />
            </label>
            <button type="submit">Save Preferences</button>
        </form>
    );
};

export default UserProfile;
