import  { useState } from 'react'

const usePasswordToggle = () => {
    const [visible, setVisible] = useState(false);


    const inputType = visible ? 'text' : 'password';

    return [inputType, setVisible, visible];
};

export default usePasswordToggle;