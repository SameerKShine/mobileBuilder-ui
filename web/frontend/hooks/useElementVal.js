export const useElementVal = (data) => {
    let newData = {
        type: data,
        // id: customid().toString(),
        style: {
          margin_top: 0,
          margin_bottom: 0,
          margin_left: 0,
          margin_right: 0,
        },
      };
      if (data == "header") {
        let saveData = {
          ...newData,
          heading_text: "Enter Heading here",
          subheading_text: "Enter Subheading Here",
          text_alignment: "left",
          show_subheading: true,
          style:{
            ...newData.style,
            heading_color:"#000",
            subheading_color:"#000"
          }
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
          show_viewAll:true,
          viewAll:"View All",
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
            width: 100,
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
          style:{
            ...newData.style,
            button_size:"33%",
            button_border:20,
            heading_text_size:30,
            subtitle_text_size:18,
            button_text_size:10,
            heading_weight:200,
            subtitle_weight:"200",
            button_background_color:"#121111",
            button_text_color:"#0d0d0d",
            title_color:"#050505",
            subtitle_color:"#050505"
          }
        };
        newData = saveData;
      } else if (data == "announcement_bar") {
        let saveData = {
          ...newData,
          title: 'Upcomming trends',
          animation_type: "left",
          show_icon:false,
          style: {
            ...newData.style,
             background_color:"#058a14", text_color:"#f4c3c3" 
          },
        };
        newData = saveData;
      } else if (data == "countdown_offer") {
        let saveData = {
          ...newData,
          heading1: "Deal of the day",
          paragraph1: "Black Friday",
          choose_layout: "layout_1",
          day_text : "Day",
          hours_text:"Hours",
          min_text:"Miniute",
          sec_text:"Seconds",
          countdown_date: {
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
          },
          style: {
            ...newData.style,
            background_style: { type: "color", countdown_background_color:"#d24747" },
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