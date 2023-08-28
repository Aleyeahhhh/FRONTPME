// third-party
import { FormattedMessage } from "react-intl";

// assets
import {
  IconDashboard,
  IconDeviceAnalytics,
  IconListNumbers,
} from "@tabler/icons";
import HomeIcon from "@mui/icons-material/Home";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import EventIcon from "@mui/icons-material/Event";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
const icons = {
  FormatListNumberedIcon,
  HomeIcon,
  IconDashboard,
  IconDeviceAnalytics,
  IconListNumbers,
  ForwardToInboxIcon,
  RequestQuoteIcon,
  PendingActionsIcon,
  VpnKeyIcon,
  PriceCheckIcon,
  PriorityHighIcon,
  EventIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: "dashboard",
  title: <FormattedMessage id="dashboard" />,
  icon: icons.HomeIcon,
  type: "group",
  children: [
    {
      id: "default",
      title: <FormattedMessage id="default" />,
      type: "item",
      url: "/dashboard/default",
      icon: icons.HomeIcon,
      breadcrumbs: false,
    },
    {
      id: "analytics",
      title: <FormattedMessage id="analytics" />,
      type: "item",
      url: "/dashboard/analytics",
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false,
    },
    {
      id: "listedestaches",
      title: <FormattedMessage id="listedestaches" />,
      type: "item",
      url: "/dashboard/listedestaches",
      icon: icons.FormatListNumberedIcon,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
