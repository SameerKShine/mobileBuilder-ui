import { Popover, ActionList, TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { CommonInput } from "./commonElements";

function CommonPopover({handleType, val, index}) {
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );
  const selectTyle =  (type) => {
        setPopoverActive((popoverActive) => !popoverActive)
        handleType(type, index)
    }

  const activator =  (
    <CommonInput
    label="Link To"
    value={val}
    input={{
      onClick: togglePopoverActive,
    }}
    autoComplete="off"
  />
  );

  return (
    <div>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              content: (
                <a onClick={() => selectTyle("products")}>Products</a>
              ),
            },
            {
              content: (
                <a onClick={() => selectTyle("collections")}>
                  Collections
                </a>
              ),
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export default CommonPopover;
