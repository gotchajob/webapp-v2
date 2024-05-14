import { FlexCenter } from "components/common/box/flex-box";
import { Banner } from "./_components/banner";
import { BlogList } from "./_components/blog-list";
import { Contact } from "./_components/contact";
import { Feedback } from "./_components/feedback";
import { Media } from "./_components/media";
import { MentorList } from "./_components/mentor-list";
import { PartnerCarousel } from "./_components/partner-slider";
import { ServiceList } from "./_components/service-list";
import { MainTitle } from "components/common/text/text";

export default async function Page() {
  return (
    <>
      <Banner />
      <MainTitle py={15}>Về chúng tôi</MainTitle>
      <FlexCenter>
        <Media />
      </FlexCenter>
      <FlexCenter>
        <PartnerCarousel />
      </FlexCenter>
      <FlexCenter>
        <ServiceList />
      </FlexCenter>
      <FlexCenter>
        <BlogList />
      </FlexCenter>
      <Feedback />
      <FlexCenter>
        <MentorList />
      </FlexCenter>
      <FlexCenter>
        <Contact />
      </FlexCenter>
    </>
  );
}
