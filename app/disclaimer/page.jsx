import { fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "privacy-policy" };

  const data = await fetchMetaData(bodyData);

  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/disclaimer`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Page() {
  return (
    <section className="container py-6 lg:py-12">
      <h1 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-center mb-5 lg:mb-10">
        Disclaimer
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        This website may contain other proprietary notices and copyright
        information, the terms of which must be observed and followed. The
        information on this website may contain technical inaccuracies or
        typographical errors. Information may be changed or updated without
        notice. “CarOnPhone” (henceforth referred to as the “Company” or “COP”)
        reserves the right to make improvements and/or changes in the services
        and/or programmes described on this website at any time without notice.
        CoP shall not be responsible for any inaccuracies or the user’s decision
        based on such information.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        Information provided on this website is provided &quot;AS IS,&quot; with
        no guarantees of completeness, accuracy, or timeliness, and without
        warranties of any kind, express or implied, including but not limited to
        implied warranties of merchantability and fitness for any particular
        purpose. Certain links may be provided on this website, which will lead
        to websites maintained by individuals or organisations over which the
        Company has no control. The Company makes no representations and
        provides no warranties regarding the accuracy or any other aspect of the
        information located on such websites. In no event will the Company be
        liable to any party for any direct, indirect, special, or other
        consequential damages arising from the use of this website or any other
        hyperlinked website, including, without limitation, any lost profits,
        business interruption, loss of programmes, or other data on your
        information handling system or otherwise, even if we are expressly
        advised of the possibility of such damages. The Company disclaims any
        responsibility for the accuracy of any data, including information
        uploaded by any third-party organisations or any other vendors. The
        platform presents the same &quot;AS-IS&quot; without any warranties. The
        Company expressly excludes all liability, to the extent permitted by the
        law, for any loss or damage that may arise directly or indirectly from
        or in connection with this website. You consciously agree and give your
        consent for the Company to store and process all the data you provide,
        including your location, your search history, and all the data entered
        by you on the Company’s website. Every effort is made to keep the data
        website up and running smoothly. However, the Company takes no
        responsibility for, and will not be liable for, the website being
        temporarily unavailable due to technical issues.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        The Company adheres to a standard system and makes no distinctions based
        on race, caste, creed, or faith. Therefore, it is not advised or
        appropriate to consider any of the claims that will be based on such
        distinction at any point of time. Furthermore, this site may contain
        reference to certain laws and regulations, which are subject to change
        over time and should be interpreted only in light of particular
        circumstances. This disclaimer is governed by and interpreted in
        accordance with the laws of India, without regard to the choice or
        conflicts of law provisions of any jurisdiction. The Company’s/site
        visitor agrees that in the event of any dispute arising in relation to
        this Disclaimer or any dispute arising in relation to the website,
        whether in contract or tort or otherwise, to submit to the jurisdiction
        of the courts located solely and exclusively in Surat (Gujarat) (India)
        for the resolution of all such disputes.
      </p>

      <p className="text-sm md:text-base text-gray-600 mb-3">
        The Company uses cookies on its website to improve its usability. This
        helps us in providing a good user experience and also helps us improve
        our website. By continuing to use our website without changing your
        privacy settings, you agree to use our cookies.
      </p>
    </section>
  );
}
