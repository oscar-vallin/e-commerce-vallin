import React from 'react'

const PasswordStrengthIndicator = ({minChar, number, specialChar}) => {

    return (
        <div className="condition-password">
           { !minChar && !number && !specialChar && (
                <p>La contraseña debe contener</p>
            )}
                { !minChar ?
                    <li>
                        Tiene que tener al menos 8 caracteres
                    </li>
                    :
                    null
                }
                { !number ?
                    <li>
                       Tiene que tener al menos un número
                    </li>
                    :
                    null
                }
                { !specialChar ?
                    <li>
                       Tiene que tener al menos un caracter especial
                    </li>
                    :
                    null
                }
        </div>
    );
};


export default PasswordStrengthIndicator;
