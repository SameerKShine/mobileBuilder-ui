export const useElementVal = (data) => {
    let newData = {
        type: data,
        // id: customid().toString(),
        style: {
          margin_top: "0",
          margin_bottom: "0",
          margin_left: "0",
          margin_right: "0",
        },
      };
      if (data == "header") {
        let saveData = {
          ...newData,
          heading_text: "Enter Heading here",
          subheading_text: "Enter Subheading Here",
          text_alignment: "center",
          show_subheading: true,
        };
        newData = saveData;
      } else if (
        data == "collection_list" ||
        data == "products" ||
        data == "collections"
      ) {
        let saveData = {
          ...newData,
          heading: data == "collection_list" ? "Collections" : "Products",
          show_heading: true,
          view_style: "slider",
          slider_style: "square",
          choose_layout: "layout_1",
          data: [],
        };
        newData = saveData;
      } else if (data == "divider") {
        let saveData = {
          ...newData,
          divider_type: "solid",
          style: {
            size: "1",
            color: "#000",
            width: "100%",
            alignment: "center",
          },
        };
        newData = saveData;
      } else if (data == "text_divider") {
        let saveData = {
          ...newData,
          divider_text: "Enter Your Title Here",
        };
        newData = saveData;
      } else if (data == "hero_slider" || data == "offer") {
        let saveData = {
          ...newData,
          data: [
            {
              title_text: "Example Test",
              button_text: "Add",
              sub_title: "example Subtitle",
              image: "/assets/images/dummyImages/hero.png",
            },
            {
              title_text: "Slider 2",
              button_text: "Add",
              sub_title: "example Subtitle",
              image:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            },
          ],
          show_content: true,
        };
        newData = saveData;
      } else if (data == "announcement_bar") {
        let saveData = {
          ...newData,
          title: 'Upcomming trends',
          animation_type: "left",
        };
        newData = saveData;
      } else if (data == "countdown_offer") {
        let saveData = {
          ...newData,
          heading1: "Deal of the day",
          paragraph1: "Black Friday",
          choose_layout: "layout_1",
          countdown_date: {
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
          },
          style: {
            ...newData.style,
            background_style: { type: "color" },
          },
        };
        newData = saveData;
      } else if (data == "featured_product") {
        let saveData = {
          ...newData,
          featured_title: "Featured Product",
          subtitle_text:"The fashion is here!",
          // featured_product:{
          //   image:{
          //     url:"/assets/images/dummyImages/hero.png"
          //   }
          // }
         
        };
        newData = saveData;
      }
return(
    newData
)
}