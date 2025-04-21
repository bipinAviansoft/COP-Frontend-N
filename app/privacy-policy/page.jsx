import { fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "privacy-policy" };

  const data = await fetchMetaData(bodyData);

  return data;
}

export default function Page() {
  return (
    <section className="container py-6 lg:py-12">
      <h1 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-center mb-5 lg:mb-10">
        Privacy Policy
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        This Portal: Car On Phone (includes its pages, extensions etc., but not
        limited to) and other as may be launched from time to time (hereinafter
        referred to as &quot;Website&quot;, &quot;Platform&quot; and/or
        &quot;Application&quot;, which shall mean and be used interchangeably
        having the same meaning) is developed, operated and maintained by by a
        Surat, Gujarat, India, based business entity COMPANY (&quot;The
        Company&quot;), In the Privacy Policy, &quot;we&quot;, &quot;our&quot;
        and &quot;us&quot; means &quot;the company&quot;; &quot;you&quot; and
        &quot;your&quot; means any person who accesses and uses this Platform;
        This Privacy Policy covers this Platform’s treatment of personally
        identifiable information that the company collects when you are on this
        platform and afterwards, and when you use this platform’s services. This
        policy also covers the company&apos;s treatment of any personally
        identifiable information (&quot;PII&quot;) that users share and/or the
        PII which the company may fetch/collect from various service providers
        with whom the company has integrated its systems to provide the
        necessary services to you. This policy does not apply to the practices
        of companies that the company does not own or control or to people that
        the company does not employ or manage.
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        In Brief
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        Protecting your privacy is at the highest importance for the Company,
        and we are committed to safeguarding it. This policy outlines how
        personal data we collect from you, or that you provide to us or that we
        may fetch/collect from various service providers with whom the company
        has integrated its systems, will be processed. Please read the following
        policy to understand the information we collect, how we will use that
        information and the circumstances where we will share it with third
        parties. This policy should be read together with our terms & condition.
        If you use any of our Services, you will be regarded as having read and
        accepted this Policy. You must not use this platform or our Services if
        you do not accept this Policy. By mere use of this platform, you
        expressly consent to our use and disclosure of your personal information
        in accordance with this Policy. Our privacy policy is subject to change
        at any time without notice. To make sure you are aware of any changes,
        please review this policy periodically. Your consent to use the cookies
        in accordance with the terms of this policy when you first visit our
        website permits us to use cookies every time you visit our website.
        Further, your consent shall enable our browser extension feature to
        enable us to store your last visits, conduct data analytics etc.
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5 ">
        {" "}
        Collection Of And Processing Of Your Personal Data
      </h4>

      <p className="text-sm md:text-base text-gray-600 mb-3">
        The use of this platform may result in the collection and processing of
        your personal data. The term &quot;personal data&quot; under data
        protection law refers to all information relating to a specific or
        personally identifiable person (PII). An IP address can also be
        considered personal data. An IP address is assigned to each device
        connected to the internet by the internet service provider so that it
        can send and receive data. When you use the platform, we collect data
        that you provide yourself. In addition, when you use the platform, we
        also automatically collect certain information about your use of it.{" "}
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        To avail certain Services on the Website, you will be required to
        provide certain personal information for the registration process which
        may include: a) your name, b) email address, c) phone number (d) account
        number of the Users, (f) KYC details and any other such information as
        required. The Information as supplied by you enables us to provide the
        Services and improve the Website Services and provide you the most
        user-friendly experience. In some cases, for the provision of certain
        service(s) or utility(ies), we may require your contact address as well.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        We process personal data in compliance with the applicable data
        protection regulations. We will only process data where we are legally
        permitted to do so. When you use this platform, we will process personal
        data only with your consent, for the performance of a contract to which
        you are a party, or in order to take steps at your request prior to
        entering into a contract, for compliance with a legal obligation, or if
        the processing is necessary for the purposes of our legitimate interests
        or the legitimate interests of a third party, except where such
        interests are overridden by your interests or fundamental rights and
        freedom which require the protection of personal data.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        The services provided by us rely on user/third party-provided data for
        accuracy in addition to data from dynamic external dataset, which are
        subject to inaccuracies and deviations/variations from the actuals.
        Users are to exercise their owndiscretion/ caution and thoroughly
        understand the terms and conditions and the privacy policy, as
        CarOnPhone shall not be held responsible for any outcomes pursuant to
        its services. Users are advised to refer to it as the same shall be
        binding and enforceable. The platform has devised a process flow in such
        a manner that user gets a final validation screen before the final data
        is submitted, wherein it shall be user’s responsibility to check and
        verify all the data (either submitted by them and/or auto-filled up
        through external / 3 rdparty sources) before making the final
        submissions. Company clearly conveys that it does not warrants/ takes
        any kind of guarantee for the algorithms to function in the exact same
        manner as may be required for desired output. This clause clearly
        disclaims all such errors, omissions, mistakes, technical glitches, data
        entry mistakes, algorithm not matching etc., but not limited to the
        same.
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Collecting Personal Information
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        We may collect the following personal information, including but not
        limited to the following:{" "}
      </p>
      <ul className="list-disc pl-6">
        <li className="text-sm md:text-base text-gray-600 mb-3">
          information about your visits to and use of this website including the
          referral source, length of visit, page views, and website navigation
          paths;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          information that is generated while using our website, including when,
          how often, and under what circumstances you use it;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          information relating to anything you purchase, services you use, or
          transactions you make through our website, which includes your name,
          address, telephone number, email address, and credit card details;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          information contained in any communications that you send to us by
          email or through our website, including its communication content,
          metadata and hashed data;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Our application also provides option of referral and hence shall
          enable collection of referral email id, phone number etc. However,
          user entering such PII on behalf of the referral shall completely hold
          consent of the referral for such act and any liability that may arise
          on us for using such referral’s PII for marketing or otherwise, shall
          have to be completely indemnify us by you.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          For availing the Service such as applying for loan or any other
          financial product we will require you to provide/upload on the Website
          the personally identifying information about you and/or a potential
          co-loan applicant (should you select this option). However, CarOnPhone
          shall not be liable to you against any liability or claims which may
          arise out of such transactions being carried on your own accord.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Health Information: Your Height, Weight, Illness/diseases, Medical
          Test Reports etc.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          In case you do not provide your information or consent for usage of
          personal information or later on withdraw your consent for usage of
          the personal information so collected, Company reserves the right to
          discontinue/cancel the insurance policy /services for which, the said
          information was sought.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Certain areas and features of the website are available to you without
          the need to provide us with any information. However, other features
          of the Site or the Service will require providing the website with
          details such as your name, email address, address, mobile number etc.,
          personally identifying information, a username (collectively the
          &quot;Registration Information&quot;). Any of your information that
          has been availed from any third party, basis on this consent, shall be
          used only in accordance with specific internal procedures as well as
          the statutory stipulations and safeguards governing access, in order
          to operate, develop or improve the service.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Before you disclose to us the personal information of another person,
          you must obtain that person&apos;s consent to both the disclosure and
          the processing of that personal information in accordance with this
          policy. In case of any discrepancies and/or issues arising due to such
          &quot;on behalf&quot; submission, the submitter shall be liable and
          obligated under the then existing PII and other applicable rules and
          regulations.
        </li>
      </ul>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Types of information Collected by Car On Phone
      </h4>
      <div className="overflow-x-auto">
        <table className="border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300 p-3 text-sm lg:text-base text-left whitespace-nowrap">
                Sr. No.
              </th>
              <th className="border border-slate-300 p-3 text-sm lg:text-base text-left whitespace-nowrap">
                Source of Information
              </th>
              <th className="border border-slate-300 p-3 text-sm lg:text-base text-left whitespace-nowrap">
                Nature of Information Collected
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                1
              </td>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                Users/Customers
              </td>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                <ul className="list-disc pl-6">
                  <li className="text-sm md:text-base text-gray-600">
                    Personal Identifying information such as name, address, and
                    phone numbers; email Id, Age, personal description, profile
                    photograph, delivery address, interests and hobbies,
                    educational details, institute details, employment details,
                    parentage etc.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Payment information.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Location information.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Device information including browser type and version, and
                    operating system; IP address.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Name, addresses & phone numbers, e-mail IDs of friends and
                    other people listed in Addresses;
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Content of reviews and e-mails to us.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Voice recordings when you call to us.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Credit usage, login detail, device log files etc., while
                    using our platform.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Contacts – address book for app users.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Information and officially valid documents (KYC) regarding
                    identity and address information, including mobile &
                    landline number, place of business, valid Email id, photo,
                    id & address proof (such as Aadhar card, Pan Card, GST Voter
                    Id Card, Passport, Form 16 etc.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                2
              </td>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                Vendors/Sellers
              </td>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                <ul className="list-disc pl-6">
                  <li className="text-sm md:text-base text-gray-600">
                    Personal Identifying information such as name, address and
                    phone numbers; email Id, Age, profile photograph etc.,.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Payment information.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Location information.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Device information IP address.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Content of reviews and e-mails to us.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Voice recordings when you call to us.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Images, videos and other content collected or stored in
                    connection with our Services.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Information and officially valid documents (KYC) regarding
                    identity and address information, including mobile &
                    landline number, place of business, valid Email id, vendor’s
                    photo, id & address proof (such as Aadhar card, Pan Card,
                    GST Voter Id Card, Passport, Shop and Establishment
                    Certificate, etc.).
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Credit usage.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Corporate and financial information, and device log files
                    and configurations etc.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                3
              </td>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                Automatic Information
              </td>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                <ul className="list-disc pl-6">
                  <li className="text-sm md:text-base text-gray-600">
                    IP address of your device connected to our platform.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Login details, e-mail address, device log files etc.,.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Location of device/computer.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Content interaction information, downloads, streaming of
                    video, network details etc.,.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Device metrics, application usage, connectivity data, and
                    any errors or event failures.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Our Services metrics, any technical errors, interactions
                    with our service features and content, settings preferences
                    and backup information, location of device, file name,
                    dates, times etc while using our service.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Content use history.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    URLs including date & time; products & contents viewed or
                    searched for; page response times, download errors, length
                    of visits to certain pages, and page interaction information
                    etc.,.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Phone numbers used to call to us.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Images/videos while visiting our platforms.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Device identifiers, cookies, browsing history, usage
                    history, and/or other technical information.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                4
              </td>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                Third Party Information
              </td>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                <ul className="list-disc pl-6">
                  <li className="text-sm md:text-base text-gray-600">
                    Corporate & financial information about our co-branded
                    partners, delivery partners, and other third party
                    associated with us.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    CIN, PAN, GSTN etc.,.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Location information.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Device information (if you provided).
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    IP address.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Internet-connected devices details.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Identity and address information etc.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                5
              </td>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                Officials/Employees/Resellers etc...
              </td>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                <ul className="list-disc pl-6">
                  <li className="text-sm md:text-base text-gray-600">
                    Personal Identifying information such as name, address and
                    phone numbers; email Id, Age, profile photograph etc.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Educational Information.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Information and officially valid documents (KYC) regarding
                    identity and address information.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Payment information.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Location information.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Device information IP address.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Content of reviews and e-mails to us.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Voice recordings when you call to us.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Login detail, device log files etc., while using our
                    platforms.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                6
              </td>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                Third Party Information
              </td>
              <td className="align-top md:align-middle border border-slate-300 p-3 text-sm lg:text-base">
                <ul className="list-disc pl-6">
                  <li className="text-sm md:text-base text-gray-600">
                    Corporate & financial information about our co-branded
                    partners, delivery partners, and other third party
                    associated with us.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    CIN, PAN, GSTN etc.,.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Location information.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Device information (if you provided)
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    IP address.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Internet-connected devices details.
                  </li>
                  <li className="text-sm md:text-base text-gray-600">
                    Identity and address information etc.,.
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Processing Personal Information
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        The company and its partners collect and use your personal information
        and other information only as follows (&quot;The purpose&quot;):
      </p>
      <ul className="list-disc pl-6">
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To send you any administrative notices, offer alerts and other
          Transactional Communications relevant to your use of the Service;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To enable you to apply for certain products and services for which you
          have chosen to apply;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          For market research, project planning, troubleshooting issues,
          detecting and protecting against error, fraud or other criminal
          activity;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To third-party contractors that provide services to the company and
          are bound by these same privacy restrictions & confidentiality
          obligations;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To enforce Company’s terms & conditions;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To use data in connection with legal claims, compliance, regulatory
          and investigative purposes as necessary (including disclosure of such
          information in connection with legal process or litigation).;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To analyze usage of the site and to improve the Service/s and
          security;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To otherwise as set forth in this Privacy Policy.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To perform various analytics for the betterment of the user
          experience/products
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To carry out obligations arising from any contracts entered into
          between the User and company and to provide User facilities and
          services as per Users interest.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To provide User with information about other services, events and
          services that company offer that are similar to this User have already
          purchased or inquired about or other communications containing
          information about new services or upcoming events of the company,
          company’s affiliates and non-affiliated third parties such as
          societies and sponsors, if User has consented to receive this
          information.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To notify the User about changes or updates to application’s User
          account.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To allow the User to participate in interactive features of our
          service when User chooses to do so.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          To assist sellers in handling orders, deliver products and services,
          process payments, communicate with you about orders, products,
          services and promotional offers, update our records and generally
          maintain your accounts with us and recommend merchandise and services
          that might be of interest to you, conduct due diligence on you,
          assessing your eligibility for the products/services, undertaking
          know-your-customer (&quot;KYC&quot;) checks by CarOnPhone or any other
          third party and/or to process your application through this Website.{" "}
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          The information provided by you while placing an order is used to
          provide you the intended servicesonly and accordingly would be shared
          with the concerned vehicle dealerships. We do not share this
          information with any outside parties, except to the extent necessary
          to provide the services. However, we would not be responsible for any
          marketing material distributed by them using the information provided
          to them at the time of booking the desired vehicle of your choice.{" "}
        </li>
      </ul>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        There are number of products/services such as loans, credit cards,
        mutual funds, offered by third Parties on the Website, such as lenders,
        influencer, banks and magazines for news. If you choose to apply for
        these separate products or services, disclose information to these
        providers, then their use of your information is governed by their
        privacy policies. CarOnPhone is not responsible for their privacy
        policies. CarOnPhone shall not be held liable for disclosure of the PI
        when used in accordance with this Privacy Policy or in terms of the
        ‘General Terms of Use&apos; of Website or an agreement, if any, with the
        users of Website.
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5 ">
        Your Non-personal Information:
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        Vehicle Information : Vehicle Registration Details, Vehicle
        Manufacturer, Vehicle Model, Vehicle Color, Vehicle Transmission,
        Vehicle Engine Size, Vehicle Sample Image, Vehicle Insurance, Odometer
        reading of the vehicle, Physical condition of vehicle and accident
        history, Financing of vehicle including any Linked Loan and/ or other
        Lien, Details of involvement of vehicle in court/ investigation
        proceedings and any and all other information in respect of the identity
        and the condition of the vehicle. Preference: Your preferences and
        setting such as geographical location, time zone and language.
      </p>
      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5 ">
        Consent To Override Dnd
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        By using the platform and its services, you specifically provide consent
        to the company to send you transaction, service explicit & service
        implicit communications which are essential to continue the services
        like sending OTP for log-in, Status of Application etc., irrespective of
        your Do Not Disturb Registration with TRAI, DoT and/or any other
        Appropriate Authority. Similarly, you provide your explicit consent for
        sending across various communications on your registered email as well
        as phone number through various communication applications like WhatsApp
        as may be integrated with portal in future.
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5 ">
        Sharing Of Personal Data
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        As a policy we do not disclose any personal information to anyone other
        than those to our employees, officers, professional advisors&apos;,
        third party contractors, third party service providers as reasonably
        necessary for the purposes set out in this policy{" "}
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        We may disclose your personal information to any member of our group of
        companies (this means our subsidiaries, our ultimate holding company
        /ies and all its subsidiaries) as reasonably necessary for the purposes
        set out in this policy.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        There are several products and services that may be offered by third
        parties on our Site, (collectively, &quot;Offers&quot;). If you choose
        to apply for these separate products or services, disclose information
        to the providers, or grant them permission to collect information about
        you, then their use of your information is governed by their privacy
        policies and they will be acting as data controllers of your
        information. You should evaluate the practices of these external
        services providers and should view their privacy policies or contact
        them directly for further information before deciding to use their
        services. The company is not responsible for their privacy practices.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        Personal data may also be shared with third party service providers, who
        will process it on behalf of the Company for the purposes identified
        above subject to confidentially arrangements and strictly on
        need-to-know basis, these include:
      </p>
      <ul className="list-disc pl-6">
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Payment collection services providers (Payment gateways and otherwise
          required for digital payment collection){" "}
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Identity verification agencies
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Fraud prevention agencies
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Digital marketing and content delivery agencies
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Application service provider
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Any other service provider strictly required on need basis to fulfill
          the purpose of service delivery as envisaged for this portal
          (&quot;Purpose&quot;).
        </li>
      </ul>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        We use other third parties such as a credit/debit card processing
        company, payment gateway, pre-paid cards etc. to enable You to make
        payments for buying products or availing services on Platform. When You
        sign up for these services, You may have the ability to save Your card
        details for future reference and faster future payments. In such case,
        We may share Your relevant Information as necessary for the third
        parties to provide such services, including your name, residence and
        email address. The processing of payments or authorization is solely in
        accordance with these third parties policies, terms and conditions and
        we are not in any manner responsible or liable to You or any third party
        for any delay or failure at their end in processing the payments.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        For the purposes of Data Protection Law, the Company is a data
        controller of your personal data. You can get in touch with the Company
        by using the contact details mentioned in the contact us page.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        Notwithstanding the foregoing, the company reserves the right (and you
        authorize the company) to share or disclose your personal information
        when the company determines, in its sole discretion, that the disclosure
        of such information is necessary or appropriate:
      </p>
      <ul className="list-disc pl-6">
        <li className="text-sm md:text-base text-gray-600 mb-3">
          As required by law
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          When we believe in good faith that disclosure is necessary to protect
          our rights, protect your safety or the safety of others, investigate
          fraud, or respond to a government request,
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          in connection with any ongoing or prospective legal proceedings;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          If the company is involved in a merger, acquisition, or sale of all or
          a portion of its assets, you will be notified via email and/or a
          prominent notice on our Web site of any change in ownership or uses of
          your personal information; Optionally, company may provide choices you
          may have regarding your personal information then.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          In the event that the business is sold or merged or integrated with
          another business/investor, your details will be disclosed to our
          advisers and any prospective purchaser&apos;s adviser and will be
          passed to the new owners/investors of and/or in the business.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          We may sell, license or distribute information in anonymized or
          aggregated form so that the information does not identify a specific
          user, without restriction, including, but not limited to, for
          producing data analytics and reports for business partners or other
          third parties.
        </li>
      </ul>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Security Of Your Personal Information
      </h4>
      <ul className="list-disc pl-6">
        <li className="text-sm md:text-base text-gray-600 mb-3">
          We will take reasonable technical and organizational precautions to
          prevent the loss, misuse, or alteration of your personal information.
          We follow generally accepted standards to protect the personal
          information submitted to us, both during transmission and once we
          receive it.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          We use a combination of firewalls, encryption techniques and
          authentication procedures, among others, to maintain the security of
          your online session and to protect the accounts and systems from
          unauthorized access.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          All electronic financial transactions entered into through our website
          will be protected by encryption technology.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          You acknowledge that no method of transmission over the Internet, or
          method of electronic storage, is 100% secure, however, therefore, we
          cannot guarantee its absolute security. If you have any questions
          about security on our Web site, you can contact us on the email
          provided in contact us segment on our website{" "}
        </li>
      </ul>
      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Data Transfers
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        Presently the platform is operational across various states with in
        Indian territories. Information that we collect may be stored, processed
        in, and transferred between any of the countries in which we may operate
        in the future in order to enable us to use the information in accordance
        with this policy. You expressly agree to the transfers of personal
        information described in this Section. We hereby declare that the data
        localization is not practiced as the platform is independent of
        territories.
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Using Your Information For Marketing Purposes
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        From time to time we may request more personal information in order to
        provide you with other benefits of the Service. The company may
        aggregate personal information and disclose such data in a manner to:
      </p>
      <ul className="list-disc pl-6">
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Third parties for their marketing and promotional purposes;
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Users of the Service for the purpose of comparing with relative to the
          broader community.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Such information may not identify you individually. We may also use
          third party service providers to help us provide the Service to you,
          such as sending e-mail messages on our behalf or hosting and operating
          a particular feature or functionality of the Service. Our contracts
          with these third parties outline the appropriate use and handling of
          your information and prohibit them from using any of your personal
          information for purposes unrelated to the product or service
          they&apos;re providing.
        </li>
      </ul>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Retention Of Personal Information
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        We need your personal data in order to:
      </p>
      <ul className="list-disc pl-6">
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Provide our products and services to you.
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Manage our business for our legitimate interest
        </li>
        <li className="text-sm md:text-base text-gray-600 mb-3">
          Comply with legal obligations, if any{" "}
        </li>
      </ul>

      <p className="text-sm md:text-base text-gray-600 mb-3">
        You may choose not to share personal data or withdraw consent but doing
        so may limit the services we are able to provide to you. However, once
        you choose to withdraw the consent the personal data which has been
        shared, shall continue to remain with us for as long as the applicable
        law provides.{" "}
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        We may retain your Personal Data for a period of time consistent with
        the purpose of collection. We determine the appropriate retention period
        for Personal Data on the basis of the amount, nature, and sensitivity of
        your Personal Data, the potential risk of harm from unauthorized use or
        disclosure, and whether we can achieve the purposes of the processing
        through other means, as well as the applicable legal requirements (such
        as applicable statutes of limitation). If there is any information that
        we are unable, for technical reasons, to delete entirely from our
        systems post appropriate retention period, we will put in place
        appropriate measures to prevent any further use of the data.
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Changes To Your Personal Information
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        If your personal Information provided when you applied for a product on
        platform, changes, you may update it whenever you apply for a new
        product. To review and update your personal information to ensure it is
        accurate while your application is in process{" "}
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        We will retain your information for as long as your account is active or
        as needed to provide you services or as may be required for internal
        analysis purpose or as may be required by law, whichever is later. If
        you wish to cancel your account or request that we no longer use your
        information to provide you services, contact us at email provided in
        contact us section of website. We will retain and use your information
        as necessary to comply with our legal obligations, resolve disputes, and
        enforce our agreements.
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Log Files
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        As is true of most web sites, we gather certain information
        automatically and store it in log files. This information may include
        internet protocol (IP) addresses, browser type, internet service
        provider (ISP), referring/exit pages, operating system, date/time stamp,
        and/or clickstream data. We may combine this automatically collected log
        information with other information we collect about you. We do this to
        improve services we offer you, to improve marketing, analytics, or site
        functionality
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Tracking Technologies / Cookies
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        Cookies are small pieces of information sent to you by our website
        server. We use cookies to enhance our website user experience and to add
        extra functionalities to our website. If you don’t want us to save your
        information, you can disable or decline cookies in your browser.{" "}
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        If enabled, we may place cookies on your machine that store small
        amounts of data on your computer about your visit to any of the pages of
        this Website. Cookies are small electronic files that collect
        information when someone visits a website. They can identify the pages
        that are being viewed and this can assist us in tracking which of our
        features appeal the most to you and what content you may have viewed on
        past visits. Some cookies only exist whilst viewers are online, but
        &apos;persistent&apos; cookies are not session-based and remain on the
        viewer&apos;s computer. When you visit this site again,
        &apos;persistent&apos; cookies can enable us to customize our content
        according to your preferences.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        Technologies such as: cookies, beacons, tags and scripts are used by
        Company and our partner entities, affiliates, or analytics or service
        providers such as google Ad sense, google analytics etc. These
        technologies are used in analyzing trends, administering the site,
        tracking users&apos; movements around the site and to gather demographic
        information about our user base as a whole.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        We may receive reports based on the use of these technologies by these
        companies on an individual as well as aggregated basis
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        We use cookies for and on our platform in order to personalize our
        service for you. Users can control the use of cookies at the individual
        browser level. If you reject cookies, you may still use our site, but
        your ability to use some features or areas of our site may be limited.
        You may refuse to accept cookies by activating the setting on your
        browser which allows you to refuse the setting of cookies. Unless you
        have adjusted your browser setting so that it will refuse cookies, our
        system will issue cookies when you log on to the Website.
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Testimonials, Blogs, And Other Forums On This Website
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        With this consent of yours, we may post your testimonial along with your
        name. If you want your testimonial removed, please contact us at email
        mentioned in contact us on website.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        If you use a blog or other public forum on our Site, any information you
        submit there can be read, collected, or used by other users and could be
        used to send you unsolicited messages. We are not responsible for the
        personal information you choose to submit in these forums. These forums
        may be hosted by the Company by one of our third-party service providers
        on the Company&apos;s behalf. To request removal of your personal
        information from our blog or community forum, contact us on the email
        mentioned in contact us segment of website. In some cases, we may not be
        able to remove your personal information, in which case we will let you
        know if we are unable to do so and why.
      </p>
      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Behavioral Targeting / Re-targeting
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        We may partner with a third party to either display advertising on our
        platform or to manage our advertising on other sites. Our third-party
        partner may use technologies such as cookies to gather information about
        your activities on this site and other sites in order to provide you
        advertising based upon your browsing activities and interests. There are
        a number of products and services that may be offered by third parties
        on our Site, (collectively, &quot;Offers&quot;). If you choose to apply
        for these separate products or services, disclose information to the
        providers, or grant them permission to collect information about you,
        then their use of your information is governed by their privacy policies
        and they will be acting as data controllers of your
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        information. You should evaluate the practices of these external
        services providers and should view their privacy policies or contact
        them directly for further information before deciding to use their
        services. The Company is not responsible for their privacy practices
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Single Sign-on
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        In future, there may be options wherein you can log in to our site using
        sign-in services such as Facebook, Google or an Open ID provider. These
        services will authenticate your identity and provide you the option to
        share certain personal information with us such as your sign-in
        information, name and email address to link between the sites.
      </p>
      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Like / Share Button
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        If you use the &quot;Like&quot; / &quot;Share&quot; button to share
        something, that item will appear on your Social Media profile page and
        also on your friends&apos; newsfeed, depending on your social media’s
        privacy settings. You may also receive updates in your social media
        account’s newsfeed from this site or item in the future. Such social
        media companies also collect information such as which pages you have
        visited on this and other sites that have implemented the
        &quot;Like&quot; button.
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Links To Third Party Sites
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        Our Site includes links to other Web sites whose privacy practices may
        differ from those of the company. If you submit personal information to
        any of those sites, your information is governed by their privacy
        policies and they will be acting as data controllers of your
        information. We encourage you to carefully read the privacy policy of
        any Web site you visit.
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Opting Out
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        We provide our registered customers with periodic emailers and email/SMS
        alerts. We also allow users to unsubscribe to email newsletters and from
        time to time may transmit emails promoting the company or third-party
        goods or services. The company&apos;s subscribers may opt-out of
        receiving our promotional emails and terminate their newsletter
        subscriptions by following the instructions in the emails. Opting out in
        this manner will not end transmission of service-related emails/SMS,
        such as email/SMS alerts.
      </p>

      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Your Responsibility
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        You shall not disclose to any other person, in any manner whatsoever,
        any information relating to the Company of a confidential nature
        obtained in the course of availing the services through the website of
        the Company. Failure to comply with this obligation shall be deemed a
        serious breach of the terms herein and shall entext-lg lg:text-2xl
        font-semibold my-2 lg:my-5 the Company to any damages, to which you may
        be entext-lg lg:text-2xl font-semibold my-2 lg:my-5d otherwise.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        If you have any complaints, security related concern, please contact
        nodal officer at the email mentioned on contact us segment on our
        website. We will work closely with you to ensure going a rapid and
        personal response to your concerns.{" "}
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        You are responsible for maintaining the confidentiality of your login
        id. You are responsible for maintaining the security of your Login ID
        and may not provide these credentials to any third party. If you believe
        that they have been stolen or been made known to others, you must
        contact us immediately at details mentioned in contact us segment of
        website. We are not responsible if someone else accesses your account
        through Registration Information they have obtained from you or through
        a violation by you of this Privacy and Security Policy or the Company’s
        Terms & Conditions.
      </p>
      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Changes To The Policy
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        We may update this Privacy Policy to reflect changes to our information
        practices. We encourage you to periodically review this page for the
        latest information on our privacy practices.
      </p>
      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Contact Us With Questions Or Concerns
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        If you have questions, comments, concerns or feedback regarding this
        Privacy and Security Policy or any other privacy or security concern,
        send an e-mail to Nodal Officer, as per details mentioned in the contact
        us segment of our website and/or by sharing your concerns through email
        at: Info@caronphone.com
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        This Policy shall be governed by and construed in accordance with the
        laws of the Republic of India and the courts at Surat, Gujarat, India
        shall have sole and exclusive jurisdiction in relation to any disputes
        arising out of or in connection with this Policy.{" "}
      </p>
      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        X. Ipr Ownership
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        You shall not copy, modify, transmit, distribute / re-distribute,
        reverse engineer etc., but not limited to, or in any way exploit the
        Products or any other copyrighted materials and content provided other
        than for your individual training. Any other purpose is expressly
        prohibited under these terms. You shall also not permit anyone else to
        copy, use, modify, transmit, distribute or in any way exploit the
        Products or any other copyrighted materials, trademark/ registered mark,
        the designs, innovations, business ideas etc., which together shall be
        known as IPR and the ownership of the same belongs to the company. Any
        infringement, theft etc., of the IPR of the company shall result in
        criminal proceedings against you at your risk, cost and consequences.
      </p>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        You will not (and will not allow any third party to) attempt to copy,
        record or reverse engineer any Videos or Documentation supplied by
        Company or stored on the website (or related) websites, outside the
        application in any manner.
      </p>
      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Y. Children’s Privacy
      </h4>
      <p className="text-sm md:text-base text-gray-600 mb-3">
        Our Services do not address anyone under the age of 18. We do not
        knowingly collect personal identifiable information from children under
        18. In the case we discover that a child under 18 has provided us with
        personal information, we immediately delete this from our servers. If
        you are a parent or guardian and you are aware that your child has
        provided us with personal information, please contact us so that we will
        be able to do necessary actions. Users below 18 years of age are advised
        to use this platform/ Services under guardian ship of their parent/s
        and/or legal guardian.
      </p>
      <h4 className="text-lg lg:text-2xl font-semibold my-2 lg:my-5">
        Version 1.0
      </h4>
    </section>
  );
}
