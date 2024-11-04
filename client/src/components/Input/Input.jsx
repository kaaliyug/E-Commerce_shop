import React from "react";
import classes from "./input.module.css"

function Input({ label, type, defaultValue, onChange, onBlur, name, error, id, htmlFor, classInput, classContainer }, ref) {

    const getErrorMessage = () => {
        if (!error) return;
        if (error.message) return error.message;
        switch (error.type) {
            case "required":
                return "This Field is Requierd";
            case "minLength":
                return "Field is too Short";
            default:
                return "*";
        }
    }

    return (
        <InputContainer label={label} htmlFor={htmlFor} classContainer={classContainer}>
            <input defaultValue={defaultValue}
               className={`${classes.forminput} ${classInput}`}
               id={id}
               type={type}
               placeholder={label}
               ref={ref}
               name={name}
               onChange={onChange}
               onBlur={onBlur}
            />
            {error && <div className={classes.error}>{getErrorMessage()}</div>}
        </InputContainer>  
    )
}

export default React.forwardRef(Input);

const Textarea = React.forwardRef( function Textarea({ label, type, defaultValue, onChange, onBlur, name, error, rows, cols, classTextarea, classContainer }, ref) {

    const getErrorMessage = () => {
        if (!error) return;
        if (error.message) return error.message;
        switch (error.type) {
            case "required":
                return "This Field is Requierd";
            case "minLength":
                return "Field is too Short";
            default:
                return "*";
        }
    }

    return (
        <InputContainer label={label} classContainer={classContainer}>
            <textarea 
               defaultValue={defaultValue}
               className={`${classes.formtextarea} ${classTextarea}`}
               type={type}
               placeholder={label}
               ref={ref}
               name={name}
               onChange={onChange}
               onBlur={onBlur}
               rows={rows}
               cols={cols}
            ></textarea>
            {error && <div className={classes.error}>{getErrorMessage()}</div>}
        </InputContainer>  
    )
})

export { Textarea };


export function InputContainer({ label, children, bgColor, htmlFor, classContainer }) {
    return (
        <div className={`${classes.inputcontainer} ${classContainer}`} style={{ backgroundColor: bgColor }}>
            <label htmlFor={htmlFor} className={classes.label}>{label}</label>
            <div className={classes.content}>{children}</div>
        </div>
    )
}


export function Button({ type, text, onClick, color, backgroundColor, fontSize, width, height })
{
    return (
        <div className={classes.buttoncontainer}>
            <button style={{ color, backgroundColor, fontSize, width, height }} type={type} onClick={onClick}>{text}</button>
        </div>
    )
}

Button.defaultProps = {
    type: "button",
    text: "Submit",
    backgroundColor: "#e72929",
    color: "white",
    fontSize: "1.3rem",
    width: "12rem",
    height: "3.5rem"
}

export function Title({ title, fontSize, margin, color}){
    return <h1 style={{ fontSize, margin, color }}>{title}</h1>
}

Title.defaultProps = {
    color: "#616161",
}