/**
 * Homepage showcase — edit this file only.
 *
 * 1. Import your component at the top
 * 2. Add c("slug", <Component />, "components/.../file.tsx", "ExportName") to a row
 * 3. Each inner array = one row — use 1, 2, or 3 items
 *
 * Moving a file? Update the import AND the c(..., "components/...", ...) path.
 * Category comes from that path. Verify with: npm run check:showcase
 */
import { cloneElement, type ReactElement, type ReactNode } from "react";
import { ArrowRight, MessageCircle, Plus, Settings } from "lucide-react";

import { DarkArcBandsBackground } from "@/components/background-gradient/dark-arc-bands-background";
import { DarkAuroraBackground } from "@/components/background-gradient/dark-aurora-background";
import { DarkCarbonSpotlightBackground } from "@/components/background-gradient/dark-carbon-spotlight-background";
import { DarkEmberBackground } from "@/components/background-gradient/dark-ember-background";
import { DarkInkFieldBackground } from "@/components/background-gradient/dark-ink-field-background";
import { DarkMidnightMeshBackground } from "@/components/background-gradient/dark-midnight-mesh-background";
import { DarkRoseNoirBackground } from "@/components/background-gradient/dark-rose-noir-background";
import { DarkTealDepthBackground } from "@/components/background-gradient/dark-teal-depth-background";
import { DndFaceWidget } from "@/components/widgets/dnd-face-widget";
import { FocusBreathWidget } from "@/components/widgets/focus-breath-widget";
import { HeartRateWidget } from "@/components/widgets/heart-rate-widget";
import { HydrationWidget } from "@/components/widgets/hydration-widget";
import { PomodoroWidget } from "@/components/widgets/pomodoro-widget";
import { SleepScoreWidget } from "@/components/widgets/sleep-score-widget";
import { StepCountWidget } from "@/components/widgets/step-count-widget";
import { AudioRecorderWidget } from "@/components/widgets/audio-recorder-widget";
import { IosEarbudsWidget } from "@/components/widgets/ios-earbuds-widget";
import { RecorderFaceWidget } from "@/components/widgets/recorder-face-widget";
import { VoiceAssistantWidget } from "@/components/widgets/voice-assistant-widget";
import { BatteryFaceWidget } from "@/components/widgets/battery-face-widget";
import { ArcBandsBackground } from "@/components/background-gradient/arc-bands-background";
import { DiagonalBoxPattern } from "@/components/background-pattern/diagonal-box-pattern";
import { ReverseDiagonalBoxPattern } from "@/components/background-pattern/reverse-diagonal-box-pattern";
import { DotGridPattern } from "@/components/background-pattern/dot-grid-pattern";
import { FineGrainPattern } from "@/components/background-pattern/fine-grain-pattern";
import { GraphPaperPattern } from "@/components/background-pattern/graph-paper-pattern";
import { LineGridPattern } from "@/components/background-pattern/line-grid-pattern";
import { AuroraBackground } from "@/components/background-gradient/aurora-background";
import { CherryPetalBackground } from "@/components/background-gradient/cherry-petal-background";
import { CoralGlowBackground } from "@/components/background-gradient/coral-glow-background";
import { FrostMeshBackground } from "@/components/background-gradient/frost-mesh-background";
import { HalftonePopBackground } from "@/components/background-gradient/halftone-pop-background";
import { HoneyEmberBackground } from "@/components/background-gradient/honey-ember-background";
import { InkWashBackground } from "@/components/background-gradient/ink-wash-background";
import { LinenWeaveBackground } from "@/components/background-gradient/linen-weave-background";
import { MintLagoonBackground } from "@/components/background-gradient/mint-lagoon-background";
import { PaperFoldBackground } from "@/components/background-gradient/paper-fold-background";
import { RainPrismBackground } from "@/components/background-gradient/rain-prism-background";
import { SandDriftBackground } from "@/components/background-gradient/sand-drift-background";
import { SoftSpotlightBackground } from "@/components/background-gradient/soft-spotlight-background";
import { SunriseHorizonBackground } from "@/components/background-gradient/sunrise-horizon-background";
import { SunsetBloomBackground } from "@/components/background-gradient/sunset-bloom-background";
import { TerrazzoFragmentBackground } from "@/components/background-gradient/terrazzo-fragment-background";
import { TropicalTideBackground } from "@/components/background-gradient/tropical-tide-background";
import { AddToCartButton } from "@/components/buttons/add-to-cart-button";
import { BookmarkSaveButton } from "@/components/buttons/bookmark-save-button";
import { CinderLatchButton } from "@/components/buttons/cinder-latch-button";
import { CopyButton } from "@/components/buttons/copy-button";
import { DepthOutlineButton } from "@/components/buttons/depth-outline-button";
import { DownloadButton } from "@/components/buttons/download-button";
import { DimpleSwitch } from "@/components/buttons/dimple-switch";
import { FollowButton } from "@/components/buttons/follow-button";
import { HoldToDeleteButton } from "@/components/buttons/hold-to-delete-button";
import { InsetButton } from "@/components/buttons/inset-button";
import { LikeButton } from "@/components/buttons/like-button";
import { LinenTabButton } from "@/components/buttons/linen-tab-button";
import { AppleHelloLoader } from "@/components/loaders/apple-hello-loader";
import { SpinLoader } from "@/components/loaders/spin-loader";
import { TextLoader } from "@/components/loaders/text-loader";
import { PrismDepthButton } from "@/components/buttons/prism-depth-button";
import { QuantityStepperButton } from "@/components/buttons/quantity-stepper-button";
import { SheenPillButton } from "@/components/buttons/sheen-pill-button";
import { SlateChipSwitch } from "@/components/buttons/slate-chip-switch";
import { SoftPillButton } from "@/components/buttons/soft-pill-button";
import { SoftUiButton } from "@/components/buttons/soft-ui-button";
import { ThreeDButton } from "@/components/buttons/three-d-button";
import { ThreeDIconButton } from "@/components/buttons/three-d-icon-button";
import { SegmentedToggleButton } from "@/components/buttons/segmented-toggle-button";
import { SlideToConfirmButton } from "@/components/buttons/slide-to-confirm-button";
import { BluetoothFaceWidget } from "@/components/widgets/bluetooth-face-widget";
import { BookingSlotCalendar } from "@/components/calender/booking-slot-calendar";
import { DailyActivityCalendarWidget } from "@/components/widgets/daily-activity-calendar-widget";
import { DateRangePickerCard } from "@/components/calender/date-range-picker-card";
import { EventCountdownCard } from "@/components/calender/event-countdown-card";
import { IosCalenderWidget } from "@/components/widgets/ios-calender-widget";
import { MonthPickerCalendar } from "@/components/calender/month-picker-calendar";
import { WeekStripCalendar } from "@/components/calender/week-strip-calendar";
import { CustomersTable } from "@/components/table/customers-table";
import { AppDock } from "@/components/docks/app-dock";
import { EditorToolDock } from "@/components/docks/editor-tool-dock";
import { MacDock } from "@/components/docks/mac-dock";
import { PresenceDock } from "@/components/docks/presence-dock";
import { SpotlightBar } from "@/components/docks/spotlight-bar";
import { OrdersTable } from "@/components/table/orders-table";
import { RecentTransactionsTable } from "@/components/table/recent-transactions-table";
import { ResourceLinksPanel } from "@/components/resources/resource-links-panel";
import { TasksTable } from "@/components/table/tasks-table";
import { TeamMembersTable } from "@/components/table/team-members-table";
import { UsersSelectTable } from "@/components/table/users-select-table";
import { CafeMenuBoardCard } from "@/components/text/cafe-menu-board-card";
import { CinemaTicketCard } from "@/components/text/cinema-ticket-card";
import { DailyMotivationCard } from "@/components/text/daily-motivation-card";
import { DenimProductEditorialCard } from "@/components/text/denim-product-editorial-card";
import { CreditCardGlass } from "@/components/users/credit-card-glass";
import { DiscordChatCard } from "@/components/socials/discord-chat-card";
import { DropCapEditorialCard } from "@/components/text/drop-cap-editorial-card";
import { EditorialQuoteCard } from "@/components/text/editorial-quote-card";
import { EventTicketCard } from "@/components/event/event-ticket-card";
import { FacebookPostCard } from "@/components/socials/facebook-post-card";
import { GalleryWallCard } from "@/components/gallery/gallery-wall-card";
import { CircleCutFrame } from "@/components/frames/circle-cut-frame";
import { HardShadowPolaroidFrame } from "@/components/frames/hard-shadow-polaroid-frame";
import { StickyNotePolaroidFrame } from "@/components/frames/sticky-note-polaroid-frame";
import { TransformBoxFrame } from "@/components/frames/transform-box-frame";
import { TransformPlusFrame } from "@/components/frames/transform-plus-frame";
import { FilmStripCard } from "@/components/gallery/film-strip-card";
import { GalleryGridCard } from "@/components/gallery/gallery-grid-card";
import { GitHubRepoCard } from "@/components/socials/github-repo-card";
import { GlassOverlayImageCard } from "@/components/gallery/glass-overlay-image-card";
import { ComboboxFieldInput } from "@/components/inputs/combobox-field-input";
import { DateFieldInput } from "@/components/inputs/date-field-input";
import { FileUploadFieldInput } from "@/components/inputs/file-upload-field-input";
import { FloatingLabelFieldInput } from "@/components/inputs/floating-label-field-input";
import { ContactForm } from "@/components/forms/contact-form";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";
import { LoginForm } from "@/components/forms/login-form";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SignupForm } from "@/components/forms/signup-form";
import { CheckboxFieldInput } from "@/components/inputs/checkbox-field-input";
import { InputGroupField } from "@/components/inputs/input-group-field";
import { PasswordFieldInput } from "@/components/inputs/password-field-input";
import { PhoneFieldInput } from "@/components/inputs/phone-field-input";
import { RadioGroupFieldInput } from "@/components/inputs/radio-group-field-input";
import { SearchInput } from "@/components/inputs/search-input";
import { SelectFieldInput } from "@/components/inputs/select-field-input";
import { SwitchFieldInput } from "@/components/inputs/switch-field-input";
import { TextFieldInput } from "@/components/inputs/text-field-input";
import { TextareaFieldInput } from "@/components/inputs/textarea-field-input";
import { InstagramPostCard } from "@/components/socials/instagram-post-card";
import { JournalWritingCard } from "@/components/text/journal-writing-card";
import { KeyboardShortcutsCard } from "@/components/text/keyboard-shortcuts-card";
import { LinkedInPostCard } from "@/components/socials/linked-in-post-card";
import { LinkedInProfileCard } from "@/components/socials/linked-in-profile-card";
import { MuseumPlacardCard } from "@/components/gallery/museum-placard-card";
import { MagazineCoverCard } from "@/components/text/magazine-cover-card";
import { MusicPlayerCard } from "@/components/audio/music-player-card";
import { MusicPlaylistCard } from "@/components/audio/music-playlist-card";
import { NotepadCard } from "@/components/text/notepad-card";
import { StackedFolderCard } from "@/components/files/stacked-folder-card";
import { InkStampDocumentCard } from "@/components/files/ink-stamp-document-card";
import { OpensourceFolderTabCard } from "@/components/folder/opensource-folder-tab-card";
import { NowPlayingBar } from "@/components/audio/now-playing-bar";
import { PhotoAlbumCard } from "@/components/gallery/photo-album-card";
import { PhotoContactSheetCard } from "@/components/gallery/photo-contact-sheet-card";
import { PolaroidImageCard } from "@/components/gallery/polaroid-image-card";
import { ProgressRingCard } from "@/components/others/progress-ring-card";
import { RetailPriceTagCard } from "@/components/pricing/retail-price-tag-card";
import { StackedCardsEffect } from "@/components/others/stacked-cards-effect";
import { SlowLivingPolaroidCard } from "@/components/gallery/slow-living-polaroid-card";
import { StampPostcardCard } from "@/components/gallery/stamp-postcard-card";
import { TeamMemberCard } from "@/components/users/team-member-card";
import { TerminalLogCard } from "@/components/others/terminal-log-card";
import { TestimonialCard } from "@/components/users/testimonial-card";
import { FlightBoardingCard } from "@/components/travel/flight-boarding-card";
import { ThermalReceiptCard } from "@/components/others/thermal-receipt-card";
import { WeatherSnapshotCard } from "@/components/others/weather-snapshot-card";
import { ThreadsPostCard } from "@/components/socials/threads-post-card";
import { TogglePricingCards } from "@/components/pricing/toggle-pricing-cards";
import { TravelPostcardCard } from "@/components/travel/travel-postcard-card";
import { TwitterPostCard } from "@/components/socials/twitter-post-card";
import { TwitterProfileCard } from "@/components/socials/twitter-profile-card";
import { WalletPassCard } from "@/components/wallet/wallet-pass-card";
import { AnalogClockWidget } from "@/components/widgets/analog-clock-widget";
import { IosDigitalClockWidget } from "@/components/widgets/ios-digital-clock-widget";
import { CompassWidget } from "@/components/widgets/compass-widget";
import { FileMenuDropdown } from "@/components/dropdowns/file-menu-dropdown";
import { FilterSortDropdown } from "@/components/dropdowns/filter-sort-dropdown";
import { KebabActionsDropdown } from "@/components/dropdowns/kebab-actions-dropdown";
import { NotificationDropdown } from "@/components/dropdowns/notification-dropdown";
import { ShareMenuDropdown } from "@/components/dropdowns/share-menu-dropdown";
import { UserMenuDropdown } from "@/components/dropdowns/user-menu-dropdown";
import { WorkspaceSwitcherDropdown } from "@/components/dropdowns/workspace-switcher-dropdown";
import { GithubContributionCard } from "@/components/socials/github-contribution";
import { IosMapLocationWidget } from "@/components/widgets/ios-map-location-widget";
import { AppleWatchMockupCard } from "@/components/mockups/apple-watch-mockup-card";
import { BrowserMockupCard } from "@/components/mockups/browser-mockup-card";
import { IpodMockupCard } from "@/components/mockups/apple-ipod-mockup-card";
import { IpadMockupCard } from "@/components/mockups/tablet-mockup-card";
import { LaptopMockupCard } from "@/components/mockups/laptop-mockup-card";
import { PhoneMockupCard } from "@/components/mockups/phone-mockup-card";
import { AppleNotificationBanner } from "@/components/notifications/apple-notification-banner";
import { CalendarReminderNotificationBanner } from "@/components/notifications/calendar-reminder-notification-banner";
import { ChatBubbleNotificationBanner } from "@/components/notifications/chat-bubble-notification-banner";
import { DeliveryNotificationBanner } from "@/components/notifications/delivery-notification-banner";
import { DeployNotificationBanner } from "@/components/notifications/deploy-notification-banner";
import { EmailNotificationBanner } from "@/components/notifications/email-notification-banner";
import { IncomingCallNotificationBanner } from "@/components/notifications/incoming-call-notification-banner";
import { PaymentNotificationBanner } from "@/components/notifications/payment-notification-banner";
import { SystemAlertBanner } from "@/components/notifications/system-alert-banner";
import { ToastNotificationBanner } from "@/components/notifications/toast-notification-banner";
import { TeamMemberProfileGrid } from "@/components/profile/team-member-profile-grid";
import { BlobProfileCard } from "@/components/widgets/blob-profile";
import { ContactProfileCard } from "@/components/profile/contact-profile-card";
import { EditorialStaffProfileCard } from "@/components/profile/editorial-staff-profile-card";
import { UserProfileCard } from "@/components/profile/user-profile-card";
import { StopwatchWidget } from "@/components/widgets/stopwatch-widget";
import { TorchFaceWidget } from "@/components/widgets/torch-face-widget";
import { ElectricScooterWidget } from "@/components/widgets/electric-scooter-widget";
import { FlightArrivalWidget } from "@/components/widgets/flight-arrival-widget";
import { MinimalAgendaWidget } from "@/components/widgets/minimal-agenda-widget";
import { RidePickupWidget } from "@/components/widgets/ride-pickup-widget";
import { WiFiToggleWidget } from "@/components/widgets/wifi-toggle-widget";
import {
  AnnotatedTextShowcase,
  ANNOTATED_TEXT_USAGE,
} from "@/components/underlines/annotated-text-showcase";
import { OtpBoxedInput } from "@/components/otp/otp-boxed-input";
import { OtpUnderlineInput } from "@/components/otp/otp-underline-input";

type ShowcaseOpts = {
  title?: string;
  description?: string;
  usage?: string;
  isNew?: boolean;
};

// Add a showcased component to a row.
export function c(
  slug: string,
  preview: ReactNode,
  file: string,
  exportName: string,
  opts?: ShowcaseOpts,
) {
  return {
    slug,
    file,
    exportName,
    preview: cloneElement(preview as ReactElement, { key: slug }),
    ...opts,
  };
}

// Each inner array is one homepage row.
export const showcaseRows = [
  [
    c(
      "3d-button",
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ThreeDButton>
          Continue
          <ArrowRight size={15} strokeWidth={2} aria-hidden />
        </ThreeDButton>
        <ThreeDButton variant="soft">Cancel</ThreeDButton>
        <ThreeDButton variant="muted" size="sm">
          Learn more
        </ThreeDButton>
      </div>,
      "components/buttons/three-d-button.tsx",
      "ThreeDButton",
      {
        title: "Tactile 3D",
        description:
          "Universal 3D button with tactile keycap shadows — pass any children (label, icon + label). Variants: solid, soft, muted. Sizes: sm, md, lg, icon. Press sinks the key in.",
        usage:
          '<ThreeDButton variant="solid"><ArrowRight /> Continue</ThreeDButton>',
      },
    ),
    c(
      "3d-icon-button",
      <div className="flex items-center justify-center gap-3">
        <ThreeDIconButton label="Add" variant="solid">
          <Plus size={16} strokeWidth={2} aria-hidden />
        </ThreeDIconButton>
        <ThreeDIconButton label="Settings" variant="soft">
          <Settings size={16} strokeWidth={2} aria-hidden />
        </ThreeDIconButton>
        <ThreeDIconButton label="Add muted" variant="muted">
          <MessageCircle size={16} strokeWidth={2} aria-hidden />
        </ThreeDIconButton>
      </div>,
      "components/buttons/three-d-icon-button.tsx",
      "ThreeDIconButton",
      {
        title: "Tactile 3D Icon",
        description:
          "Square 3D icon button — pass any icon as children and a required label for accessibility. Same solid / soft / muted materials as ThreeDButton.",
        usage:
          '<ThreeDIconButton label="Settings" variant="soft"><Settings /></ThreeDIconButton>',
      },
    ),
  ],
  [
    c(
      "soft-ui-button",
      <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-neutral-100 p-4">
        <SoftUiButton>
          Get started
          <ArrowRight size={15} strokeWidth={2} aria-hidden />
        </SoftUiButton>
        <SoftUiButton size="sm">Cancel</SoftUiButton>
      </div>,
      "components/buttons/soft-ui-button.tsx",
      "SoftUiButton",
      {
        title: "Neumorphic Soft UI",
        description:
          "Universal soft-UI / neumorphic button — even light and dark shadows. Pass any children. Press flips to an inset look.",
        usage: "<SoftUiButton>Get started</SoftUiButton>",
      },
    ),
    c(
      "inset-button",
      <div className="flex flex-wrap items-center justify-center gap-3">
        <InsetButton>Secondary</InsetButton>
        <InsetButton variant="dark">Confirm</InsetButton>
      </div>,
      "components/buttons/inset-button.tsx",
      "InsetButton",
      {
        title: "Recessed Inset",
        description:
          "Recessed inset button — looks pressed into the surface. Light or dark variant. Pass any children.",
        usage: '<InsetButton variant="dark">Confirm</InsetButton>',
      },
    ),
  ],
  [
    c(
      "soft-pill-button",
      <div className="flex flex-wrap items-center justify-center gap-3">
        <SoftPillButton>
          Book now
          <ArrowRight size={15} strokeWidth={2} aria-hidden />
        </SoftPillButton>
        <SoftPillButton variant="dark">Subscribe</SoftPillButton>
      </div>,
      "components/buttons/soft-pill-button.tsx",
      "SoftPillButton",
      {
        title: "Floating Pill",
        description:
          "Floating rounded pill with a soft drop shadow — light or dark. Pass any children. Nudges down slightly on press.",
        usage: '<SoftPillButton variant="dark">Subscribe</SoftPillButton>',
      },
    ),
    c(
      "depth-outline-button",
      <div className="flex flex-wrap items-center justify-center gap-3">
        <DepthOutlineButton>Learn more</DepthOutlineButton>
        <DepthOutlineButton size="lg">
          Continue
          <ArrowRight size={15} strokeWidth={2} aria-hidden />
        </DepthOutlineButton>
      </div>,
      "components/buttons/depth-outline-button.tsx",
      "DepthOutlineButton",
      {
        title: "Depth Outline",
        description:
          "Premium outline button with layered float depth, a soft top lip, and a press-in sink — secondary CTA that still feels tactile. Pass any children.",
        usage: "<DepthOutlineButton>Learn more</DepthOutlineButton>",
      },
    ),
  ],
  [
    c(
      "sheen-pill-button",
      <SheenPillButton>Get started</SheenPillButton>,
      "components/buttons/sheen-pill-button.tsx",
      "SheenPillButton",
      {
        title: "Sheen Pill",
        description:
          "Frosted pill with layered shade veil, light band, and rim wire — hover brightens the sheen and clears the fill. Pass width, height, and highlight to tune the frame.",
        usage:
          "<SheenPillButton width={200} height={60}>Get started</SheenPillButton>",
      },
    ),
  ],
  [
    c(
      "prism-depth-button",
      <PrismDepthButton>Get started</PrismDepthButton>,
      "components/buttons/prism-depth-button.tsx",
      "PrismDepthButton",
      {
        title: "Prism Depth",
        description:
          "Dark depth button with a cyan edge flare, rim glow, and layered core veil — pass any label as children.",
        usage: "<PrismDepthButton>Get started</PrismDepthButton>",
      },
    ),
  ],
  [
    c(
      "dimple-switch",
      <DimpleSwitch defaultChecked />,
      "components/buttons/dimple-switch.tsx",
      "DimpleSwitch",
      {
        title: "Dimple Switch",
        isNew: true,
        description:
          "Tactile switch with a dimpled knob, metallic track, and amber on-state fill. Hidden checkbox drives the slide — controlled or uncontrolled.",
        usage:
          '<DimpleSwitch defaultChecked onCheckedChange={setEnabled} label="Enable setting" />',
      },
    ),
  ],
  [
    c(
      "cinder-latch-button",
      <CinderLatchButton>Unlock</CinderLatchButton>,
      "components/buttons/cinder-latch-button.tsx",
      "CinderLatchButton",
      {
        title: "Cinder Latch",
        isNew: true,
        description:
          "Charcoal latch button with a warm ember under-glow, center groove, and face sheen — built for secure-action CTAs.",
        usage: "<CinderLatchButton>Unlock</CinderLatchButton>",
      },
    ),
    c(
      "slate-chip-switch",
      <SlateChipSwitch defaultChecked />,
      "components/buttons/slate-chip-switch.tsx",
      "SlateChipSwitch",
      {
        title: "Slate Chip Switch",
        description:
          "Smooth pill chip switch with a white thumb and sky on-state fill — a cleaner alternative to textured toggles.",
        usage:
          '<SlateChipSwitch defaultChecked onCheckedChange={setMode} label="Enable mode" />',
      },
    ),
  ],
  [
    c(
      "linen-tab-button",
      <LinenTabButton>View details</LinenTabButton>,
      "components/buttons/linen-tab-button.tsx",
      "LinenTabButton",
      {
        title: "Linen Tab",
        description:
          "Woven linen tab with dashed stitch borders and a soft fold sheen — warm, editorial, and understated.",
        usage: "<LinenTabButton>View details</LinenTabButton>",
      },
    ),
  ],
  [
    c(
      "slide-to-confirm-button",
      <SlideToConfirmButton />,
      "components/buttons/slide-to-confirm-button.tsx",
      "SlideToConfirmButton",
      {
        title: "Slide to Confirm",
        description:
          "Drag the knob across the track to commit an action — snaps back if you release early, locks green when confirmed. Great for irreversible or high-intent actions.",
        usage:
          '<SlideToConfirmButton label="Slide to pay" onConfirm={handlePay} />',
      },
    ),
    c(
      "hold-to-delete-button",
      <HoldToDeleteButton />,
      "components/buttons/hold-to-delete-button.tsx",
      "HoldToDeleteButton",
      {
        title: "Hold to Delete",
        description:
          "Press and hold as a fill sweeps across; release early to cancel, hold to the end to delete. Prevents accidental destructive taps.",
        usage:
          "<HoldToDeleteButton holdMs={1100} onHoldComplete={handleDelete} />",
      },
    ),
  ],
  [
    c(
      "add-to-cart-button",
      <AddToCartButton />,
      "components/buttons/add-to-cart-button.tsx",
      "AddToCartButton",
      {
        title: "Add to Cart",
        description:
          "Raised 3D add-to-cart key that sinks in while adding, with gentle label crossfades, then pops back up in a solid emerald added state before resetting.",
        usage:
          '<AddToCartButton label="Add to cart" onAddToCart={async () => addItem(id)} />',
      },
    ),
    c(
      "like-button",
      <LikeButton />,
      "components/buttons/like-button.tsx",
      "LikeButton",
      {
        title: "Like Toggle",
        description:
          "Heart toggle that pops and scatters particles on the way up, with a live count. Pill fills rose when active — no glow, no gradient.",
        usage: "<LikeButton count={128} defaultLiked={false} />",
      },
    ),
    c(
      "copy-button",
      <CopyButton />,
      "components/buttons/copy-button.tsx",
      "CopyButton",
      {
        title: "Copy to Clipboard",
        description:
          "Copies text to the clipboard and cross-fades the copy icon into a check with a Copied label. Monospace value, resets on its own.",
        usage: '<CopyButton value="npm i @appui/components" />',
      },
    ),
  ],
  [
    c(
      "quantity-stepper-button",
      <QuantityStepperButton />,
      "components/buttons/quantity-stepper-button.tsx",
      "QuantityStepperButton",
      {
        title: "Quantity Stepper",
        description:
          "Inline minus / count / plus control for carts and forms. Clamps between min and max, disables at the edges.",
        usage:
          "<QuantityStepperButton value={1} min={0} max={99} onChange={setQty} />",
      },
    ),
    c(
      "download-button",
      <DownloadButton />,
      "components/buttons/download-button.tsx",
      "DownloadButton",
      {
        title: "Download with States",
        description:
          "Raised 3D download key that sinks while downloading — arrow morphs to spinner to check — then pops back up as a solid emerald done state.",
        usage: '<DownloadButton label="Download" onDownload={fetchFile} />',
      },
    ),
    c(
      "follow-button",
      <FollowButton />,
      "components/buttons/follow-button.tsx",
      "FollowButton",
      {
        title: "Follow Toggle",
        description:
          "Social follow toggle — dark Follow pill becomes a quiet Following state with a user-check icon. Tap again to unfollow.",
        usage: '<FollowButton label="Follow" followingLabel="Following" />',
      },
    ),
  ],
  [
    c(
      "bookmark-save-button",
      <BookmarkSaveButton />,
      "components/buttons/bookmark-save-button.tsx",
      "BookmarkSaveButton",
      {
        title: "Bookmark Save",
        description:
          "Save for later — bookmark icon fills amber and label swaps to Saved. Square-ish control for articles and products.",
        usage: '<BookmarkSaveButton label="Save" savedLabel="Saved" />',
      },
    ),
    c(
      "segmented-toggle-button",
      <SegmentedToggleButton />,
      "components/buttons/segmented-toggle-button.tsx",
      "SegmentedToggleButton",
      {
        title: "Segmented Control",
        description:
          "iOS segmented control — sliding white pill between Day, Week, and Month. Pass your own options array for view modes or filters.",
        usage:
          '<SegmentedToggleButton options={["Day", "Week", "Month"]} onChange={(i, v) => {}} />',
      },
    ),
    c(
      "analog-clock-roman",
      <AnalogClockWidget variant="roman" />,
      "components/widgets/analog-clock-widget.tsx",
      "AnalogClockWidget",
      {
        title: "Analog Clock — Roman",
        description:
          "A live analog clock dressed in roman numerals — classic dial, real moving hands. Swap the variant prop to match the mood of your layout.",
        usage: '<AnalogClockWidget variant="roman" />',
      },
    ),
    c(
      "analog-clock-minimal",
      <AnalogClockWidget variant="minimal" />,
      "components/widgets/analog-clock-widget.tsx",
      "AnalogClockWidget",
      {
        title: "Analog Clock — Minimal",
        description:
          "Ticks and hands on a quiet face, nothing else. When you want the time to sit in the background without shouting over your UI.",
        usage: '<AnalogClockWidget variant="minimal" />',
      },
    ),
    c(
      "analog-clock-numeric",
      <AnalogClockWidget variant="numeric" />,
      "components/widgets/analog-clock-widget.tsx",
      "AnalogClockWidget",
      {
        title: "Analog Clock — Numeric",
        description:
          "Arabic numerals and a live second hand on a clean analog dial. Readable from across the room, still far from a default system clock.",
        usage: '<AnalogClockWidget variant="numeric" />',
      },
    ),
  ],
  [
    c(
      "wifi-toggle",
      <WiFiToggleWidget />,
      "components/widgets/wifi-toggle-widget.tsx",
      "WiFiToggleWidget",
      {
        description:
          "The toggle you'd expect on an iPhone — network name, on/off switch, that familiar iOS weight. Drop it into any control panel or settings screen.",
        usage: '<WiFiToggleWidget networkName="Studio-5G" defaultOn={false} />',
      },
    ),
    c(
      "voice-assistant",
      <VoiceAssistantWidget />,
      "components/widgets/voice-assistant-widget.tsx",
      "VoiceAssistantWidget",
      {
        description:
          "Animated equalizer bars and a mic button that flip between idle and listening. Builds the voice-AI moment without building the whole assistant.",
        usage: '<VoiceAssistantWidget label="Listening…" />',
      },
    ),
    c(
      "ios-earbuds",
      <IosEarbudsWidget />,
      "components/widgets/ios-earbuds-widget.tsx",
      "IosEarbudsWidget",
      {
        description:
          "AirPods-style widget showing device name and connection status. Small, familiar, and perfect beside other iOS-style controls.",
        usage: '<IosEarbudsWidget name="AirPods Pro" connected />',
      },
    ),
  ],
  [
    c(
      "recorder-face",
      <RecorderFaceWidget />,
      "components/widgets/recorder-face-widget.tsx",
      "RecorderFaceWidget",
      {
        description:
          "A quirky record button with a mascot face, circular dial, and live timer. Tap to start and pause — feels like a tiny dedicated recorder app.",
      },
    ),
    c(
      "battery-face",
      <BatteryFaceWidget />,
      "components/widgets/battery-face-widget.tsx",
      "BatteryFaceWidget",
      {
        description:
          "Battery level as a character — arc ring, percentage, hours left, and a face that actually looks sad when you're running low.",
        usage: '<BatteryFaceWidget percent={57} hoursLeft="~5h left" />',
      },
    ),
    c(
      "compass",
      <CompassWidget />,
      "components/widgets/compass-widget.tsx",
      "CompassWidget",
      {
        description:
          "A compass dial with labeled directions and a needle that follows device tilt. Pass a heading prop or let the browser handle orientation.",
        usage: "<CompassWidget heading={45} />",
      },
    ),
  ],
  [
    c(
      "bluetooth-face",
      <BluetoothFaceWidget />,
      "components/widgets/bluetooth-face-widget.tsx",
      "BluetoothFaceWidget",
      {
        description:
          "A teal mascot face that reacts when Bluetooth connects or drops. Toggle on/off with an expression change — playful, but still reads as a real status widget.",
        usage: '<BluetoothFaceWidget deviceName="Bluetooth" defaultOn />',
      },
    ),
    c(
      "torch-face",
      <TorchFaceWidget />,
      "components/widgets/torch-face-widget.tsx",
      "TorchFaceWidget",
      {
        description:
          "Yellow flashlight toggle with a face that lights up when the torch is on. Small detail, but the kind people notice on a control sheet.",
      },
    ),
    c(
      "dnd-face",
      <DndFaceWidget />,
      "components/widgets/dnd-face-widget.tsx",
      "DndFaceWidget",
      {
        description:
          "Focus mode as a purple moon mascot — tap to toggle DND and watch the expression shift. Makes a utilitarian setting feel a little human.",
        usage: '<DndFaceWidget label="Focus" defaultOn />',
      },
    ),
  ],
  [
    c(
      "ios-digital-clock",
      <IosDigitalClockWidget />,
      "components/widgets/ios-digital-clock-widget.tsx",
      "IosDigitalClockWidget",
      {
        description:
          "Live HH:MM in an iOS squircle with subtle tick marks around the edge. The kind of clock tile you'd find on a lock screen.",
      },
    ),
    c(
      "ios-calender",
      <IosCalenderWidget />,
      "components/widgets/ios-calender-widget.tsx",
      "IosCalenderWidget",
      {
        description:
          "Today's date in the classic iOS calendar tile — red weekday, big day number, month underneath. Updates live, no refresh needed.",
      },
    ),
    c(
      "stopwatch",
      <StopwatchWidget />,
      "components/widgets/stopwatch-widget.tsx",
      "StopwatchWidget",
      {
        description:
          "Millisecond-precision stopwatch with reset, play-pause, and stop in a compact white widget. Running state shown with a small indicator dot.",
      },
    ),
  ],
  [
    c(
      "ios-map-location",
      <IosMapLocationWidget />,
      "components/widgets/ios-map-location-widget.tsx",
      "IosMapLocationWidget",
      {
        description:
          "Map pin widget with your city name — simple location card in the iOS family. Good for travel apps, weather screens, or profile headers.",
        usage: '<IosMapLocationWidget city="Kolkata" />',
      },
    ),
    c(
      "focus-breath",
      <FocusBreathWidget />,
      "components/widgets/focus-breath-widget.tsx",
      "FocusBreathWidget",
      {
        description:
          "A breathing guide that pulses between inhale and exhale every four seconds. One tap to start — useful in wellness or focus flows.",
        usage: '<FocusBreathWidget label="Breathe" />',
      },
    ),
    c(
      "blob-profile",
      <BlobProfileCard />,
      "components/widgets/blob-profile.tsx",
      "BlobProfileCard",
      {
        description:
          "Profile card with an organic blob-shaped photo frame, name, verified check, and handle. Stands out from every circular-avatar layout on the web.",
        usage:
          '<BlobProfileCard name="Bidyut Kundu" handle="@bidyut.dev" image="/your-photo.png" />',
      },
    ),
    c(
      "editorial-staff-profile",
      <EditorialStaffProfileCard />,
      "components/profile/editorial-staff-profile-card.tsx",
      "EditorialStaffProfileCard",
      {
        description:
          "Numbered editorial roster row with serif name, uppercase role, and a square photo. Built for about pages and team indexes.",
        usage:
          '<EditorialStaffProfileCard index="04" name="Mira Okonkwo" role="Design editor" image="/profile-picture.png" />',
      },
    ),
    c(
      "user-profile",
      <UserProfileCard />,
      "components/profile/user-profile-card.tsx",
      "UserProfileCard",
      {
        description:
          "Author byline on warm editorial paper — square portrait, serif name, and text links. Built for personal sites and portfolio sidebars.",
        usage:
          '<UserProfileCard name="Bidyut Kundu" title="Founder" emailHref="mailto:hello@site.com" websiteHref="https://yoursite.com" />',
      },
    ),
  ],
  [
    c(
      "contact-profile",
      <ContactProfileCard />,
      "components/profile/contact-profile-card.tsx",
      "ContactProfileCard",
      {
        description:
          "Museum placard contact directory — mono labels, serif name, and typographic rows without icon clutter.",
        usage:
          '<ContactProfileCard name="Bidyut Kundu" email="hello@site.com" phone="+1 555 0100" location="Berlin" />',
      },
    ),
    c(
      "team-member-profile-grid",
      <TeamMemberProfileGrid />,
      "components/profile/team-member-profile-grid.tsx",
      "TeamMemberProfileGrid",
      {
        description:
          "Responsive team grid with vertical portrait cards — section header plus name, role, bio, and profile link per member.",
        usage:
          '<TeamMemberProfileGrid title="The team" members={[{ name: "Bidyut Kundu", role: "Founder", bio: "...", image: "/profile-picture.png", profileHref: "/about" }]} />',
      },
    ),
  ],
  [
    c("mac-dock", <MacDock />, "components/docks/mac-dock.tsx", "MacDock", {
      description:
        "Frosted macOS-style app dock with smooth hover lift, tooltips, and brand icons — Tailwind-only, no motion library.",
      usage:
        '<MacDock items={[{ title: "Home", href: "/", icon: <Home className="size-full" /> }]} />',
    }),
    c("app-dock", <AppDock />, "components/docks/app-dock.tsx", "AppDock", {
      description:
        "Bottom app launcher dock matching MacDock shell, spacing, and hover lift — with active state and optional labels.",
      usage:
        '<AppDock activeId="home" showLabels onSelect={(id) => console.log(id)} />',
    }),
  ],
  [
    c(
      "editor-tool-dock",
      <EditorToolDock />,
      "components/docks/editor-tool-dock.tsx",
      "EditorToolDock",
      {
        description:
          "Vertical editor tool dock using MacDock tile size, padding, and ease-smooth hover scale.",
        usage:
          '<EditorToolDock activeId="select" onSelect={(id) => console.log(id)} />',
      },
    ),
    c(
      "presence-dock",
      <PresenceDock />,
      "components/docks/presence-dock.tsx",
      "PresenceDock",
      {
        description:
          "Collaborator presence dock with MacDock-sized avatar tiles and expandable member list.",
        usage:
          "<PresenceDock maxVisible={3} onSelect={(id) => console.log(id)} />",
      },
    ),
  ],
  [
    c(
      "spotlight-bar",
      <SpotlightBar />,
      "components/docks/spotlight-bar.tsx",
      "SpotlightBar",
      {
        description:
          "Spotlight-style command search in the frosted dock shell — keyboard nav and suggestions.",
        usage: "<SpotlightBar onSelectSuggestion={(id) => console.log(id)} />",
      },
    ),
  ],
  [
    c(
      "step-count",
      <StepCountWidget />,
      "components/widgets/step-count-widget.tsx",
      "StepCountWidget",
      {
        description:
          "Editorial step stat — light wide card, large number, goal in a quiet footer row. No progress bars or icons.",
        usage:
          '<StepCountWidget steps={8432} goal={10000} label="steps today" />',
      },
    ),
    c(
      "pomodoro",
      <PomodoroWidget />,
      "components/widgets/pomodoro-widget.tsx",
      "PomodoroWidget",
      {
        description:
          "Dark pomodoro timer — thin ring, split monospace time, tap to start or pause. Polished to match the DND card size and proportions.",
        usage: '<PomodoroWidget minutes={25} label="Focus" />',
      },
    ),
    c(
      "hydration",
      <HydrationWidget />,
      "components/widgets/hydration-widget.tsx",
      "HydrationWidget",
      {
        description:
          "Tall bottle card — count at the top, water level rises inside a simple bottle outline. Tap to log a glass.",
        usage: '<HydrationWidget glasses={5} goal={8} label="glasses" />',
      },
    ),
  ],
  [
    c(
      "sleep-score",
      <SleepScoreWidget />,
      "components/widgets/sleep-score-widget.tsx",
      "SleepScoreWidget",
      {
        description:
          "Sleep score in the DND face layout — sleeping mascot at the bottom, score and quality above, duration tucked below.",
        usage:
          '<SleepScoreWidget score={87} quality="Good" duration="7h 24m" />',
      },
    ),
    c(
      "heart-rate",
      <HeartRateWidget />,
      "components/widgets/heart-rate-widget.tsx",
      "HeartRateWidget",
      {
        description:
          "Heart rate in the DND face layout — mascot at the bottom, BPM above the dial, soft pulse on the ring.",
        usage: "<HeartRateWidget bpm={72} />",
      },
    ),
    c(
      "daily-activity-calendar",
      <DailyActivityCalendarWidget />,
      "components/widgets/daily-activity-calendar-widget.tsx",
      "DailyActivityCalendarWidget",
      {
        description:
          "Month grid for the current month — today is highlighted in orange, with a short emerald streak on prior days. Pass activeDays or highlightDay to override.",
        usage:
          "<DailyActivityCalendarWidget activeDays={[12, 13, 14, 15, 16]} highlightDay={17} />",
      },
    ),
  ],
  [
    c(
      "month-picker-calendar",
      <MonthPickerCalendar />,
      "components/calender/month-picker-calendar.tsx",
      "MonthPickerCalendar",
      {
        description:
          "Full month picker with prev/next navigation — tap any day to select it, today gets a quiet ring.",
        usage: "<MonthPickerCalendar onSelect={(date) => console.log(date)} />",
      },
    ),
    c(
      "week-strip-calendar",
      <WeekStripCalendar />,
      "components/calender/week-strip-calendar.tsx",
      "WeekStripCalendar",
      {
        description:
          "Horizontal week strip for booking and scheduling apps — arrow through weeks, tap a day to select.",
        usage: "<WeekStripCalendar onSelect={(date) => {}} />",
      },
    ),
    c(
      "date-range-picker",
      <DateRangePickerCard />,
      "components/calender/date-range-picker-card.tsx",
      "DateRangePickerCard",
      {
        description:
          "Travel-style date range picker — first tap sets check-in, second sets check-out, days between fill in.",
        usage: "<DateRangePickerCard onChange={(start, end) => {}} />",
      },
    ),
  ],
  [
    c(
      "team-members-table",
      <TeamMembersTable />,
      "components/table/team-members-table.tsx",
      "TeamMembersTable",
      {
        description:
          "Team members with profile photos, email, role, and status. Uses /profile-picture.png and /woman.png avatars.",
        usage: "<TeamMembersTable />",
      },
    ),
    c(
      "orders-table",
      <OrdersTable />,
      "components/table/orders-table.tsx",
      "OrdersTable",
      {
        description:
          "E-commerce orders table — sort by date, total, or status. The standard admin dashboard orders view.",
        usage: "<OrdersTable />",
      },
    ),
    c(
      "users-select-table",
      <UsersSelectTable />,
      "components/table/users-select-table.tsx",
      "UsersSelectTable",
      {
        description:
          "Bulk-select users table with header checkbox and live selection count. Clean white admin pattern for permissions or exports.",
        usage: "<UsersSelectTable />",
      },
    ),
  ],
  [
    c(
      "recent-transactions-table",
      <RecentTransactionsTable />,
      "components/table/recent-transactions-table.tsx",
      "RecentTransactionsTable",
      {
        description:
          "Stripe-style transaction list with positive and negative amounts and simple pagination.",
        usage: "<RecentTransactionsTable />",
      },
    ),
    c(
      "tasks-table",
      <TasksTable />,
      "components/table/tasks-table.tsx",
      "TasksTable",
      {
        description:
          "Project tasks with checkboxes, assignee avatars, and due dates. Tap to mark complete.",
        usage: "<TasksTable />",
      },
    ),
    c(
      "customers-table",
      <CustomersTable />,
      "components/table/customers-table.tsx",
      "CustomersTable",
      {
        description:
          "SaaS customer list with plan, last active, and MRR. Common billing dashboard table.",
        usage: "<CustomersTable />",
      },
    ),
  ],
  [
    c(
      "resource-links-panel",
      <ResourceLinksPanel className="mt-0" />,
      "components/resources/resource-links-panel.tsx",
      "ResourceLinksPanel",
      {
        description:
          "Resource link list with logo, name, description, and domain per row — same layout as the homepage Resources section. Copy and pass title + items.",
        usage:
          '<ResourceLinksPanel title="Resources" items={[{ name: "Lucide", description: "For icons", href: "https://lucide.dev", imageSrc: "/lucide-logo.svg" }]} />',
      },
    ),
    c(
      "event-countdown-card",
      <EventCountdownCard />,
      "components/calender/event-countdown-card.tsx",
      "EventCountdownCard",
      {
        description:
          "Live countdown to an event — days, hours, and minutes update every minute. Editorial typography, no ticker gimmicks.",
        usage:
          '<EventCountdownCard title="Product launch" targetDate="2026-12-01T09:00:00" />',
      },
    ),
    c(
      "booking-slot-calendar",
      <BookingSlotCalendar />,
      "components/calender/booking-slot-calendar.tsx",
      "BookingSlotCalendar",
      {
        description:
          "Appointment booking flow — week strip on top, time slots below. Unavailable slots are crossed out, tap to book.",
        usage: "<BookingSlotCalendar onBook={(date, slot) => {}} />",
      },
    ),
    c(
      "audio-recorder",
      <AudioRecorderWidget />,
      "components/widgets/audio-recorder-widget.tsx",
      "AudioRecorderWidget",
      {
        description:
          "Dark recording card with title, date, animated red waveform, and elapsed time. Play and pause feel like a native voice memo app.",
        usage: '<AudioRecorderWidget title="New Audio" date="12.8.24" />',
      },
    ),
    c(
      "flight-arrival",
      <FlightArrivalWidget />,
      "components/widgets/flight-arrival-widget.tsx",
      "FlightArrivalWidget",
      {
        description:
          "Countdown to landing with departure and arrival airports and a plane moving along a progress bar. Built for travel dashboards and trip widgets.",
        usage: "<FlightArrivalWidget arrivalMinutes={53} />",
      },
    ),
  ],
  [
    c(
      "minimal-agenda",
      <MinimalAgendaWidget />,
      "components/widgets/minimal-agenda-widget.tsx",
      "MinimalAgendaWidget",
      {
        description:
          "Today's tasks with times — tap a row to mark it done with a strikethrough and checkmark. Clean enough for a daily planner sidebar.",
      },
    ),
    c(
      "ride-pickup",
      <RidePickupWidget />,
      "components/widgets/ride-pickup-widget.tsx",
      "RidePickupWidget",
      {
        description:
          "Uber-style pickup card with brand, ETA, car illustration, and vehicle ID. The waiting-screen moment, ready to paste into a mobility app.",
        usage:
          '<RidePickupWidget eta="2 min" message="Meet at the pickup point" vehicle="Mercedes-Benz S00121" image="/car.png" />',
      },
    ),
    c(
      "electric-scooter",
      <ElectricScooterWidget />,
      "components/widgets/electric-scooter-widget.tsx",
      "ElectricScooterWidget",
      {
        description:
          "Ride summary with scooter photo, distance, average speed, and duration. Leaf icon included — built for micro-mobility or fitness stats.",
      },
    ),
  ],
  [
    c(
      "laptop",
      <LaptopMockupCard />,
      "components/mockups/laptop-mockup-card.tsx",
      "LaptopMockupCard",
      {
        title: "Apple Macbook",
        description:
          'MacBook Pro frame wrapping your screenshot — black lid and bezel with a gray outer frame and base. Pass variant="titanium" for a titanium outer frame and base.',
        usage: '<LaptopMockupCard variant="titanium" />',
      },
    ),
    c(
      "phone",
      <PhoneMockupCard variant="orange" />,
      "components/mockups/phone-mockup-card.tsx",
      "PhoneMockupCard",
      {
        title: "Apple iPhone",
        description:
          "iPhone 15 Pro frame with Dynamic Island and a full-screen preview slot. Pass variant for purple, orange, white, titanium, or cherry finishes. Use visibleRatio to crop from the top, and showDynamicIsland to toggle the island and camera.",
        usage:
          '<PhoneMockupCard variant="orange" visibleRatio={2 / 3} showDynamicIsland={false} />',
      },
    ),
  ],
  [
    c(
      "ipad",
      <IpadMockupCard variant="spaceGray" />,
      "components/mockups/tablet-mockup-card.tsx",
      "IpadMockupCard",
      {
        title: "Apple iPad",
        isNew: true,
        description:
          "iPad Air frame with metallic bezel, top-edge buttons, and a full-screen preview slot. Pass variant for space gray, space black, silver, starlight, blue, purple, pink, or yellow finishes. Use visibleRatio to crop from the top, and showCamera to toggle the front camera dot.",
        usage:
          '<IpadMockupCard variant="spaceGray" visibleRatio={2 / 3} showCamera={false} />',
      },
    ),
    c(
      "apple-watch",
      <AppleWatchMockupCard variant="black" />,
      "components/mockups/apple-watch-mockup-card.tsx",
      "AppleWatchMockupCard",
      {
        title: "Apple Watch",
        isNew: true,
        description:
          "Apple Watch frame with sport band and a rounded display slot for your UI. Pass variant for black, silver, titanium, starlight, blue, gold, or rose finishes.",
        usage: '<AppleWatchMockupCard variant="black" />',
      },
    ),
  ],
  [
    c(
      "browser",
      <BrowserMockupCard />,
      "components/mockups/browser-mockup-card.tsx",
      "BrowserMockupCard",
      {
        title: "Apple Browser",
        description:
          "Desktop browser chrome with traffic lights and a URL bar framing your website screenshot. Pass theme for light, dark, or transparent chrome.",
        usage:
          '<BrowserMockupCard theme="dark" url="yoursite.com/dashboard" />',
      },
    ),
    c(
      "ipod",
      <IpodMockupCard variant="silver" />,
      "components/mockups/apple-ipod-mockup-card.tsx",
      "IpodMockupCard",
      {
        title: "Apple iPod",
        isNew: true,
        description:
          "Classic iPod frame with a screen slot and click wheel — silver, black, white, pink, blue, green, or red finishes. Drop any UI into the screen area.",
        usage:
          '<IpodMockupCard variant="silver">{screenContent}</IpodMockupCard>',
      },
    ),
  ],
  [
    c(
      "polaroid-image",
      <PolaroidImageCard />,
      "components/gallery/polaroid-image-card.tsx",
      "PolaroidImageCard",
      {
        description:
          "Classic white polaroid with photo, caption, and date — slight tilt that straightens on hover. Nostalgic without feeling like a filter preset.",
        usage:
          '<PolaroidImageCard image="/your-photo.jpg" imageAlt="Summer trip" caption="Goa, 2024" />',
      },
    ),
    c(
      "notepad",
      <NotepadCard />,
      "components/text/notepad-card.tsx",
      "NotepadCard",
      {
        description:
          "Sticky notepad with an italic quote, author line, and checkbox task list. Bookmark ribbon on top — good for editorial or productivity layouts.",
        usage:
          '<NotepadCard title="Note to self" quote="Your quote here" author="Name" checklist={["One", "Two"]} />',
      },
    ),
    c(
      "thermal-receipt",
      <ThermalReceiptCard />,
      "components/others/thermal-receipt-card.tsx",
      "ThermalReceiptCard",
      {
        description:
          "Monospace receipt with line items, tax, total, perforated edges, and a QR footer. Reads like paper from a real register.",
      },
    ),
    c(
      "weather-snapshot",
      <WeatherSnapshotCard />,
      "components/others/weather-snapshot-card.tsx",
      "WeatherSnapshotCard",
      {
        title: "Weather Snapshot",
        description:
          "Compact weather card with temperature, highs/lows, humidity, and wind — clear or rain variants.",
        usage:
          '<WeatherSnapshotCard city="Kolkata" variant="rain" temperature={28} />',
      },
    ),
  ],
  [
    c(
      "instagram-post",
      <InstagramPostCard />,
      "components/socials/instagram-post-card.tsx",
      "InstagramPostCard",
      {
        description:
          "Full Instagram post layout — header, square image, action icons, like count, caption, and timestamp. Looks native, props for your content.",
        usage:
          '<InstagramPostCard username="you" caption="Your caption" avatar="/avatar.png" postImage="/post.jpg" />',
      },
    ),
    c(
      "threads-post",
      <ThreadsPostCard />,
      "components/socials/threads-post-card.tsx",
      "ThreadsPostCard",
      {
        description:
          "Threads-style post with avatar thread line, text, optional image, and engagement counts. Like toggles on tap.",
        usage:
          '<ThreadsPostCard username="you" content="Your thread text" avatar="/avatar.png" />',
      },
    ),
  ],
  [
    c(
      "now-playing-bar",
      <NowPlayingBar />,
      "components/audio/now-playing-bar.tsx",
      "NowPlayingBar",
      {
        description:
          "Compact dark player bar with artwork, track info, transport controls, and a scrubber. The footer bar every music app eventually needs.",
      },
    ),
    c(
      "twitter-post",
      <TwitterPostCard />,
      "components/socials/twitter-post-card.tsx",
      "TwitterPostCard",
      {
        description:
          "Tweet card with avatar, handle, timestamp, hashtags, and full engagement row. For social embeds, mockups, or feed previews.",
      },
    ),
    c(
      "film-strip",
      <FilmStripCard />,
      "components/gallery/film-strip-card.tsx",
      "FilmStripCard",
      {
        description:
          "Horizontal 35mm strip with sprocket holes and multiple frames. Roll label up top — great for photo galleries and vintage layouts.",
      },
    ),
  ],
  [
    c(
      "github-contribution",
      <GithubContributionCard />,
      "components/socials/github-contribution.tsx",
      "GithubContributionCard",
      {
        description:
          "GitHub-style contribution heatmap with year selector, total count, and Less/More legend. Pulls real data when you pass a username.",
        usage: '<GithubContributionCard username="your-handle" year={2026} />',
      },
    ),
  ],
  [
    c(
      "apple-notification",
      <AppleNotificationBanner />,
      "components/notifications/apple-notification-banner.tsx",
      "AppleNotificationBanner",
      {
        description:
          "Frosted iOS notification with app name, sender, message, and avatar — dismisses with animation and can be triggered again via button.",
        usage:
          '<AppleNotificationBanner title="Messages" sender="Sarah" message="Hey!" avatarSrc="/avatar.png" />',
      },
    ),
    c(
      "toast-notification",
      <ToastNotificationBanner />,
      "components/notifications/toast-notification-banner.tsx",
      "ToastNotificationBanner",
      {
        description:
          "Light snackbar with check icon — message, undo action, slides up on dismiss. For save confirmations and quick feedback.",
        usage:
          '<ToastNotificationBanner message="Changes saved" actionLabel="Undo" />',
      },
    ),
    c(
      "email-notification",
      <EmailNotificationBanner />,
      "components/notifications/email-notification-banner.tsx",
      "EmailNotificationBanner",
      {
        description:
          "Mail alert on the iOS grid — sender avatar, app name header, natural from: subject — preview body line.",
        usage:
          '<EmailNotificationBanner appName="Mail" from="Alex" subject="Re: roadmap" preview="Two notes on the timeline..." />',
      },
    ),
  ],
  [
    c(
      "system-alert",
      <SystemAlertBanner />,
      "components/notifications/system-alert-banner.tsx",
      "SystemAlertBanner",
      {
        description:
          "Settings-style iOS alert — amber app tile, title: description in one natural line. For storage, limits, and warnings.",
        usage:
          '<SystemAlertBanner appName="Settings" title="Storage" description="Your device is almost full." />',
      },
    ),
    c(
      "chat-bubble-notification",
      <ChatBubbleNotificationBanner />,
      "components/notifications/chat-bubble-notification-banner.tsx",
      "ChatBubbleNotificationBanner",
      {
        description:
          "Messenger-style bubble — small avatar, sender name, rounded message bubble with a flat tail corner.",
        usage:
          '<ChatBubbleNotificationBanner sender="Maya" message="Running 5 min late" />',
      },
    ),
    c(
      "deploy-notification",
      <DeployNotificationBanner />,
      "components/notifications/deploy-notification-banner.tsx",
      "DeployNotificationBanner",
      {
        description:
          "Deploy alert on the iOS grid — Vercel triangle tile, short status line with project, branch, and duration.",
        usage:
          '<DeployNotificationBanner appName="Vercel" project="app-ui" branch="main" duration="42s" />',
      },
    ),
  ],
  [
    c(
      "calendar-reminder-notification",
      <CalendarReminderNotificationBanner />,
      "components/notifications/calendar-reminder-notification-banner.tsx",
      "CalendarReminderNotificationBanner",
      {
        description:
          "Calendar reminder on the iOS grid — red app tile, event name, and time until it starts.",
        usage:
          '<CalendarReminderNotificationBanner event="Design review" when="in 15 minutes" />',
      },
    ),
    c(
      "payment-notification",
      <PaymentNotificationBanner />,
      "components/notifications/payment-notification-banner.tsx",
      "PaymentNotificationBanner",
      {
        description:
          "Payment received on the iOS grid — emerald tile, amount, and sender name.",
        usage:
          '<PaymentNotificationBanner amount="$128.00" from="Acme Corp" />',
      },
    ),
    c(
      "incoming-call-notification",
      <IncomingCallNotificationBanner />,
      "components/notifications/incoming-call-notification-banner.tsx",
      "IncomingCallNotificationBanner",
      {
        description:
          "Incoming call card — large avatar, caller name, FaceTime label, Accept and Decline buttons.",
        usage:
          '<IncomingCallNotificationBanner caller="Sarah Chen" callType="FaceTime Audio" />',
      },
    ),
  ],
  [
    c(
      "delivery-notification",
      <DeliveryNotificationBanner />,
      "components/notifications/delivery-notification-banner.tsx",
      "DeliveryNotificationBanner",
      {
        description:
          "Shipping update — package icon, delivery status, ETA, and order number in a compact row.",
        usage:
          '<DeliveryNotificationBanner status="Out for delivery" eta="Arriving today by 6:15 PM" orderId="#4821" />',
      },
    ),
    c(
      "file-menu",
      <FileMenuDropdown />,
      "components/dropdowns/file-menu-dropdown.tsx",
      "FileMenuDropdown",
      {
        description:
          "Folder icon you can right-click or tap to open a centered action menu — edit, duplicate, pin, move, delete. Keyboard-friendly item hints included.",
        usage:
          '<FileMenuDropdown cardTitle="My file" onItemClick={(item) => console.log(item.id)} />',
      },
    ),
    c(
      "user-menu",
      <UserMenuDropdown />,
      "components/dropdowns/user-menu-dropdown.tsx",
      "UserMenuDropdown",
      {
        description:
          "Account pill with avatar, name, and email that opens into profile, settings, messages, and sign out. The header dropdown every SaaS app needs, with keyboard shortcut labels.",
        usage:
          '<UserMenuDropdown userName="Your Name" userEmail="you@email.com" avatarSrc="/avatar.png" />',
      },
    ),
    c(
      "kebab-actions",
      <KebabActionsDropdown />,
      "components/dropdowns/kebab-actions-dropdown.tsx",
      "KebabActionsDropdown",
      {
        description:
          "List row that expands inline — actions open inside the same card so widths always align.",
        usage:
          "<KebabActionsDropdown onItemClick={(item) => console.log(item.id)} />",
      },
    ),
  ],
  [
    c(
      "share-menu",
      <ShareMenuDropdown />,
      "components/dropdowns/share-menu-dropdown.tsx",
      "ShareMenuDropdown",
      {
        description:
          "Square icon trigger opens a horizontal brand rail — four social tiles in a row plus a full-width copy button.",
        usage:
          "<ShareMenuDropdown copied={false} onItemClick={(item) => console.log(item.id)} />",
      },
    ),
    c(
      "notification",
      <NotificationDropdown />,
      "components/dropdowns/notification-dropdown.tsx",
      "NotificationDropdown",
      {
        description:
          "Square bell trigger with a gray inset tray — each notification is a small bordered card inside the panel.",
        usage:
          "<NotificationDropdown onNotificationClick={(n) => console.log(n.id)} />",
      },
    ),
    c(
      "filter-sort",
      <FilterSortDropdown />,
      "components/dropdowns/filter-sort-dropdown.tsx",
      "FilterSortDropdown",
      {
        description:
          "Native select-style box — dropdown is flush below the trigger with matching width and a left-border active state.",
        usage:
          '<FilterSortDropdown value="newest" onValueChange={(o) => console.log(o.id)} />',
      },
    ),
  ],
  [
    c(
      "workspace-switcher",
      <WorkspaceSwitcherDropdown />,
      "components/dropdowns/workspace-switcher-dropdown.tsx",
      "WorkspaceSwitcherDropdown",
      {
        description:
          "Rectangular org bar that expands inline — workspace list opens inside the same bordered box, not a floating panel.",
        usage:
          "<WorkspaceSwitcherDropdown onWorkspaceChange={(w) => console.log(w.id)} />",
      },
    ),
  ],
  [
    c(
      "cinema-ticket",
      <CinemaTicketCard />,
      "components/text/cinema-ticket-card.tsx",
      "CinemaTicketCard",
      {
        description:
          "Split cinema ticket with film title, venue, screen, seats, show time, and a perforated stub. Dark ticket stock that feels printed, not flat.",
      },
    ),
    c(
      "wallet-pass",
      <WalletPassCard />,
      "components/wallet/wallet-pass-card.tsx",
      "WalletPassCard",
      {
        description:
          "Flippable membership pass — gradient front with tier and expiry, QR grid on the back. Tap or hover to flip between sides.",
      },
    ),
    c(
      "credit-card-glass",
      <CreditCardGlass />,
      "components/users/credit-card-glass.tsx",
      "CreditCardGlass",
      {
        description:
          "Glassmorphism payment card with chip, masked number, holder name, and expiry. Glow on hover — fintech landing pages eat this up.",
      },
    ),
  ],
  [
    c(
      "drop-cap-editorial",
      <DropCapEditorialCard />,
      "components/text/drop-cap-editorial-card.tsx",
      "DropCapEditorialCard",
      {
        description:
          "Editorial quote block with a large drop-cap letter, body text, and author attribution. Magazine typography without opening InDesign.",
      },
    ),

    c(
      "editorial-quote",
      <EditorialQuoteCard />,
      "components/text/editorial-quote-card.tsx",
      "EditorialQuoteCard",
      {
        description:
          "Pull quote with issue metadata and a highlighted word inside the line — author and role at the bottom. Built for case studies and long reads.",
      },
    ),
    c(
      "discord-chat",
      <DiscordChatCard />,
      "components/socials/discord-chat-card.tsx",
      "DiscordChatCard",
      {
        description:
          "Dark Discord channel with server header, threaded messages, avatars, timestamps, and a send input. Community product mockups in one card.",
      },
    ),
  ],
  [
    c(
      "linked-in-profile",
      <LinkedInProfileCard />,
      "components/socials/linked-in-profile-card.tsx",
      "LinkedInProfileCard",
      {
        description:
          "LinkedIn profile card with cover photo, avatar, headline, stats, bio, and Connect/Message buttons. Professional social, component-sized.",
      },
    ),
    c(
      "facebook-post",
      <FacebookPostCard />,
      "components/socials/facebook-post-card.tsx",
      "FacebookPostCard",
      {
        description:
          "Facebook feed post with reactions, comments, share counts, optional image, and the full action bar. Familiar layout, your content.",
      },
    ),
    c(
      "twitter-profile",
      <TwitterProfileCard />,
      "components/socials/twitter-profile-card.tsx",
      "TwitterProfileCard",
      {
        description:
          "Twitter/X profile with cover, avatar, bio, location, website link, and follower counts. Follow button included.",
      },
    ),
  ],

  [
    c(
      "event-ticket",
      <EventTicketCard />,
      "components/event/event-ticket-card.tsx",
      "EventTicketCard",
      {
        description:
          "Perforated event ticket with a cover-image date block and VIP pass details on the right. Concert, conference, or launch night — same component.",
      },
    ),
    c(
      "flight-boarding",
      <FlightBoardingCard />,
      "components/travel/flight-boarding-card.tsx",
      "FlightBoardingCard",
      {
        description:
          "Airline boarding pass with tear line, route codes, seat, gate, boarding time, and passenger name. Travel mockups that feel airport-real.",
      },
    ),
    c(
      "gallery-grid",
      <GalleryGridCard />,
      "components/gallery/gallery-grid-card.tsx",
      "GalleryGridCard",
      {
        description:
          "Album preview with title, subtitle, and a three-cell photo grid — last cell shows a +N overflow count. Portfolio and gallery index pages.",
      },
    ),
  ],
  [
    c(
      "glass-overlay-image",
      <GlassOverlayImageCard />,
      "components/gallery/glass-overlay-image-card.tsx",
      "GlassOverlayImageCard",
      {
        description:
          "Full-bleed photo with frosted bottom panel — location, title, saved avatars, and Explore CTA. Like and share buttons float top-right.",
      },
    ),
    c(
      "photo-album",
      <PhotoAlbumCard />,
      "components/gallery/photo-album-card.tsx",
      "PhotoAlbumCard",
      {
        description:
          "Swipeable square photo carousel with place and date caption plus dot indicators. Swap in your own photos and tell a travel story.",
      },
    ),
    c(
      "magazine-cover",
      <MagazineCoverCard />,
      "components/text/magazine-cover-card.tsx",
      "MagazineCoverCard",
      {
        description:
          "Tall magazine cover with issue badge, category, title, author, and read time. Hover zoom on the cover image — editorial hero material.",
      },
    ),
  ],
  [
    c(
      "stacked-folder-card",
      <StackedFolderCard
        imageSrc="/background1.webp"
        backImageSrc="/wallpaper-2.png"
        middleImageSrc="/wallpaper-11.png"
      />,
      "components/files/stacked-folder-card.tsx",
      "StackedFolderCard",
      {
        description:
          "Three stacked folder cards with thick white borders and smooth hover rotation — back and middle peeks bring any card to the front.",
        usage:
          '<StackedFolderCard imageSrc="/background1.webp" backImageSrc="/wallpaper-2.png" middleImageSrc="/wallpaper-11.png" />',
      },
    ),
    c(
      "ink-stamp-document",
      <InkStampDocumentCard />,
      "components/files/ink-stamp-document-card.tsx",
      "InkStampDocumentCard",
      {
        title: "Ink Stamp Document",
        description:
          "Paper filing card with reference metadata and a rotated approval stamp — contracts, invoices, and admin dashboards.",
        usage:
          '<InkStampDocumentCard stampLabel="Approved" title="Vendor Agreement" />',
      },
    ),
    c(
      "opensource-folder-tab-card",
      <OpensourceFolderTabCard />,
      "components/folder/opensource-folder-tab-card.tsx",
      "OpensourceFolderTabCard",
      {
        description:
          "Folder tab card with black frame, top-half image, and dark panel showing library stats. Opensource App branding by default.",
        usage:
          '<OpensourceFolderTabCard title="UI blocks" primaryValue="116" primaryLabel="Components" />',
      },
    ),
    c(
      "journal-writing",
      <JournalWritingCard />,
      "components/text/journal-writing-card.tsx",
      "JournalWritingCard",
      {
        description:
          "Journal card with title, date header, editable textarea, live word count, and saving status. The writing flow, not just a static textarea mockup.",
      },
    ),
    c(
      "terminal-log",
      <TerminalLogCard />,
      "components/others/terminal-log-card.tsx",
      "TerminalLogCard",
      {
        description:
          "macOS terminal window with traffic-light dots, colored log lines, blinking cursor, and status footer. Dev tool aesthetic for changelogs or demos.",
      },
    ),
    c(
      "keyboard-shortcuts",
      <KeyboardShortcutsCard />,
      "components/text/keyboard-shortcuts-card.tsx",
      "KeyboardShortcutsCard",
      {
        description:
          "Shortcut reference card with rendered key caps and a ⌘K header hint. Docs pages and onboarding modals use this constantly.",
      },
    ),
  ],
  [
    c(
      "github-repo",
      <GitHubRepoCard />,
      "components/socials/github-repo-card.tsx",
      "GitHubRepoCard",
      {
        description:
          "GitHub repo card with owner, description, language dot, star/fork counts, and a toggleable Star button. Open source landing pages, simplified.",
      },
    ),
    c(
      "museum-placard",
      <MuseumPlacardCard />,
      "components/gallery/museum-placard-card.tsx",
      "MuseumPlacardCard",
      {
        title: "Museum Placard",
        description:
          "Gallery exhibition label that flips to reveal curator notes and acquisition details. Art portfolios and culture sites love this interaction.",
        usage:
          '<MuseumPlacardCard artist="Name" title="Artwork title" year="2024" />',
      },
    ),
    c(
      "gallery-wall",
      <GalleryWallCard />,
      "components/gallery/gallery-wall-card.tsx",
      "GalleryWallCard",
      {
        title: "Gallery Wall",
        description:
          "Gallery wall mat with cream matting, artwork preview, and caption block — clean exhibition styling.",
        usage:
          '<GalleryWallCard title="Winter Light Study" artist="Elena Marchetti" />',
      },
    ),
    c(
      "linked-in-post",
      <LinkedInPostCard />,
      "components/socials/linked-in-post-card.tsx",
      "LinkedInPostCard",
      {
        description:
          "LinkedIn feed post with headline, body text, link preview card, reaction counts, and like/comment/repost/send actions.",
      },
    ),
  ],
  [
    c(
      "transform-box-frame",
      <TransformBoxFrame
        skeleton
        width={320}
        height={320}
        lineColor="#737373"
        handleColor="#171717"
        className="max-w-none"
      />,
      "components/frames/transform-box-frame.tsx",
      "TransformBoxFrame",
      {
        title: "Transform Box Frame",
        isNew: true,
        description:
          "Design-tool bounding box with separate line and handle colors — defaults to all black; pass lineColor and handleColor for dual-tone frames.",
        usage:
          '<TransformBoxFrame width={320} height={320} lineColor="#737373" handleColor="#171717"><img src="/photo.jpg" alt="" /></TransformBoxFrame>',
      },
    ),
    c(
      "transform-plus-frame",
      <TransformPlusFrame
        skeleton
        width={320}
        height={320}
        lineColor="#737373"
        handleColor="#171717"
        className="max-w-none"
      />,
      "components/frames/transform-plus-frame.tsx",
      "TransformPlusFrame",
      {
        title: "Transform Plus Frame",
        isNew: true,
        description:
          "Bounding box with plus corner handles — thicker handle strokes than border lines. Defaults to all black; pass lineColor and handleColor for dual-tone frames.",
        usage:
          '<TransformPlusFrame width={320} height={320} lineColor="#737373" handleColor="#171717"><img src="/photo.jpg" alt="" /></TransformPlusFrame>',
      },
    ),
    c(
      "sticky-note-polaroid-frame",
      <StickyNotePolaroidFrame
        skeleton
        noteBody="open studio this weekend — drop by anytime"
        noteFooter="details @bidyut.cc"
        className="max-w-none"
      />,
      "components/frames/sticky-note-polaroid-frame.tsx",
      "StickyNotePolaroidFrame",
      {
        title: "Sticky Note Polaroid Frame",
        isNew: true,
        description:
          "Polaroid-style frame with a paper-clipped sticky note overlay — pass noteHeader, noteBody, noteFooter, and any image or video as children.",
        usage:
          '<StickyNotePolaroidFrame noteBody="open studio this weekend" noteFooter="details @bidyut.cc"><img src="/photo.jpg" alt="" /></StickyNotePolaroidFrame>',
      },
    ),
    c(
      "hard-shadow-polaroid-frame",
      <HardShadowPolaroidFrame
        skeleton
        caption="Bidyut Kundu"
        className="max-w-none"
      />,
      "components/frames/hard-shadow-polaroid-frame.tsx",
      "HardShadowPolaroidFrame",
      {
        title: "Hard Shadow Polaroid Frame",
        isNew: true,
        description:
          "Polaroid frame with a crisp inner border, thick caption chin, and hard offset shadow — pass caption and any image or video as children.",
        usage:
          '<HardShadowPolaroidFrame caption="Bidyut Kundu"><img src="/photo.jpg" alt="" /></HardShadowPolaroidFrame>',
      },
    ),
    c(
      "circle-cut-frame",
      <CircleCutFrame
        skeleton
        width={320}
        height={320}
        frameColor="#d4d4d4"
        className="max-w-none"
      />,
      "components/frames/circle-cut-frame.tsx",
      "CircleCutFrame",
      {
        title: "Circle Cut Frame",
        isNew: true,
        description:
          "Ticket-style frame with circle-cut edges on all sides — defaults to white; pass width, height, frameColor, and any image, video, or content as children.",
        usage:
          '<CircleCutFrame width={320} height={320} frameColor="#d4d4d4"><img src="/photo.jpg" alt="" /></CircleCutFrame>',
      },
    ),
  ],
  [
    c(
      "music-player",
      <MusicPlayerCard />,
      "components/audio/music-player-card.tsx",
      "MusicPlayerCard",
      {
        description:
          "Full dark player card with cover art, album info, progress scrubber with times, and transport controls. Not a bar — the whole now-playing screen.",
      },
    ),
    c(
      "photo-contact-sheet",
      <PhotoContactSheetCard />,
      "components/gallery/photo-contact-sheet-card.tsx",
      "PhotoContactSheetCard",
      {
        description:
          "Film contact sheet with a 2×2 numbered frame grid and roll label header. Photographer portfolio vibes, straight from the darkroom.",
      },
    ),
    c(
      "music-playlist",
      <MusicPlaylistCard />,
      "components/audio/music-playlist-card.tsx",
      "MusicPlaylistCard",
      {
        description:
          "Playlist card with cover, header stats, and a track list where each row toggles play independently. One component, full playlist UI.",
      },
    ),
  ],
  [
    c(
      "stacked-cards-effect",
      <StackedCardsEffect />,
      "components/others/stacked-cards-effect.tsx",
      "StackedCardsEffect",
      {
        description:
          "Three skewed cards fanned behind a front hero card — hover brings subtle motion. Collection and portfolio layouts with depth, no Three.js required.",
      },
    ),
    c(
      "retail-price-tag",
      <RetailPriceTagCard />,
      "components/pricing/retail-price-tag-card.tsx",
      "RetailPriceTagCard",
      {
        description:
          "Hanging store tag with discount badge, sale price, SKU, and barcode stripes. E-commerce editorial and product drops.",
      },
    ),
    c(
      "stamp-postcard",
      <StampPostcardCard />,
      "components/gallery/stamp-postcard-card.tsx",
      "StampPostcardCard",
      {
        description:
          "Vintage postcard with landscape photo, postage stamp overlay, handwritten message, and posted-from address. Travel and lifestyle brands love this one.",
      },
    ),
  ],
  [
    c(
      "progress-ring",
      <ProgressRingCard />,
      "components/others/progress-ring-card.tsx",
      "ProgressRingCard",
      {
        description:
          "Animated SVG ring with percentage label and clickable stage rows below. Defaults to Design/Development/Testing — pass your own milestones.",
      },
    ),
    c(
      "team-member",
      <TeamMemberCard />,
      "components/users/team-member-card.tsx",
      "TeamMemberCard",
      {
        description:
          "Full-bleed portrait card — hover reveals GitHub and mail buttons, role, name, and bio. About pages without the generic card grid.",
      },
    ),

    c(
      "testimonial",
      <TestimonialCard />,
      "components/users/testimonial-card.tsx",
      "TestimonialCard",
      {
        description:
          "Auto-advancing testimonial carousel with stars, quote, avatar, and dot navigation. Social proof that moves on its own.",
      },
    ),
  ],
  [
    c(
      "toggle-pricing-cards",
      <TogglePricingCards />,
      "components/pricing/toggle-pricing-cards.tsx",
      "TogglePricingCards",
      {
        description:
          "Monthly and yearly billing toggle that updates three plan cards side by side — price and feature checklist included. SaaS pricing page, one paste away.",
      },
    ),
    c(
      "travel-postcard",
      <TravelPostcardCard />,
      "components/travel/travel-postcard-card.tsx",
      "TravelPostcardCard",
      {
        description:
          "Vintage sepia postcard with map badge, greeting title, location, and author signature. Wanderlust landing pages and newsletter headers.",
      },
    ),
  ],
  [
    c(
      "slow-living-polaroid",
      <SlowLivingPolaroidCard />,
      "components/gallery/slow-living-polaroid-card.tsx",
      "SlowLivingPolaroidCard",
      {
        description:
          "Dark editorial layout with a taped, tilted polaroid and lowercase lifestyle copy. Slow living, coffee brands, quiet product launches.",
      },
    ),
    c(
      "denim-product-editorial",
      <DenimProductEditorialCard />,
      "components/text/denim-product-editorial-card.tsx",
      "DenimProductEditorialCard",
      {
        description:
          "Fashion editorial with two square photos, rotated callout labels, and uppercase product description. Lookbook energy for apparel and accessories.",
      },
    ),
    c(
      "daily-motivation",
      <DailyMotivationCard />,
      "components/text/daily-motivation-card.tsx",
      "DailyMotivationCard",
      {
        description:
          "Editorial poster with multi-line headline, flower icon, tilted polaroid, and a GOOD DAY sticker. Morning routine apps and wellness newsletters.",
      },
    ),
    c(
      "cafe-menu-board",
      <CafeMenuBoardCard />,
      "components/text/cafe-menu-board-card.tsx",
      "CafeMenuBoardCard",
      {
        title: "Cafe Menu Board",
        description:
          "Dark chalkboard-style menu with cafe header, item notes, and amber price accents — hospitality and local brand sites.",
        usage:
          '<CafeMenuBoardCard cafeName="Corner & Steam" items={menuItems} />',
      },
    ),
    c(
      "annotated-text",
      <AnnotatedTextShowcase />,
      "components/underlines/annotated-text.tsx",
      "AnnotatedText",
      {
        description:
          "Hand-drawn text annotations — wavy underlines, highlights, arrows, brackets, and more. Pass variant and optional color to style any inline label or callout.",
        usage: ANNOTATED_TEXT_USAGE,
      },
    ),
  ],
  [
    c(
      "otp-boxed-input",
      <OtpBoxedInput autoFocus={false} destination="s•••@icloud.com" />,
      "components/otp/otp-boxed-input.tsx",
      "OtpBoxedInput",
      {
        description:
          "Full email verification card with icon header, destination text, animated square cells, progress dots, shake-on-error, and resend countdown.",
        usage:
          '<OtpBoxedInput destination="you@email.com" error={invalid} onComplete={verify} onResend={sendAgain} />',
      },
    ),
    c(
      "otp-underline-input",
      <OtpUnderlineInput autoFocus={false} />,
      "components/otp/otp-underline-input.tsx",
      "OtpUnderlineInput",
      {
        description:
          "Editorial underline OTP with serif heading and animated focus rules. Same edge-case handling as boxed — typing, delete, paste, and one-time-code autocomplete.",
        usage:
          '<OtpUnderlineInput length={6} label="Enter code" onComplete={handleVerify} />',
      },
    ),
  ],
  [
    c(
      "text-field-input",
      <TextFieldInput
        label="Full name"
        placeholder="Jane Cooper"
        hint="As shown on your government ID."
      />,
      "components/inputs/text-field-input.tsx",
      "TextFieldInput",
      {
        description:
          "Standard labeled text field with hint and error states. Supports all native input types, required marker, disabled, and full a11y wiring.",
        usage:
          '<TextFieldInput label="Email" type="email" required error={!valid} errorMessage="Invalid email." />',
      },
    ),
    c(
      "search-input",
      <SearchInput defaultValue="" placeholder="Search components…" />,
      "components/inputs/search-input.tsx",
      "SearchInput",
      {
        description:
          "Search field with leading icon and clear button. Controlled or uncontrolled value, hidden native cancel, and keyboard-friendly reset.",
        usage:
          '<SearchInput value={query} onChange={setQuery} onClear={() => setQuery("")} hint="Filter by name or category." />',
      },
    ),
    c(
      "password-field-input",
      <PasswordFieldInput placeholder="Enter password" />,
      "components/inputs/password-field-input.tsx",
      "PasswordFieldInput",
      {
        description:
          "Password input with show/hide toggle, hint text, and error state. Keeps autocomplete defaults and accessible visibility control.",
        usage:
          '<PasswordFieldInput label="Password" required autoComplete="new-password" error={weak} />',
      },
    ),
  ],
  [
    c(
      "textarea-field-input",
      <TextareaFieldInput
        placeholder="Tell us about your project…"
        defaultValue=""
      />,
      "components/inputs/textarea-field-input.tsx",
      "TextareaFieldInput",
      {
        description:
          "Multiline field with live character count, max length guard, resize support, and the same label/hint/error pattern as text fields.",
        usage:
          '<TextareaFieldInput label="Bio" maxLength={280} showCount value={bio} onChange={setBio} />',
      },
    ),
    c(
      "input-group-field",
      <InputGroupField prefix="https://" placeholder="opensourceui.in" />,
      "components/inputs/input-group-field.tsx",
      "InputGroupField",
      {
        description:
          "Grouped input with prefix and suffix slots — URLs, currency, units. Wrapper border highlights on focus; inputs use border-only focus with ring-0.",
        usage:
          '<InputGroupField label="Price" prefix="$" suffix="USD" type="number" min={0} />',
      },
    ),
    c(
      "floating-label-field-input",
      <FloatingLabelFieldInput hint="We never share your email." />,
      "components/inputs/floating-label-field-input.tsx",
      "FloatingLabelFieldInput",
      {
        description:
          "Outlined floating label that rests on the border notch when focused or filled — matches Material-style fields with autofill detection.",
        usage:
          '<FloatingLabelFieldInput label="Work email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />',
      },
    ),
  ],
  [
    c(
      "select-field-input",
      <SelectFieldInput hint="Shipping rates vary by region." />,
      "components/inputs/select-field-input.tsx",
      "SelectFieldInput",
      {
        description:
          "Custom listbox select with styled dropdown, keyboard navigation, click-outside close, and hidden input for native form posts.",
        usage:
          '<SelectFieldInput label="Country" name="country" value={country} onValueChange={setCountry} options={countries} />',
      },
    ),
    c(
      "phone-field-input",
      <PhoneFieldInput />,
      "components/inputs/phone-field-input.tsx",
      "PhoneFieldInput",
      {
        description:
          "Phone field with dial-code prefix and live US-style formatting. Returns raw digits via onChange for validation and API calls.",
        usage:
          '<PhoneFieldInput dialCode="+44" required onChange={(digits) => setPhone(digits)} />',
      },
    ),
    c(
      "checkbox-field-input",
      <CheckboxFieldInput hint="You can unsubscribe at any time." />,
      "components/inputs/checkbox-field-input.tsx",
      "CheckboxFieldInput",
      {
        description:
          "Accessible checkbox with custom mark, inline label, hint, and error. Controlled or uncontrolled checked state.",
        usage:
          "<CheckboxFieldInput required checked={accepted} onCheckedChange={setAccepted} error={!accepted} />",
      },
    ),
  ],
  [
    c(
      "switch-field-input",
      <SwitchFieldInput defaultChecked />,
      "components/inputs/switch-field-input.tsx",
      "SwitchFieldInput",
      {
        description:
          "Toggle switch with role=switch, keyboard support, hidden input for forms, and label/hint/error layout.",
        usage:
          '<SwitchFieldInput label="Dark mode" checked={enabled} onCheckedChange={setEnabled} name="dark-mode" />',
      },
    ),
  ],
  [
    c(
      "combobox-field-input",
      <ComboboxFieldInput hint="Type to filter the list." />,
      "components/inputs/combobox-field-input.tsx",
      "ComboboxFieldInput",
      {
        description:
          "Searchable combobox with filtered listbox, keyboard navigation, click-outside close, and hidden field for form posts.",
        usage:
          '<ComboboxFieldInput label="City" options={cities} value={city} onValueChange={setCity} />',
      },
    ),
    c(
      "radio-group-field-input",
      <RadioGroupFieldInput />,
      "components/inputs/radio-group-field-input.tsx",
      "RadioGroupFieldInput",
      {
        description:
          "Card-style radio group for checkout and settings flows. Vertical or horizontal layout, descriptions, and arrow-key navigation.",
        usage:
          '<RadioGroupFieldInput name="payment" value={method} onValueChange={setMethod} options={methods} />',
      },
    ),
    c(
      "file-upload-field-input",
      <FileUploadFieldInput />,
      "components/inputs/file-upload-field-input.tsx",
      "FileUploadFieldInput",
      {
        description:
          "Card-style file upload with drag-and-drop zone, browse button, format/size hints, typed file rows, and remove actions.",
        usage:
          '<FileUploadFieldInput accept=".pdf,.png" multiple maxFiles={3} onFilesChange={setFiles} />',
      },
    ),
  ],
  [
    c(
      "date-field-input",
      <DateFieldInput hint="Must match your ID document." />,
      "components/inputs/date-field-input.tsx",
      "DateFieldInput",
      {
        description:
          "Custom calendar popover with month navigation, today shortcut, min/max limits, and styled day grid — no native browser picker.",
        usage:
          '<DateFieldInput label="Start date" required min="2026-01-01" value={date} onValueChange={setDate} name="start-date" />',
      },
    ),
  ],
  [
    c(
      "login-form",
      <LoginForm />,
      "components/forms/login-form.tsx",
      "LoginForm",
      {
        description:
          "Production login form with email/password validation, remember me, show password, loading state, and forgot-password link.",
        usage: "<LoginForm onSubmit={async (values) => signIn(values)} />",
      },
    ),
    c(
      "signup-form",
      <SignupForm />,
      "components/forms/signup-form.tsx",
      "SignupForm",
      {
        description:
          "Registration form with name, email, password strength rules, confirm password match, and required terms acceptance.",
        usage: "<SignupForm onSubmit={async (values) => register(values)} />",
      },
    ),
    c(
      "contact-form",
      <ContactForm />,
      "components/forms/contact-form.tsx",
      "ContactForm",
      {
        description:
          "Contact form with honeypot spam guard, character count, field validation, loading state, and success confirmation screen.",
        usage:
          "<ContactForm onSubmit={async (values) => sendMessage(values)} />",
      },
    ),
  ],
  [
    c(
      "newsletter-form",
      <NewsletterForm />,
      "components/forms/newsletter-form.tsx",
      "NewsletterForm",
      {
        description:
          "Email subscribe form with inline button, validation, privacy note, and inline success message — built for footers and landing pages.",
        usage:
          "<NewsletterForm onSubmit={async (email) => subscribe(email)} />",
      },
    ),
    c(
      "forgot-password-form",
      <ForgotPasswordForm />,
      "components/forms/forgot-password-form.tsx",
      "ForgotPasswordForm",
      {
        description:
          "Password reset request form with email validation, loading state, success screen, and back-to-login navigation.",
        usage:
          "<ForgotPasswordForm onSubmit={async (email) => requestReset(email)} />",
      },
    ),
  ],
  [
    c(
      "apple-hello-loader",
      <AppleHelloLoader fill />,
      "components/loaders/apple-hello-loader.tsx",
      "AppleHelloLoader",
      {
        title: "Apple Hello Loader",
        isNew: true,
        description:
          "Apple-style greeting loader that cycles through hello, bonjour, hola, and more with a soft fade. Pass greetings, intervalMs, and fadeMs to tune the loop.",
        usage:
          '<AppleHelloLoader greetings={["hello", "hola"]} intervalMs={2600} />',
      },
    ),
    c(
      "spin-loader",
      <div className="flex items-center justify-center p-8">
        <SpinLoader size="lg" />
      </div>,
      "components/loaders/spin-loader.tsx",
      "SpinLoader",
      {
        title: "Spin Loader",
        isNew: true,
        description:
          "Minimal spinning loader built on a lucide icon — defaults to Loader, but pass any icon prop. Sizes: sm, md, lg.",
        usage: '<SpinLoader size="lg" iconClassName="text-sky-600" />',
      },
    ),
    c(
      "text-loader",
      <TextLoader text="Searching" />,
      "components/loaders/text-loader.tsx",
      "TextLoader",
      {
        title: "Text Loader",
        isNew: true,
        description:
          "Animated text loader with a spinning color orb and staggered letter pulses. Pass text, variant, and textColor to match your UI.",
        usage:
          '<TextLoader text="Searching" variant="ocean" textColor="#ffffff" />',
      },
    ),
  ],
  [
    c(
      "aurora-background",
      <AuroraBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </AuroraBackground>,
      "components/background-gradient/aurora-background.tsx",
      "AuroraBackground",
      {
        title: "Aurora Background",
        isNew: true,
        description:
          "Soft aurora wash with lime, mint, cyan, and blue blobs over a warm paper base — wrap any page section or hero and pass children on top.",
        usage:
          '<AuroraBackground className="min-h-screen p-8"><h1>Hello</h1></AuroraBackground>',
      },
    ),
    c(
      "coral-glow-background",
      <CoralGlowBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </CoralGlowBackground>,
      "components/background-gradient/coral-glow-background.tsx",
      "CoralGlowBackground",
      {
        title: "Coral Glow",
        isNew: true,
        description:
          "Warm aurora wash in rose, peach, coral, and gold over a blush paper base — beauty, lifestyle, and invitation hero sections.",
        usage:
          '<CoralGlowBackground className="min-h-screen p-8"><h1>Welcome</h1></CoralGlowBackground>',
      },
    ),
    c(
      "mint-lagoon-background",
      <MintLagoonBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </MintLagoonBackground>,
      "components/background-gradient/mint-lagoon-background.tsx",
      "MintLagoonBackground",
      {
        title: "Mint Lagoon",
        isNew: true,
        description:
          "Cool aurora wash in emerald, teal, cyan, and mint over a fresh white base — wellness, spa, and clean product launches.",
        usage:
          '<MintLagoonBackground className="min-h-screen p-8"><h1>Refresh</h1></MintLagoonBackground>',
      },
    ),
  ],
  [
    c(
      "sunset-bloom-background",
      <SunsetBloomBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </SunsetBloomBackground>,
      "components/background-gradient/sunset-bloom-background.tsx",
      "SunsetBloomBackground",
      {
        title: "Sunset Bloom",
        isNew: true,
        description:
          "Golden-hour aurora with orange, rose, amber, and sun yellow blooms — events, photography, and warm brand storytelling.",
        usage:
          '<SunsetBloomBackground className="min-h-screen p-8"><h1>Golden hour</h1></SunsetBloomBackground>',
      },
    ),
    c(
      "honey-ember-background",
      <HoneyEmberBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </HoneyEmberBackground>,
      "components/background-gradient/honey-ember-background.tsx",
      "HoneyEmberBackground",
      {
        title: "Honey Ember",
        isNew: true,
        description:
          "Cozy aurora glow in honey, amber, ember orange, and soft rose over warm ivory — food, bakery, and autumn campaigns.",
        usage:
          '<HoneyEmberBackground className="min-h-screen p-8"><h1>Harvest</h1></HoneyEmberBackground>',
      },
    ),
    c(
      "tropical-tide-background",
      <TropicalTideBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </TropicalTideBackground>,
      "components/background-gradient/tropical-tide-background.tsx",
      "TropicalTideBackground",
      {
        title: "Tropical Tide",
        isNew: true,
        description:
          "Vibrant aurora wash in turquoise, lime, sky blue, and sea green — travel, resorts, and summer product drops.",
        usage:
          '<TropicalTideBackground className="min-h-screen p-8"><h1>Island</h1></TropicalTideBackground>',
      },
    ),
  ],
  [
    c(
      "sunrise-horizon-background",
      <SunriseHorizonBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </SunriseHorizonBackground>,
      "components/background-gradient/sunrise-horizon-background.tsx",
      "SunriseHorizonBackground",
      {
        title: "Sunrise Horizon",
        isNew: true,
        description:
          "Warm dawn sky with peach horizon bands, a soft sun glow, and cool teal lift at the base — editorial hero sections and landing pages.",
        usage:
          '<SunriseHorizonBackground className="min-h-screen p-8"><h1>Morning</h1></SunriseHorizonBackground>',
      },
    ),
  ],
  [
    c(
      "linen-weave-background",
      <LinenWeaveBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </LinenWeaveBackground>,
      "components/background-gradient/linen-weave-background.tsx",
      "LinenWeaveBackground",
      {
        title: "Linen Weave",
        isNew: true,
        description:
          "Warm editorial linen with crosshatch weave, soft paper grain, and a gentle vignette — portfolios, magazines, and craft-brand pages.",
        usage:
          '<LinenWeaveBackground className="min-h-screen p-8"><article>Story</article></LinenWeaveBackground>',
      },
    ),
    c(
      "sand-drift-background",
      <SandDriftBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </SandDriftBackground>,
      "components/background-gradient/sand-drift-background.tsx",
      "SandDriftBackground",
      {
        title: "Sand Drift",
        isNew: true,
        description:
          "Layered desert dunes in stone and amber tones with fine grain — travel, hospitality, and calm wellness layouts.",
        usage:
          '<SandDriftBackground className="min-h-screen p-8"><h1>Escape</h1></SandDriftBackground>',
      },
    ),
    c(
      "frost-mesh-background",
      <FrostMeshBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </FrostMeshBackground>,
      "components/background-gradient/frost-mesh-background.tsx",
      "FrostMeshBackground",
      {
        title: "Frost Mesh",
        isNew: true,
        description:
          "Cool frost-white mesh with teal and emerald corner washes — SaaS dashboards, health apps, and minimal product launches.",
        usage:
          '<FrostMeshBackground className="min-h-screen p-8"><h1>Launch</h1></FrostMeshBackground>',
      },
    ),
  ],
  [
    c(
      "terrazzo-fragment-background",
      <TerrazzoFragmentBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </TerrazzoFragmentBackground>,
      "components/background-gradient/terrazzo-fragment-background.tsx",
      "TerrazzoFragmentBackground",
      {
        title: "Terrazzo Fragment",
        isNew: true,
        description:
          "Stone terrazzo base with scattered rose, teal, amber, and clay fragments — interior brands, cafés, and design studios.",
        usage:
          '<TerrazzoFragmentBackground className="min-h-screen p-8"><h1>Studio</h1></TerrazzoFragmentBackground>',
      },
    ),
    c(
      "rain-prism-background",
      <RainPrismBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-800">Your content</p>
      </RainPrismBackground>,
      "components/background-gradient/rain-prism-background.tsx",
      "RainPrismBackground",
      {
        title: "Rain Prism",
        isNew: true,
        description:
          "Moody rainfall with angled streaks and a soft prism band across the scene — music, film, and reflective editorial layouts.",
        usage:
          '<RainPrismBackground className="min-h-screen p-8"><h1>Rain</h1></RainPrismBackground>',
      },
    ),
  ],
  [
    c(
      "cherry-petal-background",
      <CherryPetalBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </CherryPetalBackground>,
      "components/background-gradient/cherry-petal-background.tsx",
      "CherryPetalBackground",
      {
        title: "Cherry Petal",
        isNew: true,
        description:
          "Soft spring canvas with drifting cherry petals and a blush radial glow — weddings, florists, and seasonal campaigns.",
        usage:
          '<CherryPetalBackground className="min-h-screen p-8"><h1>Spring</h1></CherryPetalBackground>',
      },
    ),
  ],
  [
    c(
      "ink-wash-background",
      <InkWashBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </InkWashBackground>,
      "components/background-gradient/ink-wash-background.tsx",
      "InkWashBackground",
      {
        title: "Ink Wash",
        isNew: true,
        description:
          "Minimal sumi-e ink clouds in soft stone gray on warm paper — galleries, studios, and calm editorial layouts.",
        usage:
          '<InkWashBackground className="min-h-screen p-8"><h1>Studio</h1></InkWashBackground>',
      },
    ),
    c(
      "halftone-pop-background",
      <HalftonePopBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </HalftonePopBackground>,
      "components/background-gradient/halftone-pop-background.tsx",
      "HalftonePopBackground",
      {
        title: "Halftone Pop",
        isNew: true,
        description:
          "Risograph-style halftone dots in rose, teal, and amber on cream — posters, zines, and bold creative brands.",
        usage:
          '<HalftonePopBackground className="min-h-screen p-8"><h1>Print</h1></HalftonePopBackground>',
      },
    ),
    c(
      "paper-fold-background",
      <PaperFoldBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </PaperFoldBackground>,
      "components/background-gradient/paper-fold-background.tsx",
      "PaperFoldBackground",
      {
        title: "Paper Fold",
        isNew: true,
        description:
          "Tactile cardstock with a diagonal crease, soft highlight, and shadow — invitations, stationery, and craft portfolios.",
        usage:
          '<PaperFoldBackground className="min-h-screen p-8"><h1>Folded</h1></PaperFoldBackground>',
      },
    ),
  ],
  [
    c(
      "soft-spotlight-background",
      <SoftSpotlightBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </SoftSpotlightBackground>,
      "components/background-gradient/soft-spotlight-background.tsx",
      "SoftSpotlightBackground",
      {
        title: "Soft Spotlight",
        isNew: true,
        description:
          "Gallery stage light from above with a gentle vignette — product reveals, keynote heroes, and museum-style layouts.",
        usage:
          '<SoftSpotlightBackground className="min-h-screen p-8"><h1>Featured</h1></SoftSpotlightBackground>',
      },
    ),
    c(
      "arc-bands-background",
      <ArcBandsBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </ArcBandsBackground>,
      "components/background-gradient/arc-bands-background.tsx",
      "ArcBandsBackground",
      {
        title: "Arc Bands",
        isNew: true,
        description:
          "Retro poster arcs with sky, teal, amber, and rose blending in soft radial gradients from the base — festivals, launches, and playful brand moments.",
        usage:
          '<ArcBandsBackground className="min-h-screen p-8"><h1>Celebrate</h1></ArcBandsBackground>',
      },
    ),
  ],
  [
    c(
      "dark-aurora-background",
      <DarkAuroraBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-100">Your content</p>
      </DarkAuroraBackground>,
      "components/background-gradient/dark-aurora-background.tsx",
      "DarkAuroraBackground",
      {
        title: "Dark Aurora",
        isNew: true,
        description:
          "Charcoal stage with soft teal, cyan, and emerald aurora blooms — premium dark hero sections and product launches.",
        usage:
          '<DarkAuroraBackground className="min-h-screen p-8"><h1 className="text-neutral-100">Launch</h1></DarkAuroraBackground>',
      },
    ),
    c(
      "dark-ember-background",
      <DarkEmberBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-100">Your content</p>
      </DarkEmberBackground>,
      "components/background-gradient/dark-ember-background.tsx",
      "DarkEmberBackground",
      {
        title: "Dark Ember",
        isNew: true,
        description:
          "Warm noir base with amber, ember orange, and rose glow pools — luxury dining, nightlife, and editorial dark modes.",
        usage:
          '<DarkEmberBackground className="min-h-screen p-8"><h1 className="text-neutral-100">Ember</h1></DarkEmberBackground>',
      },
    ),
    c(
      "dark-teal-depth-background",
      <DarkTealDepthBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-100">Your content</p>
      </DarkTealDepthBackground>,
      "components/background-gradient/dark-teal-depth-background.tsx",
      "DarkTealDepthBackground",
      {
        title: "Dark Teal Depth",
        isNew: true,
        description:
          "Deep oceanic black with layered teal and cyan depth blooms — fintech, dev tools, and refined SaaS dark themes.",
        usage:
          '<DarkTealDepthBackground className="min-h-screen p-8"><h1 className="text-neutral-100">Depth</h1></DarkTealDepthBackground>',
      },
    ),
  ],
  [
    c(
      "dark-arc-bands-background",
      <DarkArcBandsBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-100">Your content</p>
      </DarkArcBandsBackground>,
      "components/background-gradient/dark-arc-bands-background.tsx",
      "DarkArcBandsBackground",
      {
        title: "Dark Arc Bands",
        isNew: true,
        description:
          "Blended sky, teal, amber, and rose arcs on a midnight base — cinematic dark posters and event keynotes.",
        usage:
          '<DarkArcBandsBackground className="min-h-screen p-8"><h1 className="text-neutral-100">Arc</h1></DarkArcBandsBackground>',
      },
    ),
    c(
      "dark-carbon-spotlight-background",
      <DarkCarbonSpotlightBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-100">Your content</p>
      </DarkCarbonSpotlightBackground>,
      "components/background-gradient/dark-carbon-spotlight-background.tsx",
      "DarkCarbonSpotlightBackground",
      {
        title: "Dark Carbon Spotlight",
        isNew: true,
        description:
          "Carbon black stage with a soft overhead spotlight and vignette — product reveals, keynotes, and gallery dark modes.",
        usage:
          '<DarkCarbonSpotlightBackground className="min-h-screen p-8"><h1 className="text-neutral-100">Reveal</h1></DarkCarbonSpotlightBackground>',
      },
    ),
    c(
      "dark-midnight-mesh-background",
      <DarkMidnightMeshBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-100">Your content</p>
      </DarkMidnightMeshBackground>,
      "components/background-gradient/dark-midnight-mesh-background.tsx",
      "DarkMidnightMeshBackground",
      {
        title: "Dark Midnight Mesh",
        isNew: true,
        description:
          "Midnight frost mesh with whisper-soft grid, teal and sky blooms, and a gentle vignette — dashboards, terminals, and refined dark UI.",
        usage:
          '<DarkMidnightMeshBackground className="min-h-screen p-8"><h1 className="text-neutral-100">Console</h1></DarkMidnightMeshBackground>',
      },
    ),
  ],
  [
    c(
      "dark-ink-field-background",
      <DarkInkFieldBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-100">Your content</p>
      </DarkInkFieldBackground>,
      "components/background-gradient/dark-ink-field-background.tsx",
      "DarkInkFieldBackground",
      {
        title: "Dark Ink Field",
        isNew: true,
        description:
          "Near-black canvas with soft graphite ink washes — galleries, studios, and minimal dark editorial layouts.",
        usage:
          '<DarkInkFieldBackground className="min-h-screen p-8"><h1 className="text-neutral-100">Field</h1></DarkInkFieldBackground>',
      },
    ),
    c(
      "dark-rose-noir-background",
      <DarkRoseNoirBackground className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-100">Your content</p>
      </DarkRoseNoirBackground>,
      "components/background-gradient/dark-rose-noir-background.tsx",
      "DarkRoseNoirBackground",
      {
        title: "Dark Rose Noir",
        isNew: true,
        description:
          "Elegant noir with restrained rose and crimson bloom accents — fashion, beauty, and premium dark branding.",
        usage:
          '<DarkRoseNoirBackground className="min-h-screen p-8"><h1 className="text-neutral-100">Noir</h1></DarkRoseNoirBackground>',
      },
    ),
  ],
  [
    c(
      "diagonal-box-pattern",
      <DiagonalBoxPattern className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </DiagonalBoxPattern>,
      "components/background-pattern/diagonal-box-pattern.tsx",
      "DiagonalBoxPattern",
      {
        title: "Diagonal Box",
        isNew: true,
        description:
          "Classic 45° hairline hatch on white — the same quiet stage used across marketing mockups and component previews.",
        usage:
          '<DiagonalBoxPattern className="min-h-screen p-8"><section>Content</section></DiagonalBoxPattern>',
      },
    ),
    c(
      "reverse-diagonal-box-pattern",
      <ReverseDiagonalBoxPattern className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </ReverseDiagonalBoxPattern>,
      "components/background-pattern/reverse-diagonal-box-pattern.tsx",
      "ReverseDiagonalBoxPattern",
      {
        title: "Reverse Diagonal Box",
        isNew: true,
        description:
          "Mirrored 45° hairline hatch — same quiet stage as Diagonal Box, rotated right to left for visual variety.",
        usage:
          '<ReverseDiagonalBoxPattern className="min-h-screen p-8"><section>Content</section></ReverseDiagonalBoxPattern>',
      },
    ),
    c(
      "dot-grid-pattern",
      <DotGridPattern className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </DotGridPattern>,
      "components/background-pattern/dot-grid-pattern.tsx",
      "DotGridPattern",
      {
        title: "Dot Grid",
        isNew: true,
        description:
          "Soft dotted grid on neutral paper — watch mockup stages, device demos, and minimal product sections.",
        usage:
          '<DotGridPattern className="min-h-screen p-8"><section>Content</section></DotGridPattern>',
      },
    ),
    c(
      "line-grid-pattern",
      <LineGridPattern className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </LineGridPattern>,
      "components/background-pattern/line-grid-pattern.tsx",
      "LineGridPattern",
      {
        title: "Line Grid",
        isNew: true,
        description:
          "Horizontal ruled lines with a soft paper gradient — editorial layouts, docs, and notebook-style sections.",
        usage:
          '<LineGridPattern className="min-h-screen p-8"><article>Notes</article></LineGridPattern>',
      },
    ),
  ],
  [
    c(
      "graph-paper-pattern",
      <GraphPaperPattern className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </GraphPaperPattern>,
      "components/background-pattern/graph-paper-pattern.tsx",
      "GraphPaperPattern",
      {
        title: "Graph Paper",
        isNew: true,
        description:
          "Clean square grid for sketches, wireframes, and planning boards — subtle ink lines on white.",
        usage:
          '<GraphPaperPattern className="min-h-screen p-8"><div>Wireframe</div></GraphPaperPattern>',
      },
    ),
    c(
      "fine-grain-pattern",
      <FineGrainPattern className="flex h-full min-h-96 w-full items-center justify-center md:min-h-120">
        <p className="font-serif text-2xl text-neutral-900">Your content</p>
      </FineGrainPattern>,
      "components/background-pattern/fine-grain-pattern.tsx",
      "FineGrainPattern",
      {
        title: "Fine Grain",
        isNew: true,
        description:
          "Micro dot grain for a film-paper feel — hero backgrounds that need texture without competing with content.",
        usage:
          '<FineGrainPattern className="min-h-screen p-8"><h1>Quiet stage</h1></FineGrainPattern>',
      },
    ),
  ],
];

// Catalog (auto — no need to edit)

export type ShowcaseItem = ReturnType<typeof c>;

export type ShowcaseEntry = Readonly<{
  slug: string;
  title: string;
  category: string;
  file: string;
  exportName: string;
  description: string;
  usage: string;
  isNew?: boolean;
  preview: ReactElement;
}>;

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function categoryFromFile(file: string): string {
  const segment = file.split("/")[1] ?? "components";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function isInputShowcaseFile(file: string): boolean {
  return file.startsWith("components/inputs/");
}

export function isFormShowcaseFile(file: string): boolean {
  return file.startsWith("components/forms/");
}

export function isNarrowShowcaseFile(file: string): boolean {
  return isInputShowcaseFile(file) || isFormShowcaseFile(file);
}

export function isBackgroundPatternShowcaseFile(file: string): boolean {
  return file.startsWith("components/background-pattern/");
}

export function isBackgroundGradientShowcaseFile(file: string): boolean {
  return file.startsWith("components/background-gradient/");
}

export function isFlushPreviewBackgroundShowcaseFile(file: string): boolean {
  return (
    isBackgroundGradientShowcaseFile(file) ||
    isBackgroundPatternShowcaseFile(file)
  );
}

export function isFullBleedShowcaseFile(file: string): boolean {
  return (
    isFlushPreviewBackgroundShowcaseFile(file) ||
    file === "components/loaders/apple-hello-loader.tsx" ||
    file === "components/loaders/text-loader.tsx" ||
    file === "components/buttons/prism-depth-button.tsx" ||
    file === "components/buttons/cinder-latch-button.tsx"
  );
}

export function getShowcasePreviewBackdrop(file: string): string | undefined {
  if (file === "components/buttons/sheen-pill-button.tsx") {
    return "/background4.webp";
  }

  return undefined;
}

function buildCatalog(): Record<string, ShowcaseEntry> {
  const catalog: Record<string, ShowcaseEntry> = {};

  for (const row of showcaseRows) {
    for (const item of row) {
      catalog[item.slug] = {
        slug: item.slug,
        exportName: item.exportName,
        file: item.file,
        title: item.title ?? titleFromSlug(item.slug),
        category: categoryFromFile(item.file),
        description:
          item.description ??
          `Copy ${item.exportName} into your app and pass props to match your content.`,
        usage: item.usage ?? `<${item.exportName} />`,
        ...(item.isNew ? { isNew: true as const } : {}),
        preview: item.preview,
      };
    }
  }

  return catalog;
}

const catalog = buildCatalog();

export function getShowcaseEntry(slug: string): ShowcaseEntry | undefined {
  return catalog[slug];
}

export function getAllShowcaseSlugs(): string[] {
  return Object.keys(catalog);
}

export type ShowcaseCategoryGroup = Readonly<{
  category: string;
  items: ShowcaseEntry[];
  isCategoryNew: boolean;
}>;

export type ShowcaseNavEntry = Readonly<Omit<ShowcaseEntry, "preview">>;

export type ShowcaseNavCategoryGroup = Readonly<{
  category: string;
  items: ShowcaseNavEntry[];
  isCategoryNew: boolean;
}>;

export function isShowcaseCategoryAllNew(
  items: readonly { isNew?: boolean }[],
): boolean {
  return items.length > 0 && items.every((item) => item.isNew);
}

export function shouldShowShowcaseItemNewBadge(
  item: { isNew?: boolean },
  categoryIsAllNew: boolean,
): boolean {
  return Boolean(item.isNew) && !categoryIsAllNew;
}

function withCategoryNew(
  category: string,
  items: ShowcaseEntry[],
): ShowcaseCategoryGroup {
  const isCategoryNew = isShowcaseCategoryAllNew(items);

  return {
    category,
    items,
    isCategoryNew,
  };
}

export function getShowcaseByCategory(): ShowcaseCategoryGroup[] {
  const groups = new Map<string, ShowcaseEntry[]>();

  for (const slug of getAllShowcaseSlugs()) {
    const entry = catalog[slug];
    const items = groups.get(entry.category) ?? [];
    items.push(entry);
    groups.set(entry.category, items);
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, items]) =>
      withCategoryNew(
        category,
        [...items].sort((a, b) => a.title.localeCompare(b.title)),
      ),
    );
}

export function getShowcaseNavByCategory(): ShowcaseNavCategoryGroup[] {
  return getShowcaseByCategory().map((group) => ({
    category: group.category,
    isCategoryNew: group.isCategoryNew,
    items: group.items.map((entry) => {
      const { preview, ...item } = entry;
      void preview;
      return item;
    }),
  }));
}
