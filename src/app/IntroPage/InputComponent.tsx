"use client";

import React, { useState } from 'react';
import styles from "./Input.module.css";
import { useRouter } from "next/navigation";

function InputComponent() {
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        router.push(`/MainPage?name=${encodeURIComponent(inputValue)}`)
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="myInput"></label>
            <input
                className={styles.input}
                id="myInput"
                type="text"
                value={inputValue}
                onChange={handleChange}
            />
            <br />
            <button type="submit" className={styles.button}>Submit</button>
        </form>
    );
}

export default InputComponent;