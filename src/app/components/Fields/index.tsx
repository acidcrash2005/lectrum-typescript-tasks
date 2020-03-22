import React, { FC } from 'react';
import cx from 'classnames';
import { Field, WrappedFieldMetaProps, FieldArrayFieldsProps } from 'redux-form';

const getValidityClassName = (meta: WrappedFieldMetaProps) => {
  if (meta.asyncValidating) {
    return 'async-validating';
  }

  if (meta.active) {
    return;
  }

  if (meta.touched && meta.invalid) {
    return 'invalid';
  }

  if (meta.touched && meta.valid) {
    return 'valid';
  }
};

type OwnProps = {
  meta: WrappedFieldMetaProps;
  type: string;
  input: Field;
  label: string;
};

export const customInput: FC<OwnProps> = (props) => {
  const {
    label, input, type, meta,
  } = props;

  return (
    <div
      className={cx(
        'custom-input-container',
        { 'flex-row-reverse': type === 'checkbox' },
        { dirty: meta.dirty },
        getValidityClassName(meta),
      )}
    >
      <label>{label}</label>
      <input {...input} type={type} />
      {meta.error && meta.touched && !meta.active && (
        <div className="feedback-text error-text">{meta.error}</div>
      )}
    </div>
  );
};

export const customSelect: FC<OwnProps> = (props) => {
  const { label, input } = props;

  return (
    <div className="custom-select-container">
      <label>{label}</label>
      <select {...input}>
        <option value="tabs">Tabs</option>
        <option value="spaces">Spaces</option>
      </select>
    </div>
  );
};

type DiscountProps = {
  fields: FieldArrayFieldsProps<Field>;
};

export const discounts: FC<DiscountProps> = ({ fields }) => (
  <div className="custom-field-array-container">
    {fields.map((code, index) => (
      <div key={code} className="field-array-item">
        <Field
          name={code}
          type="text"
          component={customInput}
          label={`Discount Code #${index + 1}`}
          autoFocus
        />
        <button type="button" onClick={() => fields.remove(index)}>
          &times;
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => {
        console.log(Array.isArray(fields));
        // fields.push(); //TODO Wat is this push need todo?
        // console.log(fields);
      }}
    >
      Add
      {' '}
      {!fields.length ? 'Discount Code(s)' : 'Another'}
    </button>
  </div>
);
