import React, { useState, useCallback}  from 'react'
import { Radio } from 'antd';
import MobileHeader from './MobileHeader';
import MenuPreview from './MenuPreview';
// import { useMobileview } from '../../globalState/mobileView';
 
function PreviewCard({children, data, bottomRef, secondaryClass, primaryClass,bgColor, logo, app_bar}) {

  // const { mobileview , setMobileview} = useMobileview();
  // console.log(mobileview)
    // const [value, setValue] = useState('/assets/images/phoneView/android.png');
    // const onChange = useCallback((e)=>{
    //     setValue(e.target.value);
    //     setMobileview(e.target.value)
    // },[value])
  return (
    <div className={primaryClass}>
      <div
        className={secondaryClass??''}
        // style={{ backgroundImage: `url(${mobileview})` }}
      >
        {data !=="hideHeadBottom"&&<MobileHeader app_bar={app_bar} app_logo={logo}/>}
        <div className="inner-scroll-cont" style={{'backgroundColor':bgColor??"#fff"}}>
          {children}
          <div ref={bottomRef}></div>
        </div>
       
       {(data !== "globalSetting" && data !=="hideHeadBottom") && <MenuPreview data={data} />}
      </div>
    </div>
  )
}

export default React.memo(PreviewCard)