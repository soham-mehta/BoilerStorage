import { useState } from "react";
import { Dialog, Disclosure } from "@headlessui/react";
import { XMarkIcon, CheckIcon, MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

import {
  FaceSmileIcon,
  GlobeAmericasIcon,
  TrophyIcon,
} from "@heroicons/react/20/solid";
import { useParams, Link, useLocation } from "react-router-dom";


const navigation = [
  { name: "Features", href: "#features", home: true, host: false, loggedIn: true },
  { name: "Pricing", href: "#pricing", home: true, host: false, loggedIn: true },
  { name: "FAQ", href: "#faq", home: true, host: false, loggedIn: true },
  { name: "View Listings", href: "/ListingPage", home: true, host: false, loggedIn: true },
  { name: "Contact", href: "mailto:mehta233@purdue.edu", home: true, host: false, loggedIn: true },
  { name: "Login", href: "/Login", home: true, host: false, loggedIn: false },
  { name: "SignUp", href: "/SignUp", home: true, host: false, loggedIn: false },

];

const features = [
  {
    name: "Find a Host",
    description:
      "Our intuitive tool allows you to swiftly select a host located conveniently close to you.",
    href: "#",
    icon: FaceSmileIcon,
  },
  {
    name: "Set Drop Off",
    description:
      "Set your preferred drop-off time, and leave your items securely with your host.",
    href: "#",
    icon: GlobeAmericasIcon,
  },
  {
    name: "Set Pick Up",
    description:
      "Use our application to set-up a convenient pick-up time.",
    href: "#",
    icon: TrophyIcon,
  },
];

const tiers = [
  {
    name: "Sample Pack",
    id: "tier-hobby",
    href: "https://tally.so/r/nG6MbO",
    priceMonthly: "Free",
    description:
      "Try out our service with five free images. No strings attached.",
    features: ["Five (5) 512 × 512 AI generated, watermarked images"],
    cta: "Get Your Free Images",
  },
  {
    name: "Premium Pack",
    id: "tier-team",
    href: "https://tally.so/r/nG6MbO",
    priceMonthly: "$30",
    description: "Capture the imagination of your customers and brand.",
    features: [
      "Thirty (30) 512 × 512 AI generated images",
      "Complementary watermarked video to share on social media",
      "Receive your images within a few hours",
      "Celebrate holidays and cultures around the world in a new way",
      "One-time payment, no subscription",
    ],
    cta: "Upload Your Logo",
  },
];

const faqs = [
  {
    question: "How long does it take to receive my images?",
    answer:
      "Your logo will be sent to our AI model within a few minutes of uploading. You will receive your images within a few hours, based on demand (so probably sooner than that!). You should get an email once we receive your logo, and another email once your images are ready.",
  },
  // More questions...
  {
    question: "What do I need to get started?",
    answer:
      "You need a logo in PNG format with a white or transparent background. If the background is transparent, make sure the logo is not white or gray. This helps our AI artists figure out the contours of your logo. It should be at least 400 by 400 pixels. If you don't have one, we can help you create one. Get in touch.",
  },
  {
    question: "I have a problem. Who should I contact?",
    answer:
      "Email us by hitting the Contact button in the navigation bar. We'll get back to you as soon as possible.",
  },
];


function FAQ() {
  return (
    <div className="bg-white" id="faq">
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8 lg:pb-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function Pricing() {
  return (
    <div className="isolate overflow-hidden bg-gray-900" id="pricing">
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">

          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            For Students,{" "}
            <br className="hidden sm:inline lg:hidden" />
            By Students
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/60">
            As students ourselves, we found Summer Storage ridiculously expensive. Time and money were always at a premium. That's why we envisioned a solution that harnesses available resources to effectively cut down overall housing expenses.
          </p>
          <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse
              cx={604}
              cy={512}
              fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                <stop stopColor="#D8978F" />
                <stop offset={1} stopColor="#FF3553" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
                >
                  <div>
                    <h3
                      id={tier.id}
                      className="text-base font-semibold leading-7 text-rose-600"
                    >
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {tier.priceMonthly}
                      </span>
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                      {tier.description}
                    </p>
                    <ul
                      role="list"
                      className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            className="h-6 w-5 flex-none text-rose-600"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className="mt-8 block rounded-md bg-rose-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                  >
                    {tier.cta}
                  </a>
                </div>
              ))}
              <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
                <div className="lg:min-w-0 lg:flex-1">
                <h3 
  style={{ color: "#CEB888" }}
  className="text-lg font-semibold leading-8 tracking-tight"
>
Have Extra Space? No Subletters?
</h3>

                  <p className="mt-1 text-base leading-7 text-gray-600">
                
                  Why not monetize your unused space? Register as a host on BoilerStorage and earn money from your empty corners. Let the boxes of your classmates rest in your space, and you could be pocketing hundreds of dollars.
                  </p>
                </div>
                <a
                  href="mailto:emblifyai@gmail.com"
                  className="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-rose-600 ring-1 ring-inset ring-rose-200 hover:ring-rose-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                >
                  Contact Us <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="bg-white py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2
            style={{ color: "#CEB888" }}
            className="text-base font-semibold leading-7"
          >
            How it works ?
          </h2>

          <p style={{ wordSpacing: "0.25em" }} className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl whitespace-nowrap">Share space. Store Belongings. Earn Money.</p>



          <p className="mt-6 text-lg leading-8f text-gray-600">
          We're committed to providing a hassle-free, affordable, and dependable service.
            
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-rose-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function PhotoGrid() {
  return (
    <div class="grid grid-cols-5 lg:grid-cols-10 md:grid-cols-5 gap-4 px-10 pb-10 z-50">
      <div>
        <img
          class="h-auto max-w-full rounded-lg shadow-lg border-4 border-gray-400"
          src={("./images/1_.png")}
          alt=""
        ></img>
      </div>
      <div className="pt-8">
        <img
          class="h-auto max-w-full rounded-lg shadow-lg"
          src={("./images/2_.png")}
          alt=""
        ></img>
      </div>
      <div className="pt-4">
        <img
          class="h-auto rounded-lg shadow-lg"
          src={("./images/3_.png")}
          alt=""
        ></img>
      </div>
      <div>
        <img
          class="h-auto rounded-lg shadow-lg"
          src={("./images/4_.png")}
          alt=""
        ></img>
      </div>
      <div className="pt-10">
        <img
          class="h-auto rounded-lg shadow-lg"
          src={("./images/5_.png")}
          alt=""
        ></img>
      </div>
      <div>
        <img
          class="h-auto max-w-full rounded-lg shadow-lg"
          src={("./images/6_.png")}
          alt=""
        ></img>
      </div>
      <div className="pt-8">
        <img
          class="h-auto max-w-full rounded-lg shadow-lg"
          src={("./images/7_.png")}
          alt=""
        ></img>
      </div>
      <div className="pt-4">
        <img
          class="h-auto rounded-lg shadow-lg"
          src={("./images/8_.png")}
          alt=""
        ></img>
      </div>
      <div>
        <img
          class="h-auto rounded-lg shadow-lg"
          src={("./images/9_.png")}
          alt=""
        ></img>
      </div>
      <div className="pt-10">
        <img
          class="h-auto rounded-lg shadow-lg"
          src={("./images/10_.png")}
          alt=""
        ></img>
      </div>
    </div>
  );
}

function Hero({ loggedIn, id, isHost }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              (item.home && !loggedIn) || (loggedIn && item.loggedIn) ?
                (<a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>) : <></>

            ))}
            {isHost ?
              (
                <Link to={`/addlisting/${id}`} className="text-sm font-semibold leading-6 text-gray-900">Add New Listing</Link>
              ) : <></>}
            {loggedIn ?
              (
                <Link to={`/profile/${id}`} className="text-sm font-semibold leading-6 text-gray-900">Profile</Link>
              ) : <></>}
          </div>

        </nav>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Emblify AI</span>
                <img
                  className="h-8 w-auto"
                  src={("./images/logo.png")}
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <main>
        <div className="relative isolate">
          <svg
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            />
          </svg>
          <div
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            aria-hidden="true"
          >
            <div
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#D8978F] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
      Welcome to
  </h1>
  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl" style={{color: '#CEB888'}}>
      BoilerStorage
  </h1>

                  <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                  Need a place to stash your stuff over the summer break? Welcome to BoilerStorage - we're the Airbnb of storage solutions. Our mission? Transform the cost dynamics of housing through a marketplace that efficiently connects those seeking storage with those who have extra room to spare.
                  </p>
                  <div
                    className="mt-10 flex items-center gap-x-6"
                    style={{ zIndex: 999999 }}
                  >
                    <a
                      href="/SignUp"
                      style={{ backgroundColor: "#CEB888" }}
                      className="inline-block rounded px-8 py-3 text-lg font-medium text-white transition hover:shadow-xl hover:-rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-rose-500"
                    >

                      Sign Up Now
                    </a>
                  </div>
                  <ul className="text-sm pt-3 text-gray-500">
                  To start your journey as a Host or to book a space as a Guest, sign up or log in. Browsing our array of available listings is available even without logging in.
</ul>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        src={("./images/6.gif")}
                        alt=""
                        className="w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        src={("./images/5.gif")}
                        alt=""
                        className="w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src={("./images/7.gif")}
                        alt=""
                        className="w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        src={("./images/3.gif")}
                        alt=""
                        className="w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src={("./images/1.gif")}
                        alt=""
                        className="w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Home({ loggedIn }) {
  /*
  
  */
  const { id } = useParams();
  const { state } = useLocation();

  return (
    <>
      <Hero loggedIn={loggedIn} id={id} isHost={(state) ? (state.isHost) : false}></Hero>
      <PhotoGrid></PhotoGrid>
      <Features></Features>
      <Pricing></Pricing>
      <FAQ></FAQ>

      <footer className="mx-auto max-w-7xl overflow-hidden px-6 pb-20  sm:pb-24 lg:px-8">
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 BoilerStorage. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default Home;
