import React, { useState, useMemo } from "react";
import { useFormik } from "formik";
import { CommonInput } from "../common/elements/commonElements";
// import Select from 'react-select'
import countryList from "react-select-country-list";
import { Input, Select } from "antd";
import postApi from "../utils/postApi";
import { useAPI } from "../globalState/getShop";
const { TextArea } = Input;
function PublishApp() {
  const { app } = useAPI();
  const [value, setValue] = useState("");
  const [publishData, setPublishData] = useState({
    country_name:['AD', 'AS'],
    keywords:['a10', 'c12']
  })
  const options = useMemo(() => countryList().getData(), []);
  const validate = (values) => {
    const urlValidate = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
    const errors = {};
    if (!values.appName) {
      errors.appName = "Required";
    } else if (values.appName.length > 15) {
      errors.appName = "Must be 15 characters or less";
    }

    if (!values.appSubtitle) {
      errors.appSubtitle = "Required";
    } else if (values.appSubtitle.length > 20) {
      errors.appSubtitle = "Must be 20 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.companyName) {
      errors.companyName = "Required";
    } else if (values.companyName.length > 20) {
      errors.companyName = "Must be 20 characters or less";
    }

    if (!values.supportUrl) {
      errors.supportUrl = "Required";
    } else if (
      !urlValidate.test(values.supportUrl)
    ) {
      errors.supportUrl = "Invalid URL address";
    }

    // if (!values.supportUrl) {
    //   errors.supportUrl = "Required";
    // } else if (values.supportUrl.length > 20) {
    //   errors.supportUrl = "Must be 20 characters or less";
    // }

    if (!values.storeUrl) {
      errors.storeUrl = "Required";
    } else if (
      !urlValidate.test(values.storeUrl)
    ) {
      errors.storeUrl = "Invalid URL address";
    }

    if (!values.privacy_policy_url) {
      errors.privacy_policy_url = "Required";
    } else if (
      !urlValidate.test(values.privacy_policy_url)
    ) {
      errors.privacy_policy_url = "Invalid URL address";
    }

    if (!values.fullDescription) {
      errors.fullDescription = "Required";
    } else if (values.fullDescription.length > 200) {
      errors.fullDescription = "Must be 20 characters or less";
    }

    if (!values.shortDescription) {
      errors.shortDescription = "Required";
    } else if (values.shortDescription.length > 200) {
      errors.shortDescription = "Must be 20 characters or less";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      appName: "",
      appSubtitle: "",
      email: "",
      companyName: "",
      supportUrl: "",
      storeUrl: "",
      fullDescription: "",
      shortDescription: "",
      // keywords: [],
      copyright_text: "",
      privacy_policy_url: '',
      developer_account: "",
      appstore_email: "",
      playstore_account: "",
      playstore_email: "",
      // country_select: [],
    },
    validate,
    onSubmit: (values) => {
      // const res = postApi(`/api/admin/publishApp`, values, app);
      // res
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((Err) => console.log(Err));
      console.log(values);
      console.log("publishData==>  " , publishData)
    },
  });
  
  const firstSection = [
    { label: "App Name", name: "appName" },
    { label: "App Sub-title", name: "appSubtitle" },
    { label: "Email Address", name: "email" },
    { label: "Company Name", name: "companyName" },
    { label: "Support URL", name: "supportUrl" },
    { label: "Store URL", name: "storeUrl" },
  ];
  return (
    <div className="SD-publish_app">
      <form onSubmit={formik.handleSubmit}>
        <div className="first_section">
          {firstSection.map((inp, index) => (
            <div className="firstSection_div" key={index}>
              <CommonInput
                label={inp.label}
                input={{ name: inp.name, placeholder: inp.label, id: inp.name }}
                onChange={formik.handleChange}
                value={formik.values[inp.name]}
              />
              {formik.errors[inp.name] ? (
                <div style={{ color: "red" }}>{formik.errors[inp.name]}</div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="first_section">
          <div style={{ width: "48%" }}>
            <label htmlFor="shortDescription">Short Description</label>
            <TextArea
              name="shortDescription"
              id="shortDescription"
              showCount
              value={formik.values.shortDescription}
              onChange={formik.handleChange}
              maxLength={150}
            />
            {formik.errors.shortDescription ? (
              <div style={{ color: "red" }}>{formik.errors.shortDescription}</div>
            ) : null}
          </div>

          <div style={{ width: "48%" }}>
            <label htmlFor="fullDescription">Full Description</label>
            <TextArea
              name="fullDescription"
              id="fullDescription"
              showCount
              value={formik.values.fullDescription}
              onChange={formik.handleChange}
              maxLength={250}
            />
            {formik.errors.fullDescription ? (
              <div style={{ color: "red" }}>{formik.errors.fullDescription}</div>
            ) : null}
          </div>
        </div>

        <div className="first_section">
          <div style={{ width: "65%" }}>
            <label htmlFor="keywords">Keywords</label>
            <Select
              mode="tags"
              name="keywords"
              id="keywords"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              value={publishData.keywords}
              // defaultValue={['a10', 'c12']}
              onChange={(e)=>setPublishData({...publishData, keywords:e })}
              // options={options}
            />
            {formik.errors.keywords ? (
              <div>{formik.errors.keywords}</div>
            ) : null}
          </div>

          <div style={{ width: "33%" }}>
            <label htmlFor="copyright_text">Copyright Text</label>
            <CommonInput
              name="copyright_text"
              id="copyright_text"
              showCount
              value={formik.values.copyright_text}
              onChange={formik.handleChange}
            />
            {formik.errors.copyright_text ? (
              <div>{formik.errors.copyright_text}</div>
            ) : null}
          </div>
        </div>

        <div className="first_section">
     
        <div style={{ width: "48%" }}>
            <label htmlFor="privacy_policy_url">Privacy Policy URL</label>
            <CommonInput
              name="privacy_policy_url"
              id="privacy_policy_url"
              showCount
              value={formik.values.privacy_policy_url}
              onChange={formik.handleChange}
            />
            {formik.errors.privacy_policy_url ? (
              <div>{formik.errors.privacy_policy_url}</div>
            ) : null}
          </div>
          <div style={{ width: "48%" }}>
          <label htmlFor="keywords">Country Name</label>
          <Select
          mode="multiple"
            options={options}
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            name="country_select"
            id="country_select"
            value={publishData.country_name}
            onChange={(e)=>setPublishData({...publishData, country_name:e })}
          />
        </div>
        </div>
 
        <CommonInput
          label="Do you have an Apple developer account?"
          input={{
            name: "developer_account",
            id: "developer_account",
            type: "checkbox",
          }}
          onChange={formik.handleChange}
          value={formik.values.developer_account}
        />
        {formik.values.developer_account && (
          <div>
            <CommonInput
              label="Your App store Email"
              input={{
                name: "appstore_email",
                placeholder: "Your App store Email",
                id: "appstore_email",
              }}
              onChange={formik.handleChange}
              value={formik.values.appstore_email}
            />
            {formik.errors.appstore_email ? (
              <div>{formik.errors.appstore_email}</div>
            ) : null}
          </div>
        )}

        <CommonInput
          label="Do you have Google play store account?"
          input={{
            name: "playstore_account",
            id: "playstore_account",
            type: "checkbox",
          }}
          onChange={formik.handleChange}
          value={formik.values.playstore_account}
        />
        {formik.values.playstore_account && (
          <div>
            <CommonInput
              label="Your Play store Email"
              input={{
                name: "playstore_email",
                placeholder: "Your Play store Email",
                id: "appstore_email",
              }}
              onChange={formik.handleChange}
              value={formik.values.playstore_email}
            />
            {formik.errors.playstore_email ? (
              <div>{formik.errors.playstore_email}</div>
            ) : null}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PublishApp;
