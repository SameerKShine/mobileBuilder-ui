import React, { useState, useCallback}  from 'react'
import { Radio } from 'antd';
import MobileHeader from './MobileHeader';
import MenuPreview from './MenuPreview';
import { useMobileview } from '../../globalState/mobileView';
 
function PreviewCard({children, data}) {

  const { mobileview , setMobileview} = useMobileview();
  console.log(mobileview)
    const [value, setValue] = useState('/src/assets/images/phoneView/android.png');
    const onChange = useCallback((e)=>{
        setValue(e.target.value);
        setMobileview(e.target.value)
    },[value])
  return (
    <div className="SD-builderPreview">
      <div className='SD-mpbile_select'>
        <Radio.Group onChange={onChange} value={mobileview}>
          <Radio.Button value="/assets/images/phoneView/android.png">
            Andriod View
          </Radio.Button>
          <Radio.Button value="/assets/images/phoneView/iphone.png">
            IOS View
          </Radio.Button>
        </Radio.Group>
      </div>

      <div
        className="white-bg-box mobile_preview"
        style={{ backgroundImage: `url(${value})` }}
      >
        <MobileHeader />
        <div className="inner-scroll-cont">{children}</div>
        <MenuPreview data={data} />
      </div>
    </div>
  )
}

export default React.memo(PreviewCard)