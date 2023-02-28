
import HeroSlider from "./HeroSlider";
import CountDown from "./CountDown";
import CollectionDesign from "./CollectionDesign";
import ProductDesign from "./ProductDesign";
import DummyImage from "../../assets/images/dummyImages/dummyImage.png"
import DummyProductImage from "../../assets/images/dummyImages/hero.png"
export const FieldsPreview = (eleType, index, app_appearance) => {


    const style = eleType.style;
    // console.log(app_appearance)
    switch (eleType.type) {
      case "header":
        return (
          <>
            <div
              key={index}
              className="titlebox"
              style={{
                textAlign: eleType.text_alignment,
                backgroundColor: style.background_color,
                margin: `${style.margin_top}px  ${style.margin_right}px  ${style.margin_bottom}px  ${style.margin_left}px `,
                padding: `${style.padding_top}px  ${style.padding_right}px  ${style.padding_bottom}px  ${style.padding_left}px `,
              }}
            >
              <h1
                className="title "
                style={{
                  color: eleType.style.heading_color,
                  fontWeight: style.heading_weight,
                  fontSize: `${style.heading_size}px`,
                }}
              >
                {eleType.heading_text}
              </h1>
              {eleType.show_subheading && (
                <p
                  style={{
                    color: eleType.style.subheading_color,
                    fontWeight: style.subheading_weight,
                    fontSize:`${style.subheading_size}px`,
                  }}
                >
                  {eleType.subheading_text}
                </p>
              )}
            </div>
          </>
        );
      case "announcement_bar":
        return (
          <div
            className="SD-anouncementBar"
            key={index}
            style={{
              margin: `${style.margin_top}px  ${style.margin_right}px  ${style.margin_bottom}px  ${style.margin_left}px `,
              padding: `${style.padding_top}px  ${style.padding_right}px  ${style.padding_bottom}px  ${style.padding_left}px `,
              backgroundColor: style?.background_color,
            }}
          >
            <marquee
              style={{ color: style.text_color }}
              width="100%"
              direction={eleType.animation_type}
            >
              {eleType.title}
            </marquee>
          </div>
        );
      case "hero_slider":
        return (
          <div
            key={index}
            style={{
              margin: `${style.margin_top}px  ${style.margin_right}px  ${style.margin_bottom}px  ${style.margin_left}px `,
              padding: `${style.padding_top}px  ${style.padding_right}px  ${style.padding_bottom}px  ${style.padding_left}px `,
            }}
          >
            <HeroSlider viewData={eleType} />
          </div>
        );
      case "collection_list":
        return (
          <div
            key={index}
            style={{
              margin: `${style.margin_top}px  ${style.margin_right}px  ${style.margin_bottom}px  ${style.margin_left}px `,
              padding: `${style.padding_top}px  ${style.padding_right}px  ${style.padding_bottom}px  ${style.padding_left}px `,
            }}
          >
              <CollectionDesign  key={index} viewData={eleType} app_appearance={app_appearance} />
          </div>
        );
      case "offer":
        return (
          <div
            key={index}
            style={{
              margin: `${style.margin_top}px  ${style.margin_right}px  ${style.margin_bottom}px  ${style.margin_left}px `,
              padding: `${style.padding_top}px  ${style.padding_right}px  ${style.padding_bottom}px  ${style.padding_left}px `,
            }}
          >
            <HeroSlider viewData={eleType} />
          </div>
        );
      case "products":
        return (
          <div
            key={index}
            style={{
              margin: `${style.margin_top}px  ${style.margin_right}px  ${style.margin_bottom}px  ${style.margin_left}px `,
              padding: `${style.padding_top}px  ${style.padding_right}px  ${style.padding_bottom}px  ${style.padding_left}px `,
            }}
          >
            <div className="products-box">
                <ProductDesign viewData={eleType} app_appearance={app_appearance} />
            </div>
          </div>
        );
      case "collections":
        return (
          <div
            key={index}
            style={{
              margin: `${style.margin_top}px  ${style.margin_right}px  ${style.margin_bottom}px  ${style.margin_left}px `,
              padding: `${style.padding_top}px  ${style.padding_right}px  ${style.padding_bottom}px  ${style.padding_left}px `,
            }}
          >
            <div className="products-box">
            <ProductDesign viewData={eleType} app_appearance={app_appearance} />
            </div>
          </div>
        );
      case "featured_product":
        return (
          <div
            className="ftrBox"
            key={index}
            style={{
              margin: `${style.margin_top}px  ${style.margin_right}px  ${style.margin_bottom}px  ${style.margin_left}px `,
              padding: `${style.padding_top}px  ${style.padding_right}px  ${style.padding_bottom}px  ${style.padding_left}px `,
              textAlign: eleType.text_align,
            }}
          >
            {/* <span>Featured Products</span> */}
            <h2
              style={{
                color: style.heading_color,
                fontSize: style.header_size,
              }}
            >
              {eleType.featured_title}
            </h2>
            <p
              style={{
                color: style.subtitle_color,
                fontSize: style.subtitle_size,
              }}
            >
              {eleType.subtitle_text}
            </p>
            <figure className="img-box">
              <img
                src={eleType?.featured_product?.image?.url ?? DummyProductImage}
                alt="img"
                className="img-fluid"
              />
            </figure>
          </div>
        );
      case "countdown_offer":
        return <CountDown key={index} eleType={eleType} style={style} />;
      case "video":
        return (
          <div
            key={index}
            style={{
              margin: `${style.margin_top}px  ${style.margin_right}px  ${style.margin_bottom}px  ${style.margin_left}px `,
              padding: `${style.padding_top}px  ${style.padding_right}px  ${style.padding_bottom}px  ${style.padding_left}px `,
            }}
          >
            <video controls autoPlay>
              <source
                src="https://cdn.shopify.com/videos/c/o/v/997486cbe0ae436dae50f401eeee6151.mp4"
                type="video/mp4"
              />
              <source
                src="https://cdn.shopify.com/videos/c/o/v/997486cbe0ae436dae50f401eeee6151.mp4"
                type="video/ogg"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case "divider":
        return (
          <>
            <div key={index} className="SD-divider">
              <div
                style={{
                  border: `${style.size}px ${eleType.divider_type} ${style.color}`,
                  margin: `${style.margin_top}px  ${style.margin_right}px  ${style.margin_bottom}px  ${style.margin_left}px `,
                  width: `${style.width}%`,
                }}
              ></div>
            </div>
          </>
        );
      case "text_divider":
        return (
          <>
            <div key={index} className="SD-divider">
              {/* <hr/> */}
              <div className="">
                <h2 className="text-divider" style={{ textAlign: "center" }}>
                  <span style={{ color: `${style.color}` }}>
                    {eleType.divider_text}
                  </span>
                </h2>
              </div>
            </div>
          </>
        );
      default:
        return "state";
    }
  };