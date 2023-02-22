import React, { useState, useCallback}  from 'react'
import { Radio } from 'antd';
import MobileHeader from './MobileHeader';
import MenuPreview from './MenuPreview';
// import { useMobileview } from '../../globalState/mobileView';
 
function PreviewCard({children, data, bottomRef, className, mainClass,bgColor, logo, app_bar}) {

  // const { mobileview , setMobileview} = useMobileview();
  // console.log(mobileview)
    const [value, setValue] = useState('/assets/images/phoneView/android.png');
    const onChange = useCallback((e)=>{
        setValue(e.target.value);
        setMobileview(e.target.value)
    },[value])
  return (
    <div className={"SD-builderPreview " + mainClass}>
    {/* { (data !== "globalSetting" && data !=="globalSetting_hideHeader")  &&<div className='SD-mpbile_select'>
        <Radio.Group onChange={onChange} value={mobileview}>
          <Radio.Button value="/assets/images/phoneView/android.png">
            Andriod View
          </Radio.Button>
          <Radio.Button value="/assets/images/phoneView/iphone.png">
            IOS View
          </Radio.Button>
        </Radio.Group>
      </div>} */}

      <div
        className={"white-bg-box mobile_preview " +className??''}
        // style={{ backgroundImage: `url(${mobileview})` }}
      >
        {data !=="globalSetting_hideHeader"&&<MobileHeader app_bar={app_bar} app_logo={logo}/>}
        <div className="inner-scroll-cont" style={{'backgroundColor':bgColor??"#fff"}}>
          {children}
          <div ref={bottomRef}></div>
        </div>
       
       {(data !== "globalSetting" && data !=="globalSetting_hideHeader") && <MenuPreview data={data} />}
      </div>
    </div>
  )
}

export default React.memo(PreviewCard)