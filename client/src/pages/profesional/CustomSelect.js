import React from 'react';
import Select from 'react-select';

export default ({ onChange, options, value, className }) => {

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    };

    const customStyles = {
        option: (provided, state) => ({
          ...provided,     
          color: state.isDisabled  ? 'black' : 'black',   
          fontWeight: state.isDisabled  ? 'bold' : 'normal',
          
        }),
        singleValue: (provided, state) => {
          const opacity = state.isSelected ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
      }

    return (
        <div className={className}>
            <Select     styles={customStyles} 
                placeholder="Seleccionar.."
                value={defaultValue(options, value)}
                onChange={value => {
                    onChange(value)

                }} options={options} />
        </div>

    )
}