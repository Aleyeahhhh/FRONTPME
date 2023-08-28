// third-party
import { FormattedMessage } from "react-intl";

// assets
import {
  IconCoin,
  IconClipboardCopy,
  IconFileInvoice,
  IconApps,
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc,
  IconHierarchy3,
} from "@tabler/icons";

// constant
const icons = {
  IconHierarchy3,
  IconCoin,
  IconClipboardCopy,
  IconFileInvoice,
  IconApps,
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc,
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
  id: "application",
  title: <FormattedMessage id="application" />,
  icon: icons.IconApps,
  type: "group",
  children: [
    {
      id: "Clients",
      title: <FormattedMessage id="Client" />,
      type: "item",
      url: "/app/client",
      icon: icons.IconUserCheck,
      breadcrumbs: false,
    },
    {
      id: "Contrats",
      title: <FormattedMessage id="Contrat" />,
      type: "item",
      url: "/app/contrat",
      icon: icons.IconClipboardCopy,
      breadcrumbs: false,
    },
    {
      id: "Entreprises",
      title: <FormattedMessage id="Entreprises" />,
      type: "item",
      url: "/app/Entreprises",
      icon: icons.IconHierarchy3,
      breadcrumbs: false,
    },
    {
      id: "Factures",
      title: <FormattedMessage id="Factures" />,
      type: "item",
      icon: icons.IconFileInvoice,
      url: "/app/facture",
    },
    {
      id: "Chiffre d'affaires",
      title: <FormattedMessage id="Chiffre d'affaires" />,
      type: "item",
      url: "/app/chiffredaffaires",
      icon: icons.IconCoin,
      breadcrumbs: false,
    },
  ],
};

export default application;
