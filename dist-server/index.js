import "dotenv/config";
import Debug from "debug";
import express from "express";
import favicon from "serve-favicon";
import path from "node:path";
import fs from "node:fs/promises";
import fetch$1 from "isomorphic-fetch";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import * as crypto from "node:crypto";
import { consentCookieName, useCookieGPCHelper } from "cookie-consent";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useId, useCallback, Fragment as Fragment$1, useRef, forwardRef, createElement, useLayoutEffect, StrictMode } from "react";
import { isRejected, createSlice, createSelector, createEntityAdapter, createAsyncThunk, isAnyOf, configureStore, createAction, isFulfilled, createReducer, combineReducers } from "@reduxjs/toolkit";
import { EventEmitter } from "events";
import { jwtDecode } from "jwt-decode";
import Decimal from "decimal.js";
import { generatePath, Link as Link$1, useNavigate, useLocation, useMatch, NavLink, useParams, Outlet, redirect, useSearchParams, Routes, Route, StaticRouter } from "react-router";
import "whatwg-fetch";
import { useDispatch, useSelector, Provider } from "react-redux";
import dayjs from "dayjs";
import { renderToString } from "react-dom/server";
import * as process$1 from "node:process";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import KeyIcon from "@mui/icons-material/Key";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import { GoogleLogin, useGoogleOneTapLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link$2 from "@mui/material/Link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import classNames from "classnames";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import numeral from "numeral";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TableFooter from "@mui/material/TableFooter";
import Dialog from "@mui/material/Dialog";
import TableContainer from "@mui/material/TableContainer";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FilledInput from "@mui/material/FilledInput";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { visuallyHidden, deepmerge } from "@mui/utils";
import { styled, useTheme, getContrastRatio, createTheme, ThemeProvider } from "@mui/material/styles";
import DialogContentText from "@mui/material/DialogContentText";
import Skeleton from "@mui/material/Skeleton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled$1 from "@emotion/styled";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ErrorBoundary as ErrorBoundary$1 } from "react-error-boundary";
import SearchIcon from "@mui/icons-material/Search";
import { TableVirtuoso } from "react-virtuoso";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import AlertTitle from "@mui/material/AlertTitle";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Popover from "@mui/material/Popover";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MenuList, alpha } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WebIcon from "@mui/icons-material/Web";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FormHelperText from "@mui/material/FormHelperText";
import StoreIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BusinessIcon from "@mui/icons-material/Business";
import TablePagination from "@mui/material/TablePagination";
import CssBaseline from "@mui/material/CssBaseline";
import NotesIcon from "@mui/icons-material/Notes";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ClearIcon from "@mui/icons-material/Clear";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const debug$4 = Debug("chums:server:version");
async function loadVersion$1() {
  try {
    const packageJSON = await fs.readFile(path.join(process.cwd(), "package.json"));
    const packageConfig = JSON.parse(Buffer.from(packageJSON).toString() ?? "{}");
    return { versionNo: packageConfig.version ?? "" };
  } catch (err) {
    if (err instanceof Error) {
      debug$4("loadVersion()", err.message);
      return Promise.reject(err);
    }
    return Promise.reject(new Error(err?.toString()));
  }
}
const getVersion = async (req, res) => {
  try {
    const version = await loadVersion$1();
    res.json({ version });
  } catch (err) {
    if (err instanceof Error) {
      debug$4("getVersion()", err.message);
      return res.json({ error: err.message, name: err.name });
    }
    res.json({ error: "unknown error in getVersion" });
  }
};
const getVersionJS = async (req, res) => {
  try {
    const { versionNo } = await loadVersion$1();
    const js = "CHUMS.version = " + JSON.stringify(versionNo);
    res.set("Content-Type", "application/javascript").send(js);
  } catch (err) {
    if (err instanceof Error) {
      debug$4("getVersionJS()", err.message);
      return res.json({ error: err.message, name: err.name });
    }
    res.json({ error: "unknown error in getVersionJS" });
  }
};
const debug$3 = Debug("chums:server:manifest");
async function loadManifest() {
  try {
    const { versionNo } = await loadVersion$1();
    const manifestFile = await fs.readFile(path.join(process.cwd(), "./public/build/manifest.json"));
    const manifestJSON = Buffer.from(manifestFile).toString();
    let manifestFiles = {};
    try {
      manifestFiles = JSON.parse(manifestJSON || "{}");
    } catch (err) {
      if (err instanceof Error) {
        debug$3("loadManifest() error parsing manifest", err.message);
      }
    }
    return { ...manifestFiles, version: versionNo };
  } catch (err) {
    if (err instanceof Error) {
      debug$3("loadManifest()", err.message);
      return Promise.reject(err);
    }
    return Promise.reject(new Error(err?.toString()));
  }
}
const getManifest = async (req, res) => {
  try {
    const manifest = await loadManifest();
    res.json(manifest);
  } catch (err) {
    if (err instanceof Error) {
      debug$3("getManifest()", err.message);
      return res.json({ error: err.message, name: err.name });
    }
    res.json({ error: "unknown error in getManifest" });
  }
};
const API_PORT = process.env.API_PORT ?? "8081";
process.env.PORT ?? "8084";
const debug$2 = Debug("chums:server:utils");
const handleInvalidURL = (req, res, next) => {
  try {
    decodeURI(req.url);
    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
      return;
    }
    res.status(404).json({ error: "Invalid URL" });
  }
};
const getAPIRequest = async (req, res) => {
  try {
    const result = await loadJSON(`http://localhost:${process.env.API_PORT}` + req.path);
    res.json(result);
  } catch (err) {
    if (err instanceof Error) {
      debug$2("getAPIRequest()", err.message);
      return res.json({ error: err.message, name: err.name });
    }
    res.json({ error: "unknown error in getAPIRequest" });
  }
};
async function loadJSON(url, options) {
  try {
    const res = await fetch$1(url, options);
    return await res.json();
  } catch (err) {
    if (err instanceof Error) {
      console.debug("loadJSON()", err.message);
      return Promise.reject(err);
    }
    console.debug("loadJSON()", err);
    return Promise.reject(new Error("Error in loadJSON()"));
  }
}
async function loadKeywords$1() {
  try {
    const url = `http://localhost:${API_PORT}/keywords.json`;
    const response = await loadJSON(url);
    return response?.result ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("loadKeywords()", err.message);
      return Promise.reject(err);
    }
    console.debug("loadKeywords()", err);
    return Promise.reject(new Error("Error in loadKeywords()"));
  }
}
const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      "connect-src": [
        "'self'",
        "www.googletagmanager.com",
        "www.google-analytics.com",
        "accounts.google.com",
        "https://accounts.google.com/gsi/",
        "'unsafe-inline'",
        (_req, res) => `'nonce-${res.locals.cspNonce}'`
      ],
      "script-src": [
        "'self'",
        "accounts.google.com",
        "https://accounts.google.com/gsi/client",
        "www.google-analytics.com",
        "www.googletagmanager.com",
        "'unsafe-inline'",
        (_req, res) => `'nonce-${res.locals.cspNonce}'`
      ],
      "img-src": [
        "'self'",
        "b2b.chums.com",
        "*.chums.com",
        "www.googletagmanager.com",
        "*.googleusercontent.com",
        "'unsafe-inline'"
      ],
      "frame-src": [
        "'self'",
        "accounts.google.com",
        "https://accounts.google.com/gsi/",
        "https://www.youtube.com/",
        "https://www.youtube-nocookie.com/",
        "https://youtu.be/",
        "'unsafe-inline'"
      ],
      "style-src": [
        "'self'",
        "b2b.chums.com",
        "*.chums.com",
        "https://accounts.google.com/gsi/style",
        "https://fonts.googleapis.com",
        "'unsafe-inline'"
      ],
      "font-src": [
        "'self'",
        "https://fonts.gstatic.com",
        "'unsafe-inline'"
      ],
      "default-src": [
        "'self'",
        "'unsafe-inline'"
      ]
    }
  },
  referrerPolicy: {
    policy: "strict-origin-when-cross-origin"
  },
  crossOriginOpenerPolicy: {
    policy: "same-origin-allow-popups"
  }
};
const STORE_COOKIE_CONSENT = "chums/b2b/cookieConsent";
const STORE_CURRENT_CART = "chums/b2b/current-cart";
const STORE_AUTHTYPE = "chums/b2b/authtype";
const STORE_PROFILE = "chums/b2b/profile";
const STORE_AVATAR = "chums/b2b/avatar";
const STORE_TOKEN = "chums/b2b/id_token";
const STORE_USER = "chums/b2b/googleUser";
const STORE_CUSTOMER = "chums/b2b/customer";
const STORE_CUSTOMERS_FILTER_REP = "chums/b2b/customers/filter/rep";
const STORE_CUSTOMERS_FILTER_STATE = "chums/b2b/customers/filter/state";
const STORE_USER_ACCESS = "chums/b2b/userAccess";
const STORE_USER_PREFS = "chums/b2b/prefs";
const STORE_RECENT_ACCOUNTS = "chums/b2b/recentAccounts";
const STORE_INVOICES_ROWS_PER_PAGE = "chums/b2b/invoices.rowsPerPage";
const STORE_INVOICES_SORT = "chums/b2b/invoices.sort";
const STORE_VERSION = "chums/b2b/version";
const STORE_CUSTOMER_SHIPPING_ACCOUNT = "chums/b2b/customerShippingAccount";
const STORE_SHOW_SIGNUP_POPUP = "chums/b2b/signUpPopup";
const deprecatedStorageKeys = {
  "com.chums.b2b.profile": STORE_PROFILE,
  "com.chums.b2b.userAccount": STORE_USER_ACCESS,
  "com.chums.b2b.id_token": STORE_TOKEN,
  "chums::b2b::current-cart": STORE_CURRENT_CART,
  "com.chums.b2b.current_cart": STORE_CURRENT_CART,
  "com.chums.b2b.authtype": STORE_AUTHTYPE,
  "com.chums.b2b.googleUser": STORE_USER,
  "com.chums.b2b.customer": STORE_CUSTOMER,
  "com.chums.b2b.prefs": STORE_USER_PREFS,
  "chums-b2b::accountList::rowsPerPage": null,
  "com.chums.b2b.recentAccounts": STORE_RECENT_ACCOUNTS,
  "com.chums.b2b.customerShippingAccount": STORE_CUSTOMER_SHIPPING_ACCOUNT,
  "invoices.rowsPerPage": STORE_INVOICES_ROWS_PER_PAGE,
  "invoices.sort": STORE_INVOICES_SORT
};
class LocalStore {
  static getItem(key, defaultValue) {
    if (typeof window === "undefined" || !window.localStorage) {
      return defaultValue;
    }
    const data = window.localStorage.getItem(key);
    if (!data) {
      return defaultValue;
    }
    try {
      return JSON.parse(data) ?? defaultValue;
    } catch (err) {
      return defaultValue;
    }
  }
  static setItem(key, data) {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(data));
  }
  static removeItem(key) {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }
    window.localStorage.removeItem(key);
  }
  static removeDeprecatedItems() {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }
    Object.keys(deprecatedStorageKeys).forEach((key) => {
      const newKey = deprecatedStorageKeys[key];
      const item = LocalStore.getItem(key, null);
      if (!!item && !!newKey) {
        LocalStore.setItem(newKey, item);
      }
      LocalStore.removeItem(key);
    });
  }
}
const isGoogleToken = (token) => {
  if (!token) {
    return false;
  }
  return token.email !== void 0;
};
const isLocalToken = (token) => {
  if (!token) {
    return false;
  }
  return token.iss === "chums.com";
};
const getProfile = (token) => {
  const decoded = jwtDecode(token);
  if (!isLocalToken(decoded)) {
    return null;
  }
  const { user, roles, accounts } = decoded;
  return {
    chums: {
      user: {
        ...user,
        accounts,
        roles: roles.map((role) => role.role)
      }
    }
  };
};
function getTokenExpiry(token) {
  const decoded = jwtDecode(token);
  return decoded.exp ?? 0;
}
function getTokenExpirationDate(token) {
  const decoded = jwtDecode(token);
  if (!decoded.exp) {
    return null;
  }
  const date = /* @__PURE__ */ new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}
function isTokenExpired(token) {
  if (!token) {
    return true;
  }
  const date = getTokenExpirationDate(token);
  if (date === null) {
    return true;
  }
  return !(date.valueOf() > (/* @__PURE__ */ new Date()).valueOf());
}
const getSignInProfile = (token) => {
  const decoded = jwtDecode(token);
  if (!isGoogleToken(decoded)) {
    return null;
  }
  const { sub, picture, email, name, given_name, family_name } = decoded;
  return {
    googleId: sub,
    imageUrl: picture,
    email,
    name,
    givenName: given_name,
    familyName: family_name
  };
};
class AuthService extends EventEmitter {
  timer = 0;
  loggedIn() {
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }
  setGoogleUser(googleUser) {
    LocalStore.setItem(STORE_USER, googleUser);
    if (googleUser.imageUrl) {
      LocalStore.setItem(STORE_AVATAR, googleUser.imageUrl);
    }
  }
  getGoogleUser() {
    return LocalStore.getItem(STORE_PROFILE, null);
  }
  setProfile(profile) {
    if (!profile) {
      LocalStore.removeItem(STORE_PROFILE);
      return;
    }
    LocalStore.setItem(STORE_PROFILE, profile);
    if (profile.imageUrl) {
      LocalStore.setItem(STORE_AVATAR, profile.imageUrl);
    }
    this.emit("profile_updated", profile);
  }
  getProfile() {
    return LocalStore.getItem(STORE_PROFILE, null);
  }
  setToken(idToken) {
    LocalStore.setItem(STORE_TOKEN, idToken);
  }
  removeToken() {
    LocalStore.removeItem(STORE_TOKEN);
  }
  getToken() {
    return LocalStore.getItem(STORE_TOKEN, null);
  }
  logout() {
    LocalStore.removeItem(STORE_TOKEN);
    LocalStore.removeItem(STORE_PROFILE);
    LocalStore.removeItem(STORE_AVATAR);
  }
}
const auth = new AuthService();
const filteredTermsCode = (code) => {
  if (!code) {
    return null;
  }
  return TERMS_CODES[code] ?? null;
};
const TERMS_CODES = {
  "00": { description: "No Terms", due: 0 },
  "01": { description: "COD", due: 15 },
  "02": { description: "Net 30 Days", due: 30 },
  "03": { description: "2% 10 Net 30", due: 30 },
  "04": { description: "Credit Card", due: 0 },
  "05": { description: "Net", due: 1 },
  "06": { description: "1% 10 Net 30", due: 30 },
  "08": { description: "2% 10 Net 60", due: 60 },
  "09": { description: "3% 10 Net 31", due: 31 },
  "10": { description: "COD Cash", due: 15 },
  "13": { description: "Net 15 Days", due: 15 },
  "14": { description: "Net 45 Days", due: 45 },
  "15": { description: "Net 60 Days", due: 60 },
  "16": { description: "Net 7 Days", due: 7 },
  "17": { description: "2% 10 Net 15", due: 15 },
  "19": { description: "10% 30 Net 31", due: 31 },
  "22": { description: "5% 30 Net 31", due: 31 },
  "23": { description: "Net 10 Days", due: 10 },
  "26": { description: "Wire Transfer", due: 0 },
  "28": { description: "5% Net 60", due: 60 },
  "29": { description: "5% 60 Net 61", due: 61 },
  "30": { description: "1% 15 Net 30", due: 30 },
  "31": { description: "2% 10 Net 45", due: 45 },
  "32": { description: "2% 10 Net 61", due: 61 },
  "33": { description: "2% 60 Net 61", due: 61 },
  "34": { description: "Check In Advance", due: 0 },
  "38": { description: "2% Net 40", due: 40 },
  "39": { description: "2% 30 Net 90", due: 90 },
  "40": { description: "2% 15 Net 50", due: 50 },
  "90": { description: "Net 90 Days", due: 90 },
  "92": { description: "Net 120 Days", due: 120 },
  "98": { description: "Cash In Advance", due: 0 },
  "99": { description: "*Net 30 Days", due: 30 }
};
const PAYMENT_TYPES = {
  TERMS: {
    code: "TERMS",
    sageCode: "",
    description: "Terms",
    message: "PO # is required.",
    allowTerms: true,
    allowCC: false,
    disabled: false,
    requirePO: true,
    prepaid: false
  },
  OTHER: {
    code: "OTHER",
    sageCode: "OTHER",
    description: "Credit Card",
    message: "If you don't have a current card on file the Customer Service Team will send a secure link to enter a new credit card.",
    allowTerms: false,
    allowCC: false,
    disabled: false,
    requirePO: false,
    prepaid: false
  },
  CHECK: {
    code: "CHECK",
    sageCode: "CHECK",
    description: "Check",
    message: "Payment must be received before order is shipped.",
    allowTerms: false,
    allowCC: false,
    disabled: false,
    requirePO: false,
    prepaid: true
  },
  "1M/V": {
    code: "1M/V",
    sageCode: "1M/V",
    description: "Credit Card (MC/Visa)",
    message: "Pay with credit card on file.",
    allowTerms: false,
    allowCC: true,
    disabled: false,
    requirePO: false,
    prepaid: true
  },
  "1AMEX": {
    code: "1AMEX",
    sageCode: "1AMEX",
    description: "Credit Card (AmEx)",
    message: "Pay with credit card on file.",
    allowTerms: false,
    allowCC: true,
    disabled: false,
    requirePO: false,
    prepaid: true
  },
  "1DISC": {
    code: "1DISC",
    sageCode: "1DISC",
    description: "Credit Card (Discovery)",
    message: "Pay with credit card on file.",
    allowTerms: false,
    allowCC: true,
    disabled: false,
    requirePO: false,
    prepaid: true
  }
};
const PRICE_METHODS = {
  override: "O",
  discountPct: "D",
  costMarkupAmt: "C",
  costMarkupPct: "M",
  discountAmt: "P"
};
const SHIPPING_METHODS = {
  "1FEX_GROUND": { code: "1FEX_GROUND", description: "FedEX Ground", allowCustomerAccount: true, carrier: "fedex" },
  "1UPS_GROUND": { code: "1UPS_GROUND", description: "UPS Ground", allowCustomerAccount: true, carrier: "ups" },
  "APP": { code: "APP", description: "USPS Priority", allowCustomerAccount: false, carrier: "usps" },
  "TO BE DECIDED": { code: "TO BE DECIDED", description: "To Be Decided", allowCustomerAccount: false, carrier: "" }
};
const getShippingMethod = (code) => {
  if (!code) {
    return null;
  }
  return SHIPPING_METHODS[code] ?? null;
};
const PRICE_LEVELS$1 = {
  1: "Wholesale 100 Pc",
  2: "Wholesale 200 Pc",
  5: "Wholesale 500 Pc",
  A: "Distributor 5000 Pc",
  B: "Distributor 10000 Pc",
  C: "Distributor 20000 Pc",
  N: "Safety DNS",
  S: "Safety DSS",
  M: "Safety DSM",
  L: "Safety DSL",
  G: "Safety GOV",
  X: "International 5000",
  Y: "International 10000",
  Z: "International 20000"
};
const addressFromShipToAddress = (address) => {
  return {
    CustomerName: address?.ShipToName ?? "",
    AddressLine1: address?.ShipToAddress1 ?? null,
    AddressLine2: address?.ShipToAddress2 ?? null,
    AddressLine3: address?.ShipToAddress3 ?? null,
    City: address?.ShipToCity ?? null,
    State: address?.ShipToState ?? null,
    CountryCode: address?.ShipToCountryCode ?? null,
    ZipCode: address?.ShipToZipCode ?? null
  };
};
const multiLineAddress = (address, includeName) => {
  const finalLine = [address.City, address.State, address.CountryCode, address.ZipCode].filter((val) => !!val).join(" ");
  return [
    address.CustomerName,
    address.AddressLine1 ?? "",
    address.AddressLine2 ?? "",
    address.AddressLine3 ?? "",
    finalLine
  ].filter((line) => !!line);
};
const filterShipToByUserAccount = (access) => (address) => {
  if (!access) {
    return false;
  }
  if (!access.isRepAccount) {
    return true;
  }
  return [address.SalespersonDivisionNo, "%"].includes(access.SalespersonDivisionNo) && [address.SalespersonNo, "%"].includes(access.SalespersonNo);
};
const hasBillToAccess = (access, customerAccount) => {
  if (!access || !customerAccount) {
    return false;
  }
  if (access.isRepAccount) {
    return [customerAccount.SalespersonDivisionNo, "%"].includes(access.SalespersonDivisionNo) && [customerAccount.SalespersonNo, "%"].includes(access.SalespersonNo);
  }
  return access.ARDivisionNo === customerAccount.ARDivisionNo && access.CustomerNo === customerAccount.CustomerNo;
};
function customerKey(arg) {
  if (!arg) {
    return null;
  }
  const { ARDivisionNo, CustomerNo, ShipToCode } = arg;
  return {
    ARDivisionNo,
    CustomerNo,
    ShipToCode
  };
}
const companyCode = (code = "") => {
  switch (code.toLowerCase()) {
    case "chums":
    case "chi":
      return "chums";
    case "bc":
    case "bcs":
      return "bc";
    default:
      return code;
  }
};
const sageCompanyCode = (code = "") => {
  switch (code.toLowerCase()) {
    case "chums":
    case "chi":
      return "CHI";
    case "bc":
    case "bcs":
      return "BCS";
    default:
      return code;
  }
};
const companyPriority = (code) => {
  switch (companyCode(code)) {
    case "chums":
      return 1;
    case "bc":
      return 2;
    default:
      return 3;
  }
};
const longCustomerNo = ({ ARDivisionNo, CustomerNo, ShipToCode }) => ShipToCode ? `${ARDivisionNo}-${CustomerNo}/${ShipToCode}` : `${ARDivisionNo}-${CustomerNo}`;
const longRepNo = ({ SalespersonDivisionNo, SalespersonNo }) => SalespersonDivisionNo === "%" && SalespersonNo === "%" ? "All Reps" : SalespersonDivisionNo === "%" ? `${SalespersonNo}` : `${SalespersonDivisionNo}-${SalespersonNo}`;
const longAccountNumber = (acct) => acct.isRepAccount ? longRepNo(acct) : longCustomerNo(acct);
const sortUserAccounts = (a, b) => {
  const acctA = longAccountNumber(a);
  const acctB = longAccountNumber(b);
  return a.Company === b.Company ? acctA === acctB ? a.id - b.id : acctA > acctB ? 1 : -1 : a.Company < b.Company ? 1 : -1;
};
const isUSA = (countryCode = "") => ["USA", "US"].includes((countryCode || "").toUpperCase());
const isCanada = (countryCode = "") => ["CAN", "CA"].includes((countryCode || "").toUpperCase());
const isValidARDivisionNo = (ARDivisionNo = "") => {
  return /^0[1-9]$/.test(ARDivisionNo);
};
const isValidCustomerNo = (CustomerNo = "") => {
  return /^[A-Z0-9]+$/i.test(CustomerNo ?? "");
};
const isValidCustomer = (arg) => {
  if (!arg) {
    return false;
  }
  return isValidARDivisionNo(arg.ARDivisionNo) && isValidCustomerNo(arg.CustomerNo);
};
const calcPrice = ({ stdPrice, PricingMethod = null, DiscountMarkup1 = 0, stdCost = null }) => {
  switch (PricingMethod) {
    case PRICE_METHODS.override:
      return DiscountMarkup1;
    case PRICE_METHODS.discountAmt:
      return new Decimal(stdPrice ?? 0).sub(DiscountMarkup1).toString();
    case PRICE_METHODS.discountPct:
      return new Decimal(stdPrice ?? 0).times(new Decimal(1).sub(new Decimal(DiscountMarkup1).div(100))).toString();
    case PRICE_METHODS.costMarkupAmt:
      return new Decimal(stdCost ?? 0).add(DiscountMarkup1).toString();
    case PRICE_METHODS.costMarkupPct:
      return new Decimal(stdCost ?? 0).times(new Decimal(1).add(new Decimal(DiscountMarkup1).div(100))).toString();
  }
  return stdPrice ?? 0;
};
const priceRecord = ({ pricing = [], itemCode, priceCode }) => {
  const [itemRecord] = pricing.filter((pc) => pc.ItemCode === itemCode && itemCode !== "");
  if (itemRecord) {
    return { ...itemRecord };
  }
  const [priceRecord2] = pricing.filter((pc) => pc.PriceCode === priceCode && pc.ItemCode === "");
  return priceRecord2 || { PriceCode: "", PricingMethod: "", DiscountMarkup1: 0, ItemCode: "" };
};
const getFirstCustomer = (accounts) => {
  const [customer] = accounts.filter((acct) => !acct.isRepAccount).sort(
    (a, b) => a.Company === b.Company ? longCustomerNo(a) > longCustomerNo(b) ? 1 : -1 : companyPriority(a.Company) > companyPriority(b.Company) ? 1 : -1
  );
  if (!customer) {
    return null;
  }
  const { ARDivisionNo, CustomerNo, CustomerName, ShipToCode } = customer;
  return { ARDivisionNo, CustomerNo, CustomerName: CustomerName ?? "", ShipToCode };
};
const shipToAddressFromBillingAddress = (customer) => {
  const [EmailAddress] = (customer.EmailAddress || "").split(/;[ ]*/);
  return {
    ARDivisionNo: customer.ARDivisionNo,
    CustomerNo: customer.CustomerNo,
    ContactCode: customer.ContactCode,
    SalespersonDivisionNo: customer.SalespersonDivisionNo,
    SalespersonNo: customer.SalespersonNo,
    ShipToCode: "",
    ShipToName: customer.CustomerName,
    ShipToAddress1: customer.AddressLine1,
    ShipToAddress2: customer.AddressLine2,
    ShipToAddress3: customer.AddressLine3,
    ShipToCity: customer.City,
    ShipToState: customer.State,
    ShipToZipCode: customer.ZipCode,
    ShipToCountryCode: customer.CountryCode,
    TelephoneNo: customer.TelephoneNo,
    TelephoneExt: customer.TelephoneExt,
    EmailAddress,
    ResidentialAddress: customer.ResidentialAddress,
    Reseller: customer.Reseller
  };
};
const customerListSorter = ({ field, ascending }) => (a, b) => {
  const sortMod = ascending ? 1 : -1;
  switch (field) {
    case "CustomerName":
      return ((a[field] ?? a.BillToName ?? "").toLowerCase() === (b[field] ?? b.BillToName ?? "").toLowerCase() ? longCustomerNo(a) > longCustomerNo(b) ? 1 : -1 : (a[field] ?? a.BillToName ?? "").toLowerCase() > (b[field] ?? b.BillToName ?? "").toLowerCase() ? 1 : -1) * sortMod;
    case "AddressLine1":
    case "City":
    case "State":
    case "ZipCode":
    case "TelephoneNo":
    case "EmailAddress":
    case "CountryCode":
      return ((a[field] ?? "").toLowerCase() === (b[field] ?? "").toLowerCase() ? longCustomerNo(a) > longCustomerNo(b) ? 1 : -1 : (a[field] ?? "").toLowerCase() > (b[field] ?? "").toLowerCase() ? 1 : -1) * sortMod;
    default:
      return (longCustomerNo(a) > longCustomerNo(b) ? 1 : -1) * sortMod;
  }
};
const isShipToAddress = (address) => {
  return !!address && address.ShipToName !== void 0;
};
const isCustomerAddress = (address) => {
  return !!address && address.CustomerName !== void 0;
};
const stateCountry = (address) => {
  if (isCustomerAddress(address)) {
    if (!address.CountryCode || address.CountryCode === "US" || address.CountryCode === "USA") {
      return address.State;
    }
    if (!address.State) {
      return address.CountryCode;
    }
    return `${address.State}, ${address.CountryCode}`;
  }
  if (isShipToAddress(address)) {
    if (!address.ShipToCountryCode || address.ShipToCountryCode === "US" || address.ShipToCountryCode === "USA") {
      return address.ShipToState;
    }
    if (!address.ShipToState) {
      return address.ShipToCountryCode;
    }
    return `${address.ShipToState}, ${address.ShipToCountryCode}`;
  }
  return null;
};
const customerPriceRecordSorter = (a, b) => {
  return `${a.PriceCode}/${a.ItemCode}` > `${b.PriceCode}/${b.ItemCode}` ? 1 : -1;
};
const customerUserSorter = (sort) => (a, b) => {
  const { field, ascending } = sort;
  const sortMod = ascending ? 1 : -1;
  switch (field) {
    case "name":
    case "email":
      return (a[field].toLowerCase().localeCompare(b[field].toLowerCase()) === 0 ? a.id - b.id : a[field].toLowerCase().localeCompare(b[field].toLowerCase())) * sortMod;
    case "id":
    default:
      return (a.id - b.id) * sortMod;
  }
};
function customerSlug(customer) {
  if (!customer) {
    return null;
  }
  if (typeof customer === "string") {
    const parsed = parseCustomerSlug(customer);
    if (!parsed) {
      return null;
    }
    customer = parsed;
  }
  return customer.ShipToCode ? shipToCustomerSlug(customer) : billToCustomerSlug(customer);
}
const isSameCustomer = (a, b) => {
  if (!a || !b) {
    return false;
  }
  return a.ARDivisionNo === b.ARDivisionNo && a.CustomerNo === b.CustomerNo;
};
function billToCustomerSlug(customer) {
  if (!customer) {
    return null;
  }
  if (typeof customer === "string") {
    const parsed = parseCustomerSlug(customer);
    if (!parsed) {
      return null;
    }
    customer = parsed;
  }
  return `${customer.ARDivisionNo}-${customer.CustomerNo}`;
}
function shipToCustomerSlug(customer) {
  if (!customer) {
    return null;
  }
  if (typeof customer === "string") {
    const parsed = parseCustomerSlug(customer);
    if (!parsed) {
      return null;
    }
    customer = parsed;
  }
  return `${customer.ARDivisionNo}-${customer.CustomerNo}-${customer.ShipToCode}`;
}
const parseCustomerSlug = (slug) => {
  if (!/^[0-9]{2}-[\S\s]+/.test(slug)) {
    return null;
  }
  const [ARDivisionNo, CustomerNo, ShipToCode] = slug.split("-");
  return { ARDivisionNo, CustomerNo, ShipToCode };
};
const shortCustomerKey = (customer) => customer ? `${customer?.ARDivisionNo ?? ""}-${customer.CustomerNo ?? ""}` : "";
const customerNo = (customer) => `${customer.ARDivisionNo}-${customer.CustomerNo}` + (customer.ShipToCode ? `:${customer.ShipToCode}` : "");
const buildRecentCustomers = (recentAccounts = [], customer) => {
  if (!customer || !customer.ARDivisionNo || !customer.CustomerNo) {
    return recentAccounts;
  }
  const key = billToCustomerSlug(customer);
  const current = {
    ...customerKey(customer),
    CustomerName: customer.CustomerName,
    ts: (/* @__PURE__ */ new Date()).valueOf()
  };
  return [
    ...recentAccounts.filter((c) => billToCustomerSlug(c) !== key),
    current
  ].sort((a, b) => b.ts - a.ts).filter((_, index) => index < 10);
};
const emptyCustomer = {
  ARDivisionNo: "",
  AddressLine1: null,
  AddressLine2: null,
  AddressLine3: null,
  City: null,
  ContactCode: "",
  CountryCode: null,
  CreditHold: "N",
  CustomerName: "",
  CustomerNo: "",
  CustomerStatus: "",
  CustomerType: null,
  DateEstablished: "",
  DefaultPaymentType: null,
  EmailAddress: "",
  InternetReseller: null,
  PriceLevel: null,
  PrimaryShipToCode: null,
  Reseller: null,
  ResidentialAddress: "N",
  SalespersonDivisionNo: "",
  SalespersonNo: "",
  ShipMethod: null,
  State: null,
  TaxSchedule: null,
  TelephoneExt: null,
  TelephoneNo: null,
  TermsCode: null,
  URLAddress: null,
  ZipCode: null
};
const customerShipToSorter = ({
  field,
  ascending
}) => (a, b) => {
  const sortMod = ascending ? 1 : -1;
  switch (field) {
    case "ShipToName":
    case "EmailAddress":
    case "ShipToAddress1":
    case "ShipToCity":
    case "ShipToZipCode":
      return ((a[field] ?? "").toLowerCase() === (b[field] ?? "").toLowerCase() ? a.ShipToCode > b.ShipToCode ? 1 : -1 : (a[field] ?? "").toLowerCase() > (b[field] ?? "").toLowerCase() ? 1 : -1) * sortMod;
    case "ShipToState":
      return ((stateCountry(a)?.toLowerCase() ?? "") === (stateCountry(b)?.toLowerCase() ?? "") ? a.ShipToCode > b.ShipToCode ? 1 : -1 : (stateCountry(a)?.toLowerCase() ?? "") > (stateCountry(b)?.toLowerCase() ?? "") ? 1 : -1) * sortMod;
    default:
      return (a.ShipToCode > b.ShipToCode ? 1 : -1) * sortMod;
  }
};
const customerPriceCodeKey = (pc) => `${pc.PriceCode}/${pc.ItemCode}`;
const PATH_CUSTOMER_ACCOUNT = "/account/:customerSlug";
const PATH_CUSTOMER_DELIVERY = "/account/:customerSlug/delivery/:code";
const PATH_LOGIN = "/login";
const PATH_PAGE = "/pages/:keyword";
const PATH_PRODUCT = "/products/:category/:product?";
const PATH_PRODUCT_WITHOUT_PARENT = "/products/:product";
const PATH_PROFILE = "/profile";
const PATH_PROFILE_ACCOUNT = "/profile/:id";
const PATH_SIGNUP = "/signup";
const PATH_SET_PASSWORD = "/set-password";
const PATH_CATEGORY = "/products/:category";
const CONTENT_PATH_SEARCH_IMAGE = "/images/products/80/:image";
const documentTitles = {
  accountList: "Account List: :name",
  home: "Home",
  login: "Log In",
  profile: "Profile Page",
  profileChangePassword: "Change Password",
  signUp: "Sign Up"
};
const AUTH_ERROR = "AUTH_ERROR";
const salespersonKey = (sp) => `${sp.SalespersonDivisionNo}-${sp.SalespersonNo}`;
const getPrimaryAccount = (accountList) => {
  if (!accountList.length) {
    return null;
  }
  const [primary] = accountList.filter((acct) => acct.primaryAccount);
  return primary ?? accountList[0];
};
const userRepListSort = (a, b) => {
  return salespersonKey(a).toUpperCase() > salespersonKey(b).toUpperCase() ? 1 : -1;
};
const isCustomerAccess = (value) => {
  return !!value && value.id !== void 0;
};
const isUserProfile = (user) => {
  return !!user && user.id !== void 0;
};
const customerPath = (customer) => `${customer.ARDivisionNo}-${customer.CustomerNo}`;
const customerURL = (customer) => `/account/${encodeURIComponent(customerPath(customer))}`;
const customerCartURL = (customer, cartId) => {
  return generatePath("/account/:customerSlug/carts/:cartId", {
    customerSlug: customerSlug(customer),
    cartId: `${cartId}`
  });
};
const accessListURL = (access) => {
  if (access.isRepAccount) {
    return generatePath(PATH_PROFILE_ACCOUNT, { id: access.id.toString() });
  }
  return generatePath(PATH_CUSTOMER_ACCOUNT, { customerSlug: shortCustomerKey(access) });
};
const repAccessCode = (row) => {
  if (row.SalespersonDivisionNo === "%" && row.SalespersonNo === "%") {
    return "ALL";
  }
  if (row.SalespersonDivisionNo === "%") {
    return `ALL-${row.SalespersonNo}`;
  }
  if (row.SalespersonNo === "%") {
    return `${row.SalespersonDivisionNo}-ALL`;
  }
  return `${row.SalespersonDivisionNo}-${row.SalespersonNo}`;
};
const isUserAction = (action) => {
  return action.type.startsWith("user/");
};
const is401Action = (action) => {
  return isRejected(action) && action.error.name === AUTH_ERROR;
};
const getUserType = (profile) => {
  if (!isUserProfile(profile)) {
    return null;
  }
  switch (profile.accountType) {
    case 1:
      return "EMPLOYEE";
    case 2:
      return "REP";
    case 4:
      return "CUSTOMER";
  }
};
const initialUserState = () => {
  const existingToken = auth.getToken();
  let existingTokenExpires = 0;
  if (existingToken) {
    const decoded = jwtDecode(existingToken);
    existingTokenExpires = decoded?.exp ?? 0;
  }
  const isLoggedIn2 = auth.loggedIn();
  const profile = isLoggedIn2 ? auth.getProfile() ?? null : null;
  const avatar = LocalStore.getItem(STORE_AVATAR, null);
  const accounts = profile?.chums?.user?.accounts ?? [];
  isLoggedIn2 ? LocalStore.getItem(STORE_CUSTOMER, getFirstCustomer(accounts) ?? null) : null;
  isLoggedIn2 ? LocalStore.getItem(STORE_USER_ACCESS, accounts.length === 1 ? accounts[0] : null) : null;
  const authType = isLoggedIn2 ? LocalStore.getItem(STORE_AUTHTYPE, null) : null;
  return {
    token: existingToken ?? null,
    tokenExpires: existingTokenExpires,
    profile: profile?.chums?.user ?? null,
    userType: getUserType(profile?.chums?.user ?? null),
    picture: avatar ?? profile?.imageUrl ?? null,
    roles: profile?.chums?.user?.roles ?? [],
    loggedIn: isLoggedIn2,
    authType: authType ?? "",
    actionStatus: "idle"
  };
};
const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: initialUserState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.actionStatus = "logging-in";
    }).addCase(loginUser.fulfilled, (state) => {
      state.actionStatus = "idle";
    }).addCase(loginUser.rejected, (state) => {
      state.actionStatus = "idle";
    }).addCase(updateLocalAuth.pending, (state) => {
      state.actionStatus = "logging-in";
    }).addCase(updateLocalAuth.fulfilled, (state) => {
      state.actionStatus = "idle";
    }).addCase(updateLocalAuth.rejected, (state) => {
      state.actionStatus = "idle";
    }).addCase(setLoggedIn, (state, action) => {
      if (!state.loggedIn && action.payload?.loggedIn) {
        const _initialUserState = initialUserState();
        state.tokenExpires = _initialUserState.tokenExpires;
        state.profile = _initialUserState.profile;
        state.picture = _initialUserState.picture;
        state.roles = _initialUserState.roles;
        state.authType = _initialUserState.authType;
      }
      state.loggedIn = action.payload.loggedIn;
      state.token = action.payload.token ?? null;
      state.tokenExpires = action.payload.expires ?? 0;
      if (!action.payload?.loggedIn) {
        state.token = null;
        state.tokenExpires = 0;
        state.profile = null;
        state.userType = null;
        state.roles = [];
        state.authType = "";
        state.picture = null;
      }
    }).addCase(loadProfile.pending, (state) => {
      state.actionStatus = "pending";
    }).addCase(loadProfile.fulfilled, (state, action) => {
      state.actionStatus = "idle";
      state.profile = action.payload.user ?? null;
      state.userType = getUserType(state.profile);
      state.roles = (action.payload.roles ?? []).sort();
    }).addCase(loadProfile.rejected, (state) => {
      state.actionStatus = "idle";
    }).addCase(signInWithGoogle.pending, (state) => {
      state.actionStatus = "pending";
    }).addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.actionStatus = "idle";
      state.token = action.payload.token ?? null;
      state.roles = (action.payload.roles ?? []).sort();
      state.loggedIn = !!(action.payload.user?.id ?? 0);
      state.picture = action.payload.picture ?? null;
      state.tokenExpires = action.payload.expires ?? 0;
    }).addCase(signInWithGoogle.rejected, (state) => {
      state.actionStatus = "idle";
    }).addCase(resetPassword.pending, (state) => {
      state.actionStatus = "resetting-password";
    }).addCase(resetPassword.fulfilled, (state) => {
      state.actionStatus = "idle";
    }).addCase(resetPassword.rejected, (state) => {
      state.actionStatus = "idle";
    }).addCase(saveUserProfile.pending, (state) => {
      state.actionStatus = "saving-profile";
    }).addCase(saveUserProfile.fulfilled, (state, action) => {
      state.actionStatus = "idle";
      state.profile = action.payload.user ?? null;
      state.userType = getUserType(state.profile);
      state.roles = (action.payload.roles ?? []).sort();
    }).addCase(saveUserProfile.rejected, (state) => {
      state.actionStatus = "idle";
    }).addCase(setNewPassword.pending, (state) => {
      state.actionStatus = "setting-password";
    }).addCase(setNewPassword.fulfilled, (state, action) => {
      state.actionStatus = "idle";
      if (action.payload?.success) ;
    }).addCase(setNewPassword.rejected, (state) => {
      state.actionStatus = "idle";
    }).addCase(changePassword.pending, (state) => {
      state.actionStatus = "setting-password";
    }).addCase(changePassword.fulfilled, (state, action) => {
      state.actionStatus = "idle";
      if (action.payload.success) {
        state.loggedIn = false;
      }
    }).addCase(changePassword.rejected, (state) => {
      state.actionStatus = "idle";
    }).addCase(logoutUser.pending, (state) => {
      state.actionStatus = "logging-out";
    }).addCase(logoutUser.fulfilled, (state) => {
      state.actionStatus = "idle";
    }).addCase(logoutUser.rejected, (state) => {
      state.actionStatus = "idle";
    }).addMatcher(
      (action) => isUserAction(action) && isRejected(action) && !!action.error,
      (state, action) => {
        if (isRejected(action)) {
          console.log("userReducer", action?.error);
        }
      }
    ).addMatcher(is401Action, (state) => {
      state.loggedIn = false;
      state.token = null;
      state.tokenExpires = 0;
    });
  },
  selectors: {
    selectUserProfile: (state) => state.profile,
    selectUserType: (state) => state.userType,
    selectProfilePicture: (state) => state.picture,
    selectLoggedIn: (state) => state.loggedIn,
    selectLoggingIn: (state) => state.actionStatus === "logging-in",
    selectAuthType: (state) => state.authType,
    selectUserActionStatus: (state) => state.actionStatus,
    selectUserLoading: (state) => state.actionStatus !== "idle",
    selectResettingPassword: (state) => state.actionStatus === "resetting-password",
    selectRoles: (state) => state.roles,
    selectLoginExpiry: (state) => state.tokenExpires
  }
});
const {
  selectRoles,
  selectLoggedIn,
  selectLoggingIn,
  selectResettingPassword,
  selectUserActionStatus,
  selectUserLoading,
  selectUserType,
  selectAuthType,
  selectUserProfile,
  selectProfilePicture,
  selectLoginExpiry
} = userProfileSlice.selectors;
const selectIsEmployee = createSelector(
  [selectRoles],
  (roles) => roles.includes("employee")
);
const selectIsRep = createSelector(
  [selectRoles],
  (roles) => roles.includes("rep")
);
const selectCanEdit = createSelector(
  [selectIsEmployee, selectIsRep],
  (isEmployee, isRep) => isEmployee || isRep
);
const selectCanViewAvailable = createSelector(
  [selectUserProfile],
  (profile) => isUserProfile(profile) && profile.accountType === 1
);
class B2BError extends Error {
  url;
  debug;
  code;
  constructor(message, url, debug2, code) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.debug = debug2;
    this.url = url;
    this.code = code;
  }
}
const isLocalHost = () => {
  const host = window?.location?.host;
  return host?.toLowerCase().startsWith("localhost") || host.startsWith("127.0.0.1");
};
function sendGtagEvent(eventName, options) {
  if (typeof globalThis.window !== "undefined" && typeof globalThis.window.gtag !== "undefined") {
    if (!options) {
      options = {};
    }
    globalThis.window.gtag("event", eventName, options);
  }
}
function configGtag(options) {
  if (typeof globalThis.window === "undefined") {
    return;
  }
  const gtag = window.gtag;
  const gtagID = window.Chums?.gtagID;
  if (gtag && gtagID) {
    gtag("config", gtagID, options ?? {});
  }
}
const SELL_AS_VARIANTS = 0;
const SELL_AS_SELF = 1;
const SELL_AS_MIX = 3;
const SELL_AS_COLORS = 4;
const PRICE_FIELDS = {
  standard: "stdPrice",
  msrp: "msrp"
};
const parseImageFilename2 = ({ image, colorCode }) => parseColor(image, colorCode ?? "");
function parsePossiblyMissingFilename(productImage, colorCode) {
  if (!productImage) {
    return null;
  }
  return parseImageFilename(productImage, colorCode);
}
function parseImageFilename(productImage, colorCode) {
  if (!productImage.trim()) {
    ga4Exception("Invalid product image", false);
    return "missing-placeholder2.jpg";
  }
  let image = productImage.replace(/\?/, colorCode ?? "");
  if (colorCode) {
    colorCode.split("").map((code) => {
      image = image.replace(/\*/, code);
    });
  }
  return image.replace(/\*/g, "").replace(/\s/g, "%20");
}
const hasVariants = (product) => isSellAsVariants(product) && product.variants.filter((v) => v.status).length > 0;
const defaultVariant = (product) => {
  const activeVariants2 = product.variants.filter((v) => v.status);
  const [variant = activeVariants2[0]] = activeVariants2.filter((v) => v.isDefaultVariant);
  return variant;
};
const getSalesUM = (product) => {
  if (!product) {
    return "";
  }
  if (isSellAsColors(product)) {
    const um = [];
    product.items.filter((item) => !(!item.status || item.inactiveItem || item.productType === "D" || !item.salesUM)).forEach((item) => {
      if (!!item.salesUM && !um.includes(item.salesUM)) {
        um.push(item.salesUM);
      }
    });
    return um.join(",");
  }
  return product.salesUM ?? "";
};
const getItemPrice = ({ item, priceField = PRICE_FIELDS.standard, priceCodes = [] }) => {
  if (priceField === PRICE_FIELDS.msrp) {
    return new Decimal(item.msrp ?? 0).toFixed(2);
  }
  const priceCode = priceRecord({ pricing: priceCodes, priceCode: item.priceCode, itemCode: item.itemCode });
  return new Decimal(calcPrice({ stdPrice: item[priceField] ?? 0, ...priceCode })).times(item.salesUMFactor ?? 1).toFixed(2);
};
const getPrice = ({ product, priceField = PRICE_FIELDS.standard, priceCodes = [] }) => {
  const priceCode = priceRecord({ pricing: priceCodes, itemCode: product.itemCode, priceCode: product.priceCode });
  if (isSellAsColors(product)) {
    const prices = [];
    product.items.filter((item) => !(!item.status || item.inactiveItem || item.productType === "D")).filter((item) => !!item[priceField]).forEach((item) => {
      const price = getItemPrice({ item, priceField, priceCodes });
      if (!prices.includes(price)) {
        prices.push(price);
      }
    });
    if (prices.length === 0) {
      return [new Decimal(product.msrp ?? 0).toFixed(2)];
    }
    if (prices.length === 1) {
      return prices;
    }
    const sortedPrices = prices.sort((a, b) => new Decimal(a).gt(b) ? 1 : -1);
    return [sortedPrices[0], sortedPrices[sortedPrices.length - 1]];
  }
  switch (product.sellAs) {
    case SELL_AS_SELF:
    case SELL_AS_MIX:
      return [
        new Decimal(calcPrice({ stdPrice: product[priceField] ?? 0, ...priceCode })).times(product.salesUMFactor ?? 1).toFixed(2)
      ];
    default:
      return [];
  }
};
const getMSRP = (product) => {
  if (!product) {
    return [];
  }
  return getPrice({ product, priceField: PRICE_FIELDS.msrp });
};
const getPrices = (product, priceCodes = []) => {
  if (!product) {
    return [];
  }
  return getPrice({ product, priceField: PRICE_FIELDS.standard, priceCodes });
};
const defaultCartItem = (product, option) => {
  if (isSellAsColors(product)) {
    const items = product.items.filter((item) => item.status);
    let cartItem;
    [cartItem] = items.filter((item) => item.itemCode === option?.itemCode);
    if (!cartItem) {
      [cartItem] = items.filter((item) => item.colorCode === option?.colorCode || item.color.code === option?.colorCode);
    }
    if (!cartItem) {
      [cartItem] = items.filter((item) => item.colorCode === product.defaultColor);
    }
    if (!cartItem && items.length) {
      cartItem = items[0];
    }
    if (!cartItem) {
      return null;
    }
    return colorCartItem(cartItem, product);
  }
  if (isSellAsMix(product)) {
    let [color] = product.mix.items.filter((item) => item.color?.code === (option?.colorCode ?? product.defaultColor)).map((item) => item.color);
    if (!color) {
      [color] = product.mix.items.filter((item) => item.color?.code === product.defaultColor).map((item) => item.color);
    }
    const [image_filename] = product.mix.items.filter((item) => item.color?.code === color?.code).map((item) => {
      if (item.additionalData && item.additionalData.image_filename) {
        return item.additionalData.image_filename;
      }
      return null;
    });
    return {
      itemCode: product.itemCode,
      quantity: 1,
      productId: product.id,
      name: product.name,
      colorCode: color?.code,
      colorName: color?.name,
      image: image_filename ?? parseImageFilename2({ image: product.image, colorCode: color?.code }),
      msrp: product.msrp,
      stdPrice: product.stdPrice,
      priceCode: product.priceCode,
      salesUM: product.salesUM,
      stdUM: product.stdUM,
      salesUMFactor: product.salesUMFactor,
      seasonCode: product.season_code,
      seasonAvailable: product.additionalData?.seasonAvailable || product.season_available,
      quantityAvailable: product.QuantityAvailable,
      season: product.season ?? null
    };
  }
  if (!product) {
    return null;
  }
  return {
    image: product.image,
    name: product.name,
    productId: product.id,
    itemCode: product.itemCode,
    stdPrice: product.stdPrice,
    salesUM: product.salesUM,
    salesUMFactor: product.salesUMFactor,
    quantityAvailable: product.QuantityAvailable,
    msrp: product.msrp,
    quantity: 1,
    seasonCode: product.season_code,
    seasonAvailable: product.season_available
  };
};
const isPreSeason = (item, product) => {
  if (item.additionalData?.season && item.additionalData.season.active) {
    return !(item.additionalData.seasonAvailable || item.additionalData.season.product_available);
  }
  if (product?.season && product.season.active) {
    return !product.season.product_available;
  }
  return false;
};
const colorCartItem = (item, product) => {
  return {
    quantityAvailable: item.QuantityAvailable,
    msrp: item.msrp,
    colorCode: item.color.code ?? item.colorCode,
    itemCode: item.itemCode,
    stdPrice: item.stdPrice,
    salesUM: item.salesUM,
    salesUMFactor: item.salesUMFactor,
    colorName: item.color.name ?? item.colorName,
    priceCode: item.priceCode,
    price: item.msrp?.toString(),
    productId: item.productId,
    stdUM: item.stdUM,
    image: (item.additionalData?.image_filename ?? "") || parseImageFilename2({
      image: product?.image ?? "",
      colorCode: item.color.code ?? item.colorCode ?? ""
    }),
    name: product?.name ?? item.colorName,
    quantity: 1,
    season: item.additionalData?.season ?? product?.season ?? null,
    seasonCode: item.additionalData?.season?.code,
    seasonAvailable: !isPreSeason(item, product),
    seasonDescription: item.additionalData?.season?.description,
    seasonTeaser: item.additionalData?.season?.product_teaser,
    preSeasonMessage: item.additionalData?.season?.product_available || item.additionalData?.seasonAvailable ? null : item.additionalData?.season?.preSeasonMessage ?? product?.preSeasonMessage ?? product?.dateAvailable,
    message: item.additionalData?.message
  };
};
const parseColor = (str, colorCode = "") => {
  if (!str) {
    return "";
  }
  colorCode = String(colorCode);
  str = str.replace(/\?/, colorCode);
  colorCode.split("").map((code) => {
    str = str.replace(/\*/, code);
  });
  return str.replace(/\*/g, "");
};
const isCartItem = (item) => {
  if (!item) {
    return false;
  }
  return item.itemCode !== void 0;
};
const isCartProduct = (item) => {
  if (!item) {
    return false;
  }
  return isCartItem(item) && item.productId !== void 0;
};
const isProduct = (product) => {
  if (!product) {
    return false;
  }
  return product.id !== void 0;
};
const updateCartProductPricing = (item, pricing) => {
  if (!item) {
    return null;
  }
  return {
    ...item,
    priceCodeRecord: priceRecord({
      pricing: pricing ?? [],
      itemCode: item.itemCode,
      priceCode: item.priceCode
    }),
    priceLevel: "",
    price: getItemPrice({
      item,
      priceField: PRICE_FIELDS.standard,
      priceCodes: pricing ?? []
    })
  };
};
function isCategoryChildSection(child) {
  return child.itemType === "section";
}
function isCategoryChildCategory(child) {
  return child.itemType === "category";
}
function isCategoryChildProduct(child) {
  return child.itemType === "product";
}
function isCategoryChildLink(child) {
  return child.itemType === "link";
}
function isSellAsSelf(product) {
  return !!product && product.sellAs === SELL_AS_SELF;
}
function isSellAsVariants(product) {
  return !!product && product.sellAs === SELL_AS_VARIANTS;
}
function isSellAsMix(product) {
  return !!product && product.sellAs === SELL_AS_MIX;
}
function isSellAsColors(product) {
  return !!product && product.sellAs === SELL_AS_COLORS;
}
function getImageItemCode(state) {
  if (isSellAsSelf(state.selectedProduct)) {
    return state.selectedProduct.itemCode;
  }
  if (isSellAsMix(state.selectedProduct)) {
    const [imageItemCode] = state.selectedProduct.mix.items.filter((item) => item.color?.code === state.colorCode);
    return imageItemCode?.itemCode ?? null;
  }
  return state.cartItem?.itemCode ?? null;
}
function canStorePreferences() {
  const settings = LocalStore.getItem(STORE_COOKIE_CONSENT, null);
  return settings?.preferences ?? false;
}
function canStoreAnalytics() {
  const settings = LocalStore.getItem(STORE_COOKIE_CONSENT, null);
  return settings?.analytics ?? false;
}
function ga4Exception(description, fatal) {
  if (!canStoreAnalytics()) return;
  sendGtagEvent("exception", { description, fatal });
}
function ga4Search(searchTerm) {
  if (!canStoreAnalytics())
    sendGtagEvent("search", { search_term: searchTerm.trim() });
}
function ga4Login(method) {
  if (!canStoreAnalytics()) return;
  sendGtagEvent("login", { method });
}
function ga4SignUp() {
  if (!canStoreAnalytics()) return;
  sendGtagEvent("sign_up");
}
function ga4ViewItemList(category) {
  if (!canStoreAnalytics()) return;
  sendGtagEvent("view_item_list", {
    item_list_id: category.keyword,
    item_list_name: category.title ?? category.keyword,
    items: category.children.filter((child) => isCategoryChildProduct(child)).map((child) => ({
      item_id: child.product.itemCode,
      item_name: child.product.name
    }))
  });
}
function ga4SelectCustomer(customerSlug2) {
  if (!canStoreAnalytics()) return;
  sendGtagEvent("select_content", {
    content_type: "customer",
    content_id: customerSlug2
  });
}
function ga4ViewItem(product) {
  if (!canStoreAnalytics()) return;
  if (product) {
    sendGtagEvent("view_item", {
      items: [{
        item_id: product.itemCode,
        item_name: product.name
      }]
    });
  }
}
function ga4SelectColorItem(product, cartItem) {
  if (!canStoreAnalytics()) return;
  if (cartItem) {
    if (isSellAsColors(product) && cartItem.colorCode !== product.defaultColor) {
      sendGtagEvent("select_item", {
        item_list_id: product.itemCode,
        item_list_name: product.description,
        items: [{
          item_id: cartItem.itemCode,
          item_name: cartItem.colorName ?? cartItem.colorCode ?? "",
          price: cartItem.price ? +cartItem.price : void 0,
          quantity: cartItem.quantity
        }]
      });
    }
  }
}
function ga4SelectMixItem(product, variantProduct) {
  if (!canStoreAnalytics()) return;
  if (product && variantProduct && isSellAsMix(variantProduct)) {
    sendGtagEvent("select_item", {
      item_list_id: product.itemCode,
      item_list_name: [product.name, product.additionalData?.subtitle].filter((val) => !!val).join(" / "),
      items: [{
        item_id: variantProduct.itemCode,
        item_name: `${variantProduct.name}${variantProduct.additionalData?.subtitle ? " / " + variantProduct.additionalData?.subtitle : ""}`
      }]
    });
  }
}
function ga4SelectVariantItem(itemCode) {
  if (!canStoreAnalytics()) return;
  sendGtagEvent("select_content", {
    content_type: "variant",
    content_id: itemCode
  });
}
class SessionStore {
  static getItem(key, defaultValue) {
    if (typeof window === "undefined" || !window.sessionStorage) {
      return defaultValue;
    }
    const data = window.sessionStorage.getItem(key);
    if (!data) {
      return defaultValue;
    }
    try {
      return JSON.parse(data) ?? defaultValue;
    } catch (err) {
      return defaultValue;
    }
  }
  static setItem(key, data) {
    if (typeof window === "undefined" || !window.sessionStorage) {
      return;
    }
    window.sessionStorage.setItem(key, JSON.stringify(data));
  }
  static removeItem(key) {
    if (typeof window === "undefined" || !window.sessionStorage) {
      return;
    }
    window.sessionStorage.removeItem(key);
  }
}
function getCredentials() {
  const token = auth.getToken();
  if (token) {
    return `Bearer ${token}`;
  }
  return null;
}
async function handleJSONResponse(res, args) {
  const componentStack = JSON.stringify({
    url: res.url,
    args: args ?? null
  });
  if (!res.ok) {
    const text = res.statusText ?? await res.text();
    if (/(401|403|504)/.test(res.status.toString())) {
      return Promise.reject(new B2BError(text, res.url, null, res.status));
    }
    await postErrors({ message: `error: ${res.status}`, componentStack });
    return Promise.reject(new B2BError(text, res.url, null, res.status));
  }
  try {
    const json = await res.json();
    if (json.error) {
      await postErrors({ message: json.error, componentStack });
      console.warn(json.error);
      return Promise.reject(new B2BError(json.error, res.url));
    }
    return json;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("handleJSONResponse()", err.message);
      return Promise.reject(err);
    }
    console.debug("handleJSONResponse()", err);
    return Promise.reject(new Error("Error in handleJSONResponse()"));
  }
}
async function allowErrorResponseHandler(res) {
  try {
    return await res.json();
  } catch (err) {
    if (err instanceof Error) {
      console.debug("allowErrorResponseHandler()", err.message);
      return Promise.reject(err);
    }
    console.debug("allowErrorResponseHandler()", err);
    return Promise.reject(new Error("Error in allowErrorResponseHandler()"));
  }
}
async function fetchJSON(url, {
  headers,
  body,
  ...requestInit
} = {}, responseHandler) {
  try {
    const options = { ...requestInit };
    if (!options.method) {
      options.method = "GET";
    }
    options.headers = new Headers(headers ?? void 0);
    if (!options.credentials || options.credentials === "same-origin") {
      if (!options.credentials) {
        options.credentials = "same-origin";
      }
      const credentials = getCredentials();
      if (credentials) {
        options.headers.append("Authorization", credentials);
      }
    }
    options.headers.append("Accept", "application/json");
    if (!["HEAD", "GET"].includes(options.method.toUpperCase())) {
      options.body = body;
      options.headers.append("Content-Type", "application/json");
    }
    const res = await fetch(url, { ...options });
    if (responseHandler) {
      return responseHandler(res);
    }
    return await handleJSONResponse(res, options.body);
  } catch (err) {
    if (err instanceof Error) {
      console.log("fetchJSON()", err.message);
      return Promise.reject(err);
    }
    console.error("fetchJSON()", err);
    if (typeof err === "string") {
      return Promise.reject(new Error(err));
    }
    return Promise.reject(err);
  }
}
async function postErrors({ message, componentStack, userId, fatal }) {
  try {
    if (isLocalHost()) {
      return;
    }
    const version = SessionStore.getItem(STORE_VERSION, "-");
    const body = JSON.stringify({
      url: globalThis.window.location.pathname,
      message,
      componentStack: componentStack ?? "",
      user_id: canStoreAnalytics() ? userId ?? 0 : 0,
      version
    });
    await fetchJSON("/api/error-reporting", { method: "POST", body }, allowErrorResponseHandler);
    ga4Exception("An error occurred", fatal ?? false);
  } catch (err) {
    if (err instanceof Error) {
      console.log("postErrors()", err.message);
      return Promise.reject(err);
    }
    console.error("postErrors()", err);
    if (typeof err === "string") {
      return Promise.reject(new Error(err));
    }
    return Promise.reject(err);
  }
}
async function fetchCustomerList(arg) {
  try {
    if (!arg.isRepAccount) {
      return [];
    }
    const url = "/api/sales/b2b/account-list/:Company/:SalespersonDivisionNo-:SalespersonNo".replace(":Company", encodeURIComponent("chums")).replace(":SalespersonDivisionNo", encodeURIComponent(arg.SalespersonDivisionNo)).replace(":SalespersonNo", encodeURIComponent(arg.SalespersonNo));
    const res = await fetchJSON(url, { cache: "no-cache" });
    return res?.result ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchCustomerList()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchCustomerList()", err);
    return Promise.reject(new Error("Error in fetchCustomerList()"));
  }
}
const cartsSorter = ({ field, ascending }) => (a, b) => {
  const sortMod = ascending ? 1 : -1;
  switch (field) {
    case "salesOrderNo":
    case "customerPONo":
    case "dateCreated":
    case "shipToName":
    case "ShipToName":
      return ((a[field] ?? "").toLowerCase() === (b[field] ?? "").toLowerCase() ? a.id - b.id : (a[field] ?? "").toLowerCase() > (b[field] ?? "").toLowerCase() ? 1 : -1) * sortMod;
    case "ShipToCity":
      return (shipToLocation(a).toLowerCase().localeCompare(shipToLocation(b).toLowerCase()) === 0 ? a.id - b.id : shipToLocation(a).toLowerCase().localeCompare(shipToLocation(b).toLowerCase())) * sortMod;
    case "subTotalAmt":
      return (new Decimal(a[field]).eq(b[field]) ? a.id - b.id : new Decimal(a[field]).gt(b[field]) ? 1 : -1) * sortMod;
    case "id":
    default:
      return (a.id - b.id) * sortMod;
  }
};
const parseCartId = (str) => {
  if (!str) {
    return NaN;
  }
  return +str;
};
const cartDetailSorter = ({
  field,
  ascending
}) => (a, b) => {
  const sortMod = ascending ? 1 : -1;
  switch (field) {
    case "itemCode":
      return (a[field].toLowerCase() === b[field].toLowerCase() ? a.id - b.id : a[field].toLowerCase() > b[field].toLowerCase() ? 1 : -1) * sortMod;
    case "lineKey":
    case "lineSeqNo":
      return (+(a[field] ?? 0) === +(b[field] ?? 0) ? a.id - b.id : +(a[field] ?? 0) - +(b[field] ?? 0)) * sortMod;
    case "id":
    default:
      return (a.id - b.id) * sortMod;
  }
};
const cartDetailToCartProduct = (row) => {
  if (row.itemType === "4") {
    return null;
  }
  return {
    itemCode: row.itemCode,
    quantity: +(row.quantityOrdered ?? 1),
    comment: row.commentText ?? "",
    productId: row.cartProduct.productId ?? 0,
    image: row.cartProduct.image ?? "",
    name: row.itemCodeDesc
  };
};
function calcCartQty(detail) {
  return detail.filter((line) => line.itemType === "1").map((line) => new Decimal(line.quantityOrdered).times(line.unitOfMeasureConvFactor)).reduce((pv, cv) => cv.add(pv), new Decimal(0)).toNumber();
}
function shipToLocation(cart) {
  return `${cart.ShipToCity ?? ""}, ${cart.ShipToState ?? ""} ${cart.ShipToZipCode ?? ""}`.trim();
}
const initializeActiveCartState = () => {
  const shippingAccount = LocalStore.getItem(STORE_CUSTOMER_SHIPPING_ACCOUNT, null);
  return {
    customerKey: customerSlug(LocalStore.getItem(STORE_CUSTOMER, null)),
    cartId: LocalStore.getItem(STORE_CURRENT_CART, null),
    promoCode: null,
    shippingAccount: {
      enabled: shippingAccount?.enabled ?? false,
      value: shippingAccount?.value ?? ""
    },
    nextShipDate: null
  };
};
const STATES_USA = [
  { code: "AA", name: "Armed Forces Americas" },
  { code: "AE", name: "Armed Forces Europe, the Middle East, and Canada" },
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AP", name: "Armed Forces Pacific" },
  { code: "AS", name: "American Samoa" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District Of Columbia" },
  { code: "FM", name: "Federated States Of Micronesia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "GU", name: "Guam" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PW", name: "Palau" },
  { code: "PA", name: "Pennsylvania" },
  { code: "PR", name: "Puerto Rico" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VI", name: "Virgin Islands" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" }
];
const TERRITORIES_CANADA = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" }
];
const adapter$c = createEntityAdapter({
  selectId: (arg) => customerSlug(arg),
  sortComparer: (a, b) => customerSlug(a).localeCompare(customerSlug(b))
});
const selectors$c = adapter$c.getSelectors();
const extraState$c = () => ({
  accessKey: null,
  status: "idle",
  filters: {
    search: "",
    rep: LocalStore.getItem(STORE_CUSTOMERS_FILTER_REP, ""),
    state: LocalStore.getItem(STORE_CUSTOMERS_FILTER_STATE, "")
  },
  countries: [],
  states: [],
  sort: { field: "CustomerName", ascending: true }
});
function getPreloadCustomerState(extra) {
  return adapter$c.getInitialState({
    ...extraState$c(),
    ...{}
  });
}
const customerListSlice = createSlice({
  name: "customerList",
  initialState: adapter$c.getInitialState(extraState$c()),
  reducers: {
    setCustomersSort: (state, action) => {
      state.sort = action.payload;
    },
    setCustomersFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    setCustomersRepFilter: (state, action) => {
      state.filters.rep = action.payload ?? "";
      LocalStore.setItem(STORE_CUSTOMERS_FILTER_REP, action.payload);
    },
    setCustomersStateFilter: (state, action) => {
      state.filters.state = action.payload ?? "";
      LocalStore.setItem(STORE_CUSTOMERS_FILTER_STATE, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        adapter$c.removeAll(state);
        state.filters.search = "";
        state.filters.rep = "";
        state.filters.state = "";
        state.accessKey = null;
        if (state.status === "fulfilled") {
          state.status = "idle";
        }
      }
    }).addCase(loadCustomerList.pending, (state, action) => {
      state.status = "loading";
      if (state.accessKey !== action.meta.arg?.id) {
        state.accessKey = action.meta.arg?.id ?? null;
        adapter$c.removeAll(state);
      }
    }).addCase(loadCustomerList.fulfilled, (state, action) => {
      state.status = "fulfilled";
      adapter$c.setAll(state, action.payload);
    }).addCase(loadCustomerList.rejected, (state) => {
      state.status = "rejected";
    }).addCase(dismissContextAlert, (state, action) => {
      if (action.payload === loadCustomerList.typePrefix) {
        state.status = "idle";
      }
    }).addCase(setUserAccess.pending, (state, action) => {
      if (state.accessKey !== action.meta.arg?.id) {
        adapter$c.removeAll(state);
        state.status = "idle";
        state.filters.rep = "";
        state.filters.search = "";
        state.filters.state = "";
        state.accessKey = action.meta.arg?.id ?? null;
      }
    });
  },
  selectors: {
    selectCustomerList: (state) => selectors$c.selectAll(state),
    selectCustomersStatus: (state) => state.status,
    selectCustomersSearchFilter: (state) => state.filters.search,
    selectCustomersRepFilter: (state) => state.filters.rep,
    selectCustomersStateFilter: (state) => state.filters.state,
    selectCustomersSort: (state) => state.sort
  }
});
const {
  selectCustomerList,
  selectCustomersStatus,
  selectCustomersSearchFilter,
  selectCustomersRepFilter,
  selectCustomersStateFilter,
  selectCustomersSort
} = customerListSlice.selectors;
const {
  setCustomersFilter,
  setCustomersRepFilter,
  setCustomersStateFilter,
  setCustomersSort
} = customerListSlice.actions;
const selectFilteredCustomerList = createSelector(
  [selectCustomerList, selectCustomersSearchFilter, selectCustomersRepFilter, selectCustomersStateFilter, selectCustomersSort],
  (list, filter, repFilter, stateFilter, sort) => {
    let filterRegex = /^/;
    try {
      filterRegex = new RegExp(`\\b${filter ?? ""}`, "i");
    } catch (err) {
      filterRegex = /^/;
    }
    return list.filter((customer) => !repFilter || customer.SalespersonNo === repFilter).filter((customer) => !stateFilter || customer.State === stateFilter).filter((customer) => {
      return !filter || filterRegex.test(shortCustomerKey(customer)) || filterRegex.test(`${customer.ARDivisionNo}-${customer.CustomerNo}`) || filterRegex.test(`${customer.ARDivisionNo}${customer.CustomerNo}`) || filterRegex.test(customer.CustomerNo) || filterRegex.test(customer.CustomerName) || filterRegex.test(customer.BillToName ?? "") || filterRegex.test(customer.AddressLine1 ?? "") || filterRegex.test(customer.City ?? "") || filterRegex.test(customer.State ?? "") || filterRegex.test(customer.ZipCode ?? "") || filterRegex.test(customer.TelephoneNo ?? "");
    }).sort(customerListSorter(sort));
  }
);
const selectCustomerStates = createSelector(
  [selectCustomerList],
  (list) => {
    const states = list.reduce((pv, cv) => {
      if (cv.CountryCode === "USA" && cv.State && !pv.includes(cv.State)) {
        const [state] = STATES_USA.filter((state2) => state2.code === cv.State);
        if (state) {
          return [...pv, state.code];
        }
      }
      return pv;
    }, []);
    return states.sort();
  }
);
async function fetchBanners() {
  try {
    const res = await fetchJSON("/api/features/banners/active.json");
    return res?.banners ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchBanners()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchBanners()", err);
    return Promise.reject(new Error("Error in fetchBanners()"));
  }
}
const loadBanners = createAsyncThunk(
  "banners/load",
  async () => {
    const banners = await fetchBanners();
    return {
      list: banners,
      updated: (/* @__PURE__ */ new Date()).valueOf()
    };
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return selectBannersStatus(state) === "idle";
    }
  }
);
const bannerSorter = (a, b) => (a.priority ?? a.id) - (b.priority ?? b.id);
const adapter$b = createEntityAdapter({
  selectId: (arg) => arg.id,
  sortComparer: (a, b) => a.id - b.id
});
const selectors$b = adapter$b.getSelectors();
const extraState$b = {
  status: "idle",
  updated: 0
};
function getPreloadedBannersState(arg) {
  return adapter$b.getInitialState({
    ...extraState$b,
    updated: arg.length > 0 ? (/* @__PURE__ */ new Date()).valueOf() : 0
  }, arg);
}
const bannersSlice = createSlice({
  name: "banners",
  initialState: adapter$b.getInitialState(extraState$b),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadBanners.pending, (state) => {
      state.status = "loading";
    }).addCase(loadBanners.fulfilled, (state, action) => {
      state.status = "idle";
      adapter$b.setAll(state, action.payload.list);
      state.updated = action.payload.updated;
    }).addCase(loadBanners.rejected, (state) => {
      state.status = "rejected";
    });
  },
  selectors: {
    selectAll: (state) => selectors$b.selectAll(state),
    selectBannersLoaded: (state) => state.updated > 0,
    selectBannersStatus: (state) => state.status,
    selectBannersUpdated: (state) => state.updated
  }
});
const {
  selectAll: selectAll$5,
  selectBannersLoaded,
  selectBannersStatus,
  selectBannersUpdated
} = bannersSlice.selectors;
const selectBannersList = createSelector(
  [selectAll$5],
  (banners) => {
    return [...banners].sort(bannerSorter);
  }
);
const defaultInvoicesSort = { field: "InvoiceDate", ascending: false };
const invoiceTotal = (invoice) => {
  return new Decimal(invoice.TaxableSalesAmt ?? 0).add(invoice.NonTaxableSalesAmt ?? 0).sub(invoice.DiscountAmt ?? 0);
};
const invoiceKey = (invoice) => `${invoice.InvoiceNo}-${invoice.InvoiceType}`;
const invoicesSorter = (sort = defaultInvoicesSort) => (a, b) => {
  const { field, ascending } = sort;
  const sortMod = ascending ? 1 : -1;
  switch (field) {
    case "InvoiceDate":
    case "SalesOrderNo":
    case "CustomerPONo":
    case "OrderDate":
    case "ShipToName":
    case "ShipToCity":
    case "InvoiceDueDate":
      return ((a[field] ?? "") === (b[field] ?? "") ? invoiceKey(a) > invoiceKey(b) ? 1 : -1 : (a[field] ?? "") > (b[field] ?? "") ? 1 : -1) * sortMod;
    case "TaxableSalesAmt":
    case "NonTaxableSalesAmt": {
      const aTotal = invoiceTotal(a);
      const bTotal = invoiceTotal(b);
      return (aTotal.eq(bTotal) ? invoiceKey(a) > invoiceKey(b) ? 1 : -1 : aTotal.gt(bTotal) ? 1 : -1) * sortMod;
    }
    case "Balance":
      return (new Decimal(a[field] ?? 0).sub(b[field] ?? 0).toNumber() || (invoiceKey(a) > invoiceKey(b) ? 1 : -1)) * sortMod;
    default:
      return (invoiceKey(a) > invoiceKey(b) ? 1 : -1) * sortMod;
  }
};
async function fetchInvoice(arg) {
  try {
    const url = "/api/sales/invoice/chums/:InvoiceType/:InvoiceNo".replace(":InvoiceType", encodeURIComponent(arg.InvoiceType ?? "IN")).replace(":InvoiceNo", encodeURIComponent(arg.InvoiceNo));
    const response = await fetchJSON(url, { cache: "no-cache" });
    if (!response?.invoice || !response?.invoice?.InvoiceNo) {
      return Promise.reject(new Error(`Invoice '${arg.InvoiceNo}-${arg.InvoiceType}' was not found`));
    }
    return response.invoice;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("deprecated_loadInvoice()", err.message);
      return Promise.reject(err);
    }
    console.debug("deprecated_loadInvoice()", err);
    return Promise.reject(new Error("Error in deprecated_loadInvoice()"));
  }
}
async function fetchInvoices(arg) {
  try {
    if (!arg.key) {
      return [];
    }
    const params = new URLSearchParams();
    params.set("start", String(arg.start ?? 0));
    params.set("limit", String(arg.limit ?? 500));
    const url = `/api/sales/b2b/account/:ARDivisionNo-:CustomerNo/invoices.json?${params.toString()}`.replace(":ARDivisionNo", encodeURIComponent(arg.key.ARDivisionNo)).replace(":CustomerNo", encodeURIComponent(arg.key.CustomerNo));
    const response = await fetchJSON(url, { cache: "no-cache" });
    return response?.list ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchInvoices()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchInvoices()", err);
    return Promise.reject(new Error("Error in fetchInvoices()"));
  }
}
const initialState$6 = {
  customerKey: null,
  invoice: null,
  detail: [],
  tracking: [],
  payments: [],
  paperless: [],
  status: "idle"
};
const currentInvoiceSlice = createSlice({
  name: "currentInvoice",
  initialState: initialState$6,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadInvoice.pending, (state, action) => {
      state.status = "loading";
      if (state.invoice && invoiceKey(state.invoice) !== invoiceKey(action.meta.arg)) {
        resetInvoice(state);
      }
    }).addCase(loadInvoice.fulfilled, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        const { Detail, Paperless, Track, Payments, ...header } = action.payload;
        state.invoice = header;
        state.detail = Detail ?? [];
        state.paperless = Paperless ?? [];
        state.tracking = Track ?? [];
      }
    }).addCase(loadInvoice.rejected, (state) => {
      state.status = "rejected";
    }).addCase(dismissContextAlert, (state, action) => {
      if (action.payload?.startsWith(loadInvoice.typePrefix)) {
        state.status = "idle";
      }
    }).addCase(loadInvoices.fulfilled, (state, action) => {
      if (state.invoice) {
        const key = invoiceKey(state.invoice);
        const invoice = action.payload.find((inv) => invoiceKey(inv) === key);
        if (invoice) {
          state.invoice = invoice;
        }
      }
    }).addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        state.customerKey = null;
        resetInvoice(state);
      }
    }).addCase(setUserAccess.pending, (state, action) => {
      const customerKey2 = customerSlug(action?.meta?.arg);
      if (!action.meta.arg?.isRepAccount && state.customerKey !== customerKey2) {
        state.customerKey = customerKey2;
        resetInvoice(state);
      }
    }).addCase(setCustomerAccount.fulfilled, (state, action) => {
      const customerKey2 = customerSlug(action.payload.customer);
      if (state.customerKey !== customerKey2) {
        state.customerKey = customerKey2;
        resetInvoice(state);
      }
    });
  },
  selectors: {
    selectCurrentInvoice: (state) => state.invoice,
    selectCurrentInvoiceNo: (state) => state.invoice?.InvoiceNo ?? null,
    selectCurrentInvoiceStatus: (state) => state.status,
    selectCurrentInvoiceDetail: (state) => state.detail,
    selectCurrentInvoiceTracking: (state) => state.tracking,
    selectCurrentInvoicePayments: (state) => state.payments,
    selectCurrentInvoicePaperless: (state) => state.paperless
  }
});
const {
  selectCurrentInvoice,
  selectCurrentInvoicePaperless,
  selectCurrentInvoiceDetail,
  selectCurrentInvoicePayments,
  selectCurrentInvoiceStatus,
  selectCurrentInvoiceTracking,
  selectCurrentInvoiceNo
} = currentInvoiceSlice.selectors;
const selectSortedInvoiceDetail = createSelector(
  [selectCurrentInvoiceDetail],
  (detail) => {
    return [...detail].sort((a, b) => Number(a.DetailSeqNo) - Number(b.DetailSeqNo));
  }
);
function resetInvoice(state) {
  state.invoice = null;
  state.detail = [];
  state.tracking = [];
  state.payments = [];
  state.paperless = [];
  state.status = "idle";
}
const loadInvoice = createAsyncThunk(
  "invoices/loadInvoice",
  async (arg) => {
    return await fetchInvoice(arg);
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return selectCurrentInvoiceStatus(state) === "idle";
    }
  }
);
const loadInvoices = createAsyncThunk(
  "invoices/loadInvoices",
  async (arg) => {
    return await fetchInvoices(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return selectLoggedIn(state) && !!arg && selectInvoicesStatus(state) === "idle" && isValidCustomer(arg.key);
    }
  }
);
function isBillToCustomer(customer) {
  if (!customer) {
    return false;
  }
  return customer.ARDivisionNo !== void 0;
}
const isUserRole = (role) => {
  return role.role !== void 0;
};
function isErrorResponse(res) {
  if (!res) {
    return false;
  }
  return res?.error !== void 0;
}
const adapter$a = createEntityAdapter({
  selectId: (arg) => arg.id,
  sortComparer: (a, b) => a.id - b.id
});
const selectors$a = adapter$a.getSelectors();
const initialState$5 = {
  current: LocalStore.getItem(STORE_USER_ACCESS, null),
  status: "idle"
};
const userAccessSlice = createSlice({
  name: "userAccess",
  initialState: adapter$a.getInitialState(initialState$5),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setLoggedIn, (state, action) => {
      if (action.payload.loggedIn) {
        if (!state.current) {
          adapter$a.setAll(state, action.payload.accessList ?? []);
          state.current = action.payload.access ?? null;
        }
      } else {
        adapter$a.removeAll(state);
        state.current = null;
      }
    }).addCase(setUserAccess.pending, (state, action) => {
      state.current = action.meta.arg;
    }).addMatcher(isAnyOf(
      loadProfile.fulfilled,
      signInWithGoogle.fulfilled,
      saveUserProfile.fulfilled
    ), (state, action) => {
      const list = action.payload.accounts ?? [];
      adapter$a.setAll(state, list);
      if (isCustomerAccess(state.current) && !!state.current.id) {
        const access = list.find((acct) => isCustomerAccess(state.current) && acct.id === state.current.id);
        state.current = access ?? null;
      }
      if (!isCustomerAccess(state.current) || !state.current?.id && list.length > 0) {
        state.current = getPrimaryAccount(list) ?? null;
      }
    });
  },
  selectors: {
    selectAccessList: (state) => selectors$a.selectAll(state),
    selectUserAccessCount: (state) => selectors$a.selectTotal(state),
    selectCurrentAccess: (state) => state.current,
    selectAccessStatus: (state) => state.status
  }
});
const { selectAccessList, selectCurrentAccess, selectAccessStatus, selectUserAccessCount } = userAccessSlice.selectors;
const selectCanFilterReps = createSelector(
  [selectCurrentAccess],
  (account) => {
    return /[%_]+/.test(account?.SalespersonNo ?? "");
  }
);
const selectRepAccessList = createSelector(
  [selectAccessList],
  (list) => list.filter((row) => !!row.isRepAccount)
);
const selectCustomerAccessList = createSelector(
  [selectAccessList],
  (list) => list.filter((row) => !row.isRepAccount)
);
const initialState$4 = {
  customerKey: null,
  values: null,
  status: "idle"
};
const customerPermissionsSlice = createSlice({
  name: "customerPermissions",
  initialState: initialState$4,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        state.customerKey = null;
        state.values = null;
        state.status = "idle";
      }
    }).addCase(setUserAccess.fulfilled, (state, action) => {
      if (!action.meta.arg?.isRepAccount && customerSlug(action.meta.arg) !== state.customerKey) {
        state.status = "idle";
        state.customerKey = customerSlug(action.meta.arg);
        state.values = null;
      }
    }).addCase(loadCustomerPermissions.pending, (state, action) => {
      const customerKey2 = customerSlug(action.meta.arg);
      state.status = "loading";
      if (state.customerKey !== customerKey2) {
        state.values = null;
        state.customerKey = customerKey2;
      }
    }).addCase(loadCustomerPermissions.fulfilled, (state, action) => {
      state.customerKey = customerSlug(action.meta.arg);
      state.values = action.payload;
      state.status = "fulfilled";
    }).addCase(loadCustomerPermissions.rejected, (state, action) => {
      state.status = "rejected";
    }).addCase(dismissContextAlert, (state, action) => {
      if (action.payload === loadCustomerPermissions.typePrefix) {
        state.status = "idle";
      }
    }).addMatcher(isAnyOf(
      saveBillingAddress.fulfilled,
      saveShipToAddress.fulfilled,
      loadCustomer.fulfilled
    ), (state, action) => {
      state.customerKey = customerSlug(action.payload?.customer ?? null);
      state.values = action.payload?.permissions ?? null;
    });
  },
  selectors: {
    selectCustomerPermissions: (state) => state.values,
    selectCustomerPermissionsStatus: (state) => state.status
  }
});
const { selectCustomerPermissions, selectCustomerPermissionsStatus } = customerPermissionsSlice.selectors;
const adapter$9 = createEntityAdapter({
  selectId: (arg) => arg.ShipToCode,
  sortComparer: (a, b) => a.ShipToCode.localeCompare(b.ShipToCode)
});
const selectors$9 = adapter$9.getSelectors();
const extraState$a = {
  customerKey: null,
  shipToCode: null,
  sort: { field: "ShipToCode", ascending: true }
};
const customerShipToAddressSlice = createSlice({
  name: "customerShipToAddress",
  initialState: adapter$9.getInitialState(extraState$a),
  reducers: {
    setShipToCode: (state, action) => {
      state.shipToCode = action.payload;
    },
    setShipToSort: (state, action) => {
      state.sort = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setCustomerAccount.fulfilled, (state, action) => {
      const customerKey2 = customerSlug(action.payload.customer);
      if (state.customerKey !== customerKey2) {
        state.customerKey = customerKey2;
        adapter$9.removeAll(state);
      }
    }).addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        adapter$9.removeAll(state);
      }
    }).addCase(loadCustomer.pending, (state, action) => {
      const customerKey2 = customerSlug(action.meta.arg);
      if (state.customerKey !== customerKey2) {
        state.customerKey = customerKey2;
        adapter$9.removeAll(state);
      }
    }).addCase(setUserAccess.pending, (state, action) => {
      if (!action.meta.arg?.isRepAccount && customerSlug(action.meta.arg) !== state.customerKey) {
        adapter$9.removeAll(state);
      }
    }).addCase(loadCustomerList.fulfilled, (state, action) => {
      if (state.customerKey) {
        const customer = action.payload.find((customer2) => customerSlug(customer2) === state.customerKey);
        if (!customer) {
          adapter$9.removeAll(state);
        }
      }
    }).addMatcher(isAnyOf(loadCustomer.fulfilled, saveBillingAddress.fulfilled, saveShipToAddress.fulfilled), (state, action) => {
      state.customerKey = customerSlug(action.payload?.customer ?? null);
      const list = action.payload?.shipTo ?? [];
      adapter$9.setAll(state, list);
      if (state.shipToCode) {
        const current = list.find((st) => st.ShipToCode === state.shipToCode);
        state.shipToCode = current?.ShipToCode ?? null;
      }
    });
  },
  selectors: {
    selectCustomerShipToCode: (state) => state.shipToCode,
    selectCustomerShipTo: (state) => selectors$9.selectById(state, state.shipToCode ?? ""),
    selectCustomerShipToAddresses: (state) => selectors$9.selectAll(state),
    selectShipToByCode: (state, code) => selectors$9.selectById(state, code) ?? null,
    selectShipToSort: (state) => state.sort
  }
});
const { setShipToCode: setShipToCode$1, setShipToSort } = customerShipToAddressSlice.actions;
const {
  selectCustomerShipToCode,
  selectCustomerShipTo,
  selectCustomerShipToAddresses,
  selectShipToSort,
  selectShipToByCode
} = customerShipToAddressSlice.selectors;
const selectPermittedShipToAddresses = createSelector(
  [selectCustomerShipToAddresses, selectCustomerPermissions, selectCurrentAccess],
  (addresses, permissions, access) => {
    if (permissions?.billTo) {
      return [...addresses].filter(filterShipToByUserAccount(access)).sort(customerShipToSorter({ field: "ShipToName", ascending: true }));
    }
    return addresses.filter((address) => !access?.isRepAccount || [address.SalespersonDivisionNo, "%"].includes(access.SalespersonDivisionNo) && [address.SalespersonDivisionNo, "%"].includes(access.SalespersonDivisionNo)).filter((addr) => permissions?.shipTo.includes(addr.ShipToCode)).sort(customerShipToSorter({ field: "ShipToName", ascending: true }));
  }
);
const selectSortedShipToList = createSelector(
  [selectPermittedShipToAddresses, selectShipToSort],
  (list, sort) => {
    return [...list].sort(customerShipToSorter(sort));
  }
);
const selectCustomerKey$1 = (state) => state.customer.key;
const selectCustomerAccount$1 = (state) => state.customer.account ?? null;
const selectPermittedBillToAddress = createSelector(
  [selectCustomerPermissions, selectCurrentAccess, selectCustomerAccount$1],
  (permissions, access, customer) => {
    return permissions?.billTo && hasBillToAccess(access, customer);
  }
);
const selectPrimaryShipTo = createSelector(
  [selectCustomerAccount$1, selectPermittedShipToAddresses, selectCustomerPermissions],
  (account, shipToAddresses, permissions) => {
    if (!permissions?.billTo || !isBillToCustomer(account)) {
      return null;
    }
    const [shipTo] = shipToAddresses.filter((st) => st.ShipToCode === account.PrimaryShipToCode);
    return shipTo ?? null;
  }
);
const adapter$8 = createEntityAdapter({
  selectId: (arg) => invoiceKey(arg),
  sortComparer: (a, b) => invoiceKey(a).localeCompare(invoiceKey(b))
});
const selectors$8 = adapter$8.getSelectors();
const extraState$9 = () => {
  return {
    customerKey: null,
    status: "idle",
    loaded: false,
    offset: 0,
    limit: 500,
    limitReached: false,
    filters: {
      showPaidInvoices: false,
      shipToCode: null,
      search: ""
    },
    sort: LocalStore.getItem(STORE_INVOICES_SORT, defaultInvoicesSort)
  };
};
const getInvoiceListInitialState = () => {
  return adapter$8.getInitialState(extraState$9());
};
const invoiceListSlice = createSlice({
  name: "invoicesList",
  initialState: adapter$8.getInitialState(extraState$9()),
  reducers: {
    setInvoicesFilterSearch: (state, action) => {
      state.filters.search = action.payload;
    },
    setInvoicesFilterShipToCode: (state, action) => {
      state.filters.shipToCode = action.payload;
    },
    setShowPaidInvoices: (state, action) => {
      state.filters.showPaidInvoices = action.payload ?? !state.filters.showPaidInvoices;
    },
    setInvoicesSort: (state, action) => {
      state.sort = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        resetCustomerInvoices(state, null);
      }
    }).addCase(setUserAccess.pending, (state, action) => {
      const customerKey2 = customerSlug(action?.meta?.arg);
      if (!action.meta.arg?.isRepAccount && state.customerKey !== customerKey2) {
        resetCustomerInvoices(state, customerKey2);
      }
    }).addCase(loadCustomer.pending, (state, action) => {
      const customerKey2 = customerSlug(action.meta.arg);
      if (state.customerKey !== customerKey2) {
        resetCustomerInvoices(state, customerKey2);
      }
    }).addCase(setCustomerAccount.fulfilled, (state, action) => {
      const customerKey2 = customerSlug(action.payload.customer);
      if (state.customerKey !== customerKey2) {
        resetCustomerInvoices(state, customerKey2);
      }
    }).addCase(loadInvoices.pending, (state, action) => {
      state.status = "loading";
      const customerKey2 = customerSlug(action.meta.arg.key);
      if (state.customerKey !== customerKey2) {
        resetCustomerInvoices(state, customerKey2);
      }
    }).addCase(loadInvoices.fulfilled, (state, action) => {
      state.status = "idle";
      state.loaded = true;
      if (action.meta.arg.start === 0) {
        adapter$8.setAll(state, action.payload);
      } else {
        adapter$8.setMany(state, action.payload);
      }
      state.limitReached = action.payload.length < state.limit;
      state.offset = action.meta.arg.start ?? 0;
    }).addCase(loadInvoices.rejected, (state) => {
      state.status = "rejected";
    }).addCase(dismissContextAlert, (state, action) => {
      if (action.payload?.startsWith(loadInvoices.pending.type)) {
        state.status = "idle";
      }
    }).addCase(loadInvoice.fulfilled, (state, action) => {
      if (action.payload) {
        adapter$8.setOne(state, action.payload);
      }
    });
  },
  selectors: {
    selectAll: (state) => selectors$8.selectAll(state),
    selectInvoicesListLimit: (state) => state.limit,
    selectInvoicesListOffset: (state) => state.offset,
    selectInvoicesListLimitReached: (state) => state.limitReached,
    selectInvoicesShowPaid: (state) => state.filters.showPaidInvoices,
    selectInvoicesShipToFilter: (state) => state.filters.shipToCode,
    selectInvoicesSearch: (state) => state.filters.search,
    selectInvoicesSort: (state) => state.sort,
    selectInvoicesStatus: (state) => state.status,
    selectInvoicesLoaded: (state) => state.loaded
  }
});
const {
  setInvoicesFilterSearch,
  setInvoicesFilterShipToCode,
  setInvoicesSort,
  setShowPaidInvoices
} = invoiceListSlice.actions;
const {
  selectAll: selectAll$4,
  selectInvoicesListLimitReached,
  selectInvoicesListOffset,
  selectInvoicesSearch,
  selectInvoicesListLimit,
  selectInvoicesSort,
  selectInvoicesShowPaid,
  selectInvoicesShipToFilter,
  selectInvoicesStatus,
  selectInvoicesLoaded
} = invoiceListSlice.selectors;
const selectFilteredInvoicesList = createSelector(
  [
    selectAll$4,
    selectInvoicesShowPaid,
    selectInvoicesShipToFilter,
    selectInvoicesSearch,
    selectInvoicesSort,
    selectPermittedBillToAddress,
    selectPermittedShipToAddresses
  ],
  (list, showPaid, shipTo, search, sort, allowBillTo, allowedShipToList) => {
    return list.filter((inv) => allowBillTo || allowedShipToList.map((c) => c.ShipToCode).includes(inv.ShipToCode ?? "")).filter((inv) => showPaid || !new Decimal(inv.Balance ?? "0").eq(0)).filter((inv) => !shipTo || inv.ShipToCode === shipTo).filter(
      (inv) => !search || inv.CustomerPONo?.toLowerCase()?.includes(search.toLowerCase()) || inv.InvoiceNo.toLowerCase().includes(search.toLowerCase()) || inv.SalesOrderNo?.toLowerCase()?.includes(search.toLowerCase())
    ).sort(invoicesSorter(sort));
  }
);
function resetCustomerInvoices(state, customerKey2) {
  adapter$8.removeAll(state);
  state.customerKey = customerKey2;
  state.offset = 0;
  state.limitReached = false;
  state.filters.search = "";
  state.filters.shipToCode = null;
  state.filters.showPaidInvoices = false;
  state.loaded = false;
}
configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  }),
  preloadedState: getPreloadedState$1()
});
const useAppDispatch = () => useDispatch();
const useAppSelector = useSelector;
function getPreloadedState$1() {
  const state = typeof globalThis.window === "undefined" ? {} : window.__PRELOADED_STATE__ ?? {};
  return {
    ...state,
    banners: getPreloadedBannersState([]),
    activeCart: initializeActiveCartState(),
    customerList: getPreloadCustomerState(),
    [invoiceListSlice.reducerPath]: getInvoiceListInitialState(),
    [userProfileSlice.reducerPath]: initialUserState()
  };
}
const loadCustomerList = createAsyncThunk(
  "customers/list/load",
  async (arg) => {
    return await fetchCustomerList(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return selectLoggedIn(state) && !!arg?.isRepAccount && ["idle", "fulfilled"].includes(selectCustomersStatus(state));
    }
  }
);
const initialState$3 = {
  customerKey: null,
  account: null,
  status: "idle",
  loaded: false,
  returnToPath: null
};
const currentCustomerSlice = createSlice({
  name: "currentCustomer",
  initialState: initialState$3,
  reducers: {
    setReturnToPath: (state, action) => {
      state.returnToPath = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setCustomerAccount.fulfilled, (state, action) => {
      const customerKey2 = customerSlug(action.payload.customer);
      if (state.customerKey !== customerKey2) {
        state.customerKey = customerKey2;
      }
      if (action.payload) {
        state.account = { ...emptyCustomer, ...action.payload.customer };
      }
    }).addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        resetCustomerState(state);
      }
    }).addCase(saveBillingAddress.pending, (state) => {
      state.status = "saving";
    }).addCase(saveBillingAddress.fulfilled, (state, action) => {
      state.status = "idle";
      state.account = action.payload?.customer ?? null;
      state.loaded = true;
    }).addCase(saveBillingAddress.rejected, (state) => {
      state.status = "rejected";
    }).addCase(saveShipToAddress.pending, (state) => {
      state.status = "saving";
    }).addCase(saveShipToAddress.fulfilled, (state, action) => {
      state.status = "idle";
      state.account = action.payload?.customer ?? null;
      state.loaded = true;
    }).addCase(saveShipToAddress.rejected, (state) => {
      state.status = "rejected";
    }).addCase(setDefaultShipTo.pending, (state) => {
      state.status = "saving";
    }).addCase(setDefaultShipTo.fulfilled, (state) => {
      state.status = "idle";
    }).addCase(setDefaultShipTo.rejected, (state) => {
      state.status = "rejected";
    }).addCase(loadCustomer.pending, (state, action) => {
      state.status = "loading";
      const customerKey2 = customerSlug(action.meta.arg);
      if (state.customerKey !== customerKey2) {
        resetCustomerState(state);
        state.customerKey = customerKey2;
      }
    }).addCase(loadCustomer.fulfilled, (state, action) => {
      state.status = "idle";
      state.account = action.payload?.customer ?? null;
      state.loaded = true;
    }).addCase(loadCustomer.rejected, (state) => {
      state.status = "rejected";
    }).addCase(dismissContextAlert, (state, action) => {
      if ([saveBillingAddress.typePrefix, saveShipToAddress.typePrefix, loadCustomer.typePrefix].includes(action.payload)) {
        state.status = "idle";
      }
    }).addCase(setUserAccess.pending, (state, action) => {
      const customerKey2 = customerSlug(action.meta.arg);
      if (!action.meta.arg?.isRepAccount && state.customerKey !== customerKey2) {
        resetCustomerState(state);
      }
    }).addCase(loadCustomerList.fulfilled, (state, action) => {
      if (state.customerKey) {
        const customer = action.payload.find((customer2) => customerSlug(customer2) === state.customerKey);
        state.customerKey = customer ? customerSlug(customer) : null;
        state.account = customer ? { ...emptyCustomer, ...customer } : null;
        state.loaded = !!customer;
      }
    });
  },
  selectors: {
    selectCustomerKey: (state) => state.customerKey,
    selectCustomerAccount: (state) => state.account,
    selectCustomerLoadStatus: (state) => state.status,
    selectCustomerLoaded: (state) => state.loaded,
    selectCustomerReturnToPath: (state) => state.returnToPath
  }
});
const { setReturnToPath: setReturnToPath$1 } = currentCustomerSlice.actions;
const {
  selectCustomerKey,
  selectCustomerAccount,
  selectCustomerLoadStatus,
  selectCustomerLoaded,
  selectCustomerReturnToPath
} = currentCustomerSlice.selectors;
function resetCustomerState(state) {
  state.customerKey = null;
  state.account = null;
  state.status = "idle";
  state.loaded = false;
  state.returnToPath = null;
}
async function fetchCustomerAccount({ ARDivisionNo, CustomerNo }) {
  try {
    const url = "/api/sales/b2b/account/:customerSlug/customer.json".replace(":customerSlug", customerSlug({ ARDivisionNo, CustomerNo }));
    const response = await fetchJSON(url, { cache: "no-cache" });
    if (!response?.result || !response.result.customer || !response.result.customer.CustomerNo) {
      return Promise.reject(new Error("Invalid response when loading customer account"));
    }
    response.result.permissions = await fetchCustomerValidation({ ARDivisionNo, CustomerNo });
    return response.result;
  } catch (err) {
    if (err instanceof Error) {
      console.debug(fetchCustomerAccount.name, err.message);
      return Promise.reject(err);
    }
    console.debug(fetchCustomerAccount.name, err);
    return Promise.reject(new Error(`Error in ${fetchCustomerAccount.name}`));
  }
}
async function fetchCustomerUsers(customerKey2) {
  try {
    const url = "/api/user/v2/b2b/:customerKey/users.json".replace(":customerKey", encodeURIComponent(customerKey2));
    const response = await fetchJSON(url, { cache: "no-cache" });
    return response?.users ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug(fetchCustomerUsers.name, err.message);
      return Promise.reject(err);
    }
    console.debug(fetchCustomerUsers.name, err);
    return Promise.reject(new Error(`Error in ${fetchCustomerUsers.name}`));
  }
}
async function postAddCustomerUserLocation(arg, customerKey2) {
  try {
    if (!arg.shipToCode?.[0]) {
      return Promise.reject(new Error("Invalid Ship-To code"));
    }
    const url = "/api/user/v2/b2b/:customerKey/users.json".replace(":customerKey", customerKey2);
    const method = "POST";
    const body = JSON.stringify(arg);
    const response = await fetchJSON(url, { method, body });
    return response?.users ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postAddCustomerUserLocation()", err.message);
      return Promise.reject(err);
    }
    console.debug("postAddCustomerUserLocation()", err);
    return Promise.reject(new Error("Error in postAddCustomerUserLocation()"));
  }
}
async function postCustomerUser(arg, customerKey2) {
  try {
    if (arg.id && arg.shipToCode?.length === 1) {
      return await postAddCustomerUserLocation(arg, customerKey2);
    }
    const urlBase = arg.id ? "/api/user/v2/b2b/:customerKey/users/:id.json" : "/api/user/v2/b2b/:customerKey/users.json";
    const _customerKey = customerKey2 + (arg.shipToCode?.length ? `-${arg.shipToCode[0]}` : "");
    const url = urlBase.replace(":customerKey", encodeURIComponent(_customerKey)).replace(":id", encodeURIComponent(arg.id));
    const method = arg.id ? "PUT" : "POST";
    const body = JSON.stringify(arg);
    const response = await fetchJSON(url, { method, body });
    return response?.users ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postCustomerUser()", err.message);
      return Promise.reject(err);
    }
    console.debug("postCustomerUser()", err);
    return Promise.reject(new Error("Error in postCustomerUser()"));
  }
}
async function deleteCustomerUser(arg, customer) {
  try {
    const customerKey2 = `${customer.ARDivisionNo}-${customer.CustomerNo}`;
    const url = "/api/user/v2/b2b/:customerKey/users/:id.json".replace(":customerKey", encodeURIComponent(customerKey2)).replace(":id", encodeURIComponent(arg.id));
    const response = await fetchJSON(url, { method: "delete" });
    return response?.users ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("deleteCustomerUser()", err.message);
      return Promise.reject(err);
    }
    console.debug("deleteCustomerUser()", err);
    return Promise.reject(new Error("Error in deleteCustomerUser()"));
  }
}
async function postBillingAddress(arg) {
  try {
    const {
      ARDivisionNo,
      CustomerNo,
      CustomerName,
      AddressLine1,
      AddressLine2,
      AddressLine3,
      City,
      State,
      ZipCode,
      CountryCode,
      EmailAddress,
      Reseller,
      TelephoneNo,
      TelephoneExt
    } = arg;
    const params = new URLSearchParams();
    params.set("co", sageCompanyCode("CHI"));
    params.set("account", `${ARDivisionNo}-${CustomerNo}`);
    const body = JSON.stringify({
      Name: CustomerName,
      AddressLine1,
      AddressLine2,
      AddressLine3,
      City,
      State,
      ZipCode,
      CountryCode,
      EmailAddress,
      Reseller,
      TelephoneNo,
      TelephoneExt
    });
    const url = `/sage/b2b/billto.php?${params.toString()}`;
    await fetchJSON(url, { method: "POST", body });
    return await fetchCustomerAccount(arg);
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postBillingAddress()", err.message);
      return Promise.reject(err);
    }
    console.debug("postBillingAddress()", err);
    return Promise.reject(new Error("Error in postBillingAddress()"));
  }
}
async function postShipToAddress(arg) {
  try {
    const {
      ARDivisionNo,
      CustomerNo,
      ShipToCode,
      ShipToName,
      ShipToAddress1,
      ShipToAddress2 = "",
      ShipToAddress3 = "",
      ShipToCity,
      ShipToState,
      ShipToZipCode,
      ShipToCountryCode,
      TelephoneNo,
      TelephoneExt = "",
      EmailAddress,
      ContactCode = "",
      Reseller = "N"
    } = arg;
    const params = new URLSearchParams({ co: "CHI", account: `${ARDivisionNo}-${CustomerNo}-${ShipToCode}` });
    const url = `/sage/b2b/shipto.php?${params.toString()}`;
    const body = JSON.stringify({
      Name: ShipToName,
      AddressLine1: ShipToAddress1,
      AddressLine2: ShipToAddress2,
      AddressLine3: ShipToAddress3,
      City: ShipToCity,
      State: ShipToState,
      ZipCode: ShipToZipCode,
      CountryCode: ShipToCountryCode,
      EmailAddress,
      TelephoneNo,
      TelephoneExt,
      Reseller,
      ContactCode
    });
    await fetchJSON(url, { method: "POST", body });
    return await fetchCustomerAccount(arg);
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postShipToAddress()", err.message);
      return Promise.reject(err);
    }
    console.debug("postShipToAddress()", err);
    return Promise.reject(new Error("Error in postShipToAddress()"));
  }
}
async function postDefaultShipToCode(arg, customer) {
  try {
    const { ARDivisionNo, CustomerNo } = customer;
    const url = "/sage/b2b/set-primary-shipto.php?co=CHI";
    const body = JSON.stringify({ Company: "chums", account: `${ARDivisionNo}-${CustomerNo}:${arg}` });
    await fetchJSON(url, { method: "POST", body });
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postDefaultShipToCode()", err.message);
      return Promise.reject(err);
    }
    console.debug("postDefaultShipToCode()", err);
    return Promise.reject(new Error("Error in postDefaultShipToCode()"));
  }
}
async function fetchCustomerValidation({ ARDivisionNo, CustomerNo }) {
  try {
    const customerKey2 = `${encodeURIComponent(ARDivisionNo)}-${encodeURIComponent(CustomerNo)}`;
    const url = `/api/user/v2/b2b/validate/customer/:customerKey.json`.replace(":customerKey", customerKey2);
    const response = await fetchJSON(url, { cache: "no-cache" });
    return response ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchCustomerValidation()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchCustomerValidation()", err);
    return Promise.reject(new Error("Error in fetchCustomerValidation()"));
  }
}
async function fetchSalesOrder({ customerKey: customerKey2, salesOrderNo }) {
  try {
    const url = "/api/sales/b2b/account/:customerKey/orders/open/:salesOrderNo.json".replace(":customerKey", encodeURIComponent(customerKey2)).replace(":salesOrderNo", encodeURIComponent(salesOrderNo));
    const response = await fetchJSON(url, { cache: "no-cache" });
    return response?.salesOrder ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchSalesOrder()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchSalesOrder()", err);
    return Promise.reject(new Error("Error in fetchSalesOrder()"));
  }
}
async function fetchOpenSalesOrders({ customerKey: customerKey2 }) {
  try {
    const url = "/api/sales/b2b/account/:customerKey/orders/open.json".replace(":customerKey", encodeURIComponent(customerKey2));
    const res = await fetchJSON(url, { cache: "no-cache" });
    return res?.list ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchOpenSalesOrders()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchOpenSalesOrders()", err);
    return Promise.reject(new Error("Error in fetchOpenSalesOrders()"));
  }
}
const defaultDetailSorter = (a, b) => {
  return +a.LineKey - +b.LineKey;
};
const salesOrderSorter = (sort) => (a, b) => {
  const sortMod = sort.ascending ? 1 : -1;
  switch (sort.field) {
    case "CustomerPONo":
    case "ShipToName":
    case "ShipToCity":
      return ((a[sort.field] ?? "").toLowerCase() === (b[sort.field] ?? "").toLowerCase() ? a.SalesOrderNo > b.SalesOrderNo ? 1 : -1 : (a[sort.field] ?? "").toLowerCase() > (b[sort.field] ?? "").toLowerCase() ? 1 : -1) * sortMod;
    case "TaxableAmt":
      return (+(a[sort.field] ?? 0) === +(b[sort.field] ?? 0) ? a.SalesOrderNo > b.SalesOrderNo ? 1 : -1 : +(a[sort.field] ?? 0) > +(b[sort.field] ?? 0) ? 1 : -1) * sortMod;
    case "OrderDate":
    case "ShipExpireDate":
      return (dayjs(a[sort.field] ?? null).valueOf() === dayjs(b[sort.field] ?? null).valueOf() ? a.SalesOrderNo > b.SalesOrderNo ? 1 : -1 : dayjs(a[sort.field] ?? null).valueOf() > dayjs(b[sort.field] ?? 0).valueOf() ? 1 : -1) * sortMod;
    default:
      return (a.SalesOrderNo > b.SalesOrderNo ? 1 : -1) * sortMod;
  }
};
const detailToCartItem = (line) => {
  if (line.InactiveItem !== "N" || line.ProductType === "D") {
    return null;
  }
  return {
    itemCode: line.ItemCode,
    quantity: +line.QuantityOrdered || 1,
    comment: line.CommentText
  };
};
const isClosedSalesOrder = (so) => {
  if (!so) {
    return false;
  }
  return so.OrderStatus === "C";
};
const detailSequenceSorter = (a, b) => {
  return +a.LineSeqNo === +b.LineSeqNo ? defaultDetailSorter(a, b) : +a.LineSeqNo - +b.LineSeqNo;
};
const adapter$7 = createEntityAdapter({
  selectId: (arg) => arg.SalesOrderNo,
  sortComparer: (a, b) => a.SalesOrderNo.localeCompare(b.SalesOrderNo)
});
const selectors$7 = adapter$7.getSelectors();
const extraState$8 = {
  customerKey: null,
  status: "idle",
  loaded: false,
  sort: { field: "SalesOrderNo", ascending: true },
  filter: ""
};
const openOrdersSlice = createSlice({
  name: "open-orders",
  initialState: adapter$7.getInitialState(extraState$8),
  reducers: {
    setSalesOrderSort: (state, action) => {
      state.sort = action.payload;
    },
    setOpenOrdersFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        resetOrdersState(state);
      }
    }).addCase(setUserAccess.pending, (state, action) => {
      const customerKey2 = customerSlug(action?.meta?.arg);
      if (!action.meta.arg?.isRepAccount && state.customerKey !== customerKey2) {
        resetOrdersState(state, customerKey2);
      }
    }).addCase(setCustomerAccount.fulfilled, (state, action) => {
      const customerKey2 = customerSlug(action.payload.customer);
      if (state.customerKey !== customerKey2) {
        resetOrdersState(state, customerKey2);
      }
    }).addCase(loadCustomer.pending, (state, action) => {
      const customerKey2 = customerSlug(action.meta.arg);
      if (state.customerKey !== customerKey2) {
        resetOrdersState(state, customerKey2);
      }
    }).addCase(loadOpenOrders.pending, (state) => {
      state.status = "loading";
    }).addCase(loadOpenOrders.fulfilled, (state, action) => {
      state.status = "idle";
      state.loaded = true;
      adapter$7.setAll(state, action.payload);
    }).addCase(loadOpenOrders.rejected, (state) => {
      state.status = "rejected";
    }).addCase(dismissContextAlert, (state, action) => {
      if (action.payload.startsWith(loadOpenOrders.typePrefix)) {
        state.status === "idle";
      }
    }).addCase(loadSalesOrder.fulfilled, (state, action) => {
      if (action.payload) {
        adapter$7.setOne(state, action.payload);
      }
    });
  },
  selectors: {
    selectOpenOrdersCustomerKey: (state) => state.customerKey,
    selectOpenOrders: (state) => selectors$7.selectAll(state),
    selectOpenOrdersStatus: (state) => state.status,
    selectOpenOrdersLoaded: (state) => state.loaded,
    selectOpenOrdersSort: (state) => state.sort,
    selectOpenOrdersFilter: (state) => state.filter,
    selectOpenOrdersLength: (state) => selectors$7.selectTotal(state),
    selectOpenOrderById: (state, id) => selectors$7.selectById(state, id) ?? null
  }
});
const { setSalesOrderSort, setOpenOrdersFilter } = openOrdersSlice.actions;
const {
  selectOpenOrdersCustomerKey,
  selectOpenOrders,
  selectOpenOrdersStatus,
  selectOpenOrdersLoaded,
  selectOpenOrdersSort,
  selectOpenOrdersFilter,
  selectOpenOrdersLength,
  selectOpenOrderById
} = openOrdersSlice.selectors;
const selectOpenOrdersList = createSelector(
  [selectOpenOrders, selectOpenOrdersFilter, selectOpenOrdersSort],
  (list, filter, sort) => {
    return Object.values(list).filter((so) => so.OrderType !== "Q" && so.OrderStatus !== "C").filter((so) => !filter || so.SalesOrderNo.includes(filter) || so.CustomerPONo?.includes(filter)).sort(salesOrderSorter(sort));
  }
);
function resetOrdersState(state, customerKey2 = null) {
  adapter$7.removeAll(state);
  state.loaded = false;
  state.filter = "";
  state.customerKey = customerKey2;
}
const adapter$6 = createEntityAdapter({
  selectId: (arg) => arg.LineKey,
  sortComparer: (a, b) => a.LineKey.localeCompare(b.LineKey)
});
const selectors$6 = adapter$6.getSelectors();
const extraState$7 = {
  customerKey: null,
  salesOrderNo: null,
  header: null,
  invoices: [],
  status: "idle"
};
const currentOrderSlice = createSlice({
  name: "openOrder",
  initialState: adapter$6.getInitialState(extraState$7),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadSalesOrder.pending, (state, action) => {
      state.status = "loading";
      if (action.meta.arg !== state.salesOrderNo) {
        adapter$6.removeAll(state);
        state.salesOrderNo = action.meta.arg;
        state.header = null;
        state.invoices = [];
      }
    }).addCase(loadSalesOrder.fulfilled, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        const { detail, invoices, ...rest } = action.payload;
        state.header = rest;
      }
      state.invoices = action.payload?.invoices ?? [];
      adapter$6.setAll(state, action.payload?.detail ?? []);
    }).addCase(loadSalesOrder.rejected, (state) => {
      state.status = "rejected";
      adapter$6.removeAll(state);
    }).addCase(dismissContextAlert, (state, action) => {
      if (action.payload?.startsWith(loadSalesOrder.typePrefix)) {
        state.status = "idle";
      }
    }).addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        adapter$6.removeAll(state);
        state.customerKey = null;
        state.salesOrderNo = null;
        state.header = null;
        state.invoices = [];
      }
    }).addCase(setUserAccess.pending, (state, action) => {
      const customerKey2 = customerSlug(action?.meta?.arg);
      if (!action.meta.arg?.isRepAccount && state.customerKey !== customerKey2) {
        adapter$6.removeAll(state);
        state.customerKey = customerKey2;
        state.salesOrderNo = null;
        state.header = null;
        state.invoices = [];
      }
    }).addCase(setCustomerAccount.fulfilled, (state, action) => {
      const customerKey2 = customerSlug(action.payload.customer);
      if (state.customerKey !== customerKey2) {
        adapter$6.removeAll(state);
        state.customerKey = customerKey2;
        state.salesOrderNo = null;
        state.header = null;
        state.invoices = [];
      }
    }).addCase(loadCustomer.pending, (state, action) => {
      const customerKey2 = customerSlug(action.meta.arg);
      if (state.customerKey !== customerKey2) {
        adapter$6.removeAll(state);
        state.customerKey = customerKey2;
        state.salesOrderNo = null;
        state.header = null;
        state.invoices = [];
      }
    }).addCase(loadOpenOrders.fulfilled, (state, action) => {
      const so = action.payload.find((so2) => so2.SalesOrderNo === state.salesOrderNo);
      state.header = so ?? null;
      if (!so) {
        adapter$6.removeAll(state);
        state.invoices = [];
        state.salesOrderNo = null;
      }
    });
  },
  selectors: {
    selectAll: (state) => selectors$6.selectAll(state),
    selectSalesOrderHeader: (state) => state.header,
    selectInvoices: (state) => state.invoices,
    selectSalesOrderStatus: (state) => state.status
  }
});
const {
  selectAll: selectAll$3,
  selectInvoices,
  selectSalesOrderHeader,
  selectSalesOrderStatus
} = currentOrderSlice.selectors;
const selectSalesOrderDetail = createSelector(
  [selectAll$3],
  (detail) => {
    return [...detail].sort(detailSequenceSorter);
  }
);
const selectSalesOrderInvoices = createSelector(
  [selectInvoices],
  (invoices) => {
    return [...invoices].sort();
  }
);
const loadOpenOrders = createAsyncThunk(
  "open-orders/load",
  async (arg) => {
    return await fetchOpenSalesOrders({ customerKey: arg });
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg && selectOpenOrdersStatus(state) === "idle";
    }
  }
);
const loadSalesOrder = createAsyncThunk(
  "open-orders/loadSalesOrder",
  async (arg, { getState }) => {
    const state = getState();
    const customer = selectCustomerKey(state);
    const customerKey2 = billToCustomerSlug(customer);
    return await fetchSalesOrder({ customerKey: customerKey2, salesOrderNo: arg });
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      const customer = selectCustomerKey(state);
      const actionStatus = selectSalesOrderStatus(state);
      return !!arg && !!customer && actionStatus === "idle";
    }
  }
);
const adapter$5 = createEntityAdapter({
  selectId: (arg) => customerSlug(arg),
  sortComparer: (a, b) => customerSlug(a).localeCompare(customerSlug(b))
});
const selectors$5 = adapter$5.getSelectors();
const isLoggedIn = auth.loggedIn();
const recentCustomers = isLoggedIn ? LocalStore.getItem(STORE_RECENT_ACCOUNTS, []) : [];
const recentCustomersSlice = createSlice({
  name: "recentCustomers",
  initialState: adapter$5.getInitialState(void 0, recentCustomers),
  reducers: {
    clearRecentCustomers: (state) => {
      adapter$5.removeAll(state);
      LocalStore.removeItem(STORE_RECENT_ACCOUNTS);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        adapter$5.removeAll(state);
      } else {
        adapter$5.setAll(state, action.payload.recentCustomers ?? []);
      }
    }).addCase(signInWithGoogle.fulfilled, (state, action) => {
      adapter$5.setAll(state, action.payload.recentCustomers ?? []);
    }).addCase(setCustomerAccount.fulfilled, (state, action) => {
      adapter$5.setAll(state, action.payload.recent);
    }).addCase(loadCustomer.fulfilled, (state, action) => {
      adapter$5.setAll(state, action.payload?.recent ?? []);
    });
  },
  selectors: {
    selectAll: (state) => selectors$5.selectAll(state)
  }
});
const { selectAll: selectAll$2 } = recentCustomersSlice.selectors;
const { clearRecentCustomers } = recentCustomersSlice.actions;
const selectRecentCustomers = createSelector(
  [selectAll$2],
  (customers) => {
    return [...customers].sort((c) => c.ts).reverse();
  }
);
async function fetchCarts(arg) {
  try {
    const url = `/api/carts/:customerSlug.json`.replace(":customerSlug", encodeURIComponent(arg));
    const res = await fetchJSON(url, { cache: "no-cache" });
    return res?.carts ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchCarts()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchCarts()", err);
    return Promise.reject(new Error("Error in fetchCarts()"));
  }
}
async function fetchCart(arg) {
  try {
    const url = "/api/carts/:customerKey/:cartId.json".replace(":customerKey", encodeURIComponent(arg.customerKey)).replace(":cartId", encodeURIComponent(arg.cartId));
    const res = await fetchJSON(url, { cache: "no-cache" });
    return res?.cart ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchCart()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchCart()", err);
    return Promise.reject(new Error("Error in fetchCart()"));
  }
}
async function putCart(arg) {
  try {
    const url = "/api/carts/:customerKey/:cartId.json".replace(":customerKey", encodeURIComponent(arg.customerKey)).replace(":cartId", encodeURIComponent(arg.cartId));
    const res = await fetchJSON(url, { method: "PUT", body: JSON.stringify(arg.body) });
    return res?.cart ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("putCart()", err.message);
      return Promise.reject(err);
    }
    console.debug("putCart()", err);
    return Promise.reject(new Error("Error in putCart()"));
  }
}
async function postAddToCart(arg) {
  try {
    const url = "/api/carts/:customerKey/:cartId/cart.json".replace(":customerKey", encodeURIComponent(arg.customerKey)).replace(":cartId", encodeURIComponent(arg.cartId ?? "new"));
    const body = { ...arg.item };
    if (!arg.cartId) {
      body.customerPONo = arg.cartName;
      body.shipToCode = arg.shipToCode;
    }
    const res = await fetchJSON(url, { method: "POST", body: JSON.stringify(body) });
    return res?.cart ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postAddToCart()", err.message);
      return Promise.reject(err);
    }
    console.debug("postAddToCart()", err);
    return Promise.reject(new Error("Error in postAddToCart()"));
  }
}
async function putUpdateCartItem(arg) {
  try {
    const url = "/api/carts/:customerKey/:cartId/:cartItemId.json".replace(":customerKey", encodeURIComponent(arg.customerKey)).replace(":cartId", encodeURIComponent(arg.cartId)).replace(":cartItemId", encodeURIComponent(arg.cartItemId));
    const res = await fetchJSON(url, { method: "PUT", body: JSON.stringify(arg.item) });
    return res?.cart ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("putUpdateCartItem()", err.message);
      return Promise.reject(err);
    }
    console.debug("putUpdateCartItem()", err);
    return Promise.reject(new Error("Error in putUpdateCartItem()"));
  }
}
async function putUpdateCartItems(arg) {
  try {
    const url = "/api/carts/:customerKey/:cartId/items.json".replace(":customerKey", encodeURIComponent(arg.customerKey)).replace(":cartId", encodeURIComponent(arg.cartId));
    const body = JSON.stringify({ items: arg.items });
    const res = await fetchJSON(url, { method: "PUT", body });
    return res?.cart ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("putUpdateCartItem()", err.message);
      return Promise.reject(err);
    }
    console.debug("putUpdateCartItem()", err);
    return Promise.reject(new Error("Error in putUpdateCartItem()"));
  }
}
async function deleteCartItem(arg) {
  try {
    const url = "/api/carts/:customerKey/:cartId/:cartItemId.json".replace(":customerKey", encodeURIComponent(arg.customerKey)).replace(":cartId", encodeURIComponent(arg.cartId)).replace(":cartItemId", encodeURIComponent(arg.cartItemId));
    const res = await fetchJSON(url, { method: "DELETE" });
    return res?.cart ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("deleteCartItem()", err.message);
      return Promise.reject(err);
    }
    console.debug("deleteCartItem()", err);
    return Promise.reject(new Error("Error in deleteCartItem()"));
  }
}
async function deleteCart(arg) {
  try {
    if (arg.salesOrderNo) {
      const params = new URLSearchParams();
      params.set("cartId", arg.cartId.toString());
      params.set("salesOrderNo", arg.salesOrderNo);
      const url2 = `/sage/b2b/cart-sync/delete-cart.php?${params.toString()}`;
      await fetchJSON(url2, { method: "DELETE" }, allowErrorResponseHandler);
      console.log("removed sage quote", arg.salesOrderNo);
    }
    const url = "/api/carts/:customerKey/:cartId.json".replace(":customerKey", encodeURIComponent(arg.customerKey)).replace(":cartId", encodeURIComponent(arg.cartId));
    const res = await fetchJSON(url, { method: "DELETE" });
    return res?.carts ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("deleteCart()", err.message);
      return Promise.reject(err);
    }
    console.debug("deleteCart()", err);
    return Promise.reject(new Error("Error in deleteCart()"));
  }
}
async function postCartEmail(arg) {
  try {
    const url = "/api/carts/:customerKey/:cartId/email.json".replace(":customerKey", encodeURIComponent(arg.customerKey)).replace(":cartId", encodeURIComponent(arg.cartId));
    const res = await fetchJSON(url, { method: "POST" });
    return res?.result ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postCartEmail()", err.message);
      return Promise.reject(err);
    }
    console.debug("postCartEmail()", err);
    return Promise.reject(new Error("Error in postCartEmail()"));
  }
}
async function postProcessCart(arg) {
  try {
    const params = new URLSearchParams();
    params.set("cartId", arg.cartId.toString());
    if (window.location.hostname === "localhost") {
      params.set("debug", "1");
    }
    const body = JSON.stringify(arg);
    const url = `/sage/b2b/cart-sync/sync-to-sage.php?${params.toString()}`;
    const res = await fetchJSON(url, { method: "POST", body });
    return res?.salesOrderNo ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postProcessCart()", err.message);
      return Promise.reject(err);
    }
    console.debug("postProcessCart()", err);
    return Promise.reject(new Error("Error in postProcessCart()"));
  }
}
async function postDuplicateSalesOrder(arg) {
  try {
    const { customerKey: customerKey2, salesOrderNo, ...body } = arg;
    const url = "/api/carts/:customerKey/duplicate/:salesOrderNo.json".replace(":customerKey", encodeURIComponent(customerKey2)).replace(":salesOrderNo", encodeURIComponent(salesOrderNo));
    const res = await fetchJSON(url, { method: "POST", body: JSON.stringify(body) });
    return res?.cart ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postDuplicateSalesOrder()", err.message);
      return Promise.reject(err);
    }
    console.debug("postDuplicateSalesOrder()", err);
    return Promise.reject(new Error("Error in postDuplicateSalesOrder()"));
  }
}
async function fetchNextShipDate() {
  try {
    const url = "/api/carts/next-ship-date.json";
    const res = await fetchJSON(url, { method: "GET", cache: "no-cache" });
    return res?.nextShipDate ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchNextShipDate()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchNextShipDate()", err);
    return Promise.reject(new Error("Error in fetchNextShipDate()"));
  }
}
const statusAdapter$1 = createEntityAdapter({
  selectId: (arg) => arg.key,
  sortComparer: (a, b) => a.key - b.key
});
const adapterSelectors$4 = statusAdapter$1.getSelectors();
const initialState$2 = {
  global: "idle"
};
const cartStatusSlice$1 = createSlice({
  name: "cartsStatus",
  initialState: statusAdapter$1.getInitialState(initialState$2),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId ?? 0, status: "saving" });
    }).addCase(addToCart.fulfilled, (state, action) => {
      statusAdapter$1.removeOne(state, 0);
      if (action.payload) {
        statusAdapter$1.setOne(state, { key: action.payload.header.id, status: "idle" });
      }
    }).addCase(addToCart.rejected, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId ?? 0, status: "idle" });
    }).addCase(loadCart.pending, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId, status: "loading" });
    }).addCase(loadCart.fulfilled, (state, action) => {
      if (!action.payload) {
        statusAdapter$1.removeOne(state, action.meta.arg.cartId);
        return;
      }
      statusAdapter$1.setOne(state, { key: action.payload.header.id, status: "idle" });
    }).addCase(loadCart.rejected, (state, action) => {
      if (action.error && action.error.message?.toLowerCase() === "not found") {
        statusAdapter$1.removeOne(state, action.meta.arg.cartId);
        return;
      }
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId, status: "idle" });
    }).addCase(loadCarts.pending, (state) => {
      state.global = "loading";
    }).addCase(loadCarts.fulfilled, (state, action) => {
      state.global = "idle";
      statusAdapter$1.setAll(state, action.payload.map((cart) => ({ key: cart.header.id, status: "idle" })));
    }).addCase(loadCarts.rejected, (state) => {
      state.global = "rejected";
    }).addCase(saveCart.pending, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId, status: "saving" });
    }).addCase(saveCart.fulfilled, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId, status: "idle" });
    }).addCase(saveCart.rejected, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId, status: "idle" });
    }).addCase(saveCartItem.pending, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId, status: "saving" });
    }).addCase(saveCartItem.fulfilled, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId, status: "idle" });
    }).addCase(saveCartItem.rejected, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId, status: "idle" });
    }).addCase(processCart.pending, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.id, status: "saving" });
    }).addCase(processCart.fulfilled, (state, action) => {
      if (action.payload) {
        statusAdapter$1.removeOne(state, action.meta.arg.id);
        return;
      }
      statusAdapter$1.setOne(state, { key: action.meta.arg.id, status: "idle" });
    }).addCase(duplicateSalesOrder.pending, (state) => {
      statusAdapter$1.setOne(state, { key: 0, status: "saving" });
    }).addCase(duplicateSalesOrder.fulfilled, (state, action) => {
      statusAdapter$1.removeOne(state, 0);
      if (action.payload) {
        statusAdapter$1.addOne(state, { key: action.payload.header.id, status: "idle" });
      }
    }).addCase(duplicateSalesOrder.rejected, (state) => {
      statusAdapter$1.removeOne(state, 0);
    }).addCase(dismissContextAlert, (state, action) => {
      switch (action.payload) {
        case loadCarts.typePrefix:
          state.global = "idle";
      }
    }).addCase(sendCartEmail.pending, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId, status: "sending" });
    }).addCase(sendCartEmail.fulfilled, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId, status: "idle" });
    }).addCase(sendCartEmail.rejected, (state, action) => {
      statusAdapter$1.setOne(state, { key: action.meta.arg.cartId, status: "idle" });
    });
  },
  selectors: {
    selectCartsStatus: (state) => state.global,
    selectCartStatusById: (state, cartId) => adapterSelectors$4.selectById(state, cartId)?.status ?? "idle"
  }
});
const { selectCartStatusById, selectCartsStatus } = cartStatusSlice$1.selectors;
const detailAdapter = createEntityAdapter({
  selectId: (arg) => arg.id,
  sortComparer: (a, b) => a.id === b.id ? 1 : a.id
});
const adapterSelectors$3 = detailAdapter.getSelectors();
const extraState$6 = {
  customerKey: null,
  sort: { field: "lineSeqNo", ascending: true }
};
const cartDetailSlice = createSlice({
  name: "cartsDetail",
  initialState: detailAdapter.getInitialState(extraState$6),
  reducers: {
    setCartDetailSort: (state, action) => {
      state.sort = action.payload;
    },
    setCartItem: (state, action) => {
      const { id, ...changes } = action.payload;
      detailAdapter.updateOne(state, { id, changes: { ...changes, changed: true } });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      if (action.payload) {
        const list = adapterSelectors$3.selectAll(state).filter((row) => row.cartHeaderId === action.payload.header.id).map((row) => row.id);
        detailAdapter.removeMany(state, list);
        detailAdapter.addMany(state, action.payload.detail);
      }
    }).addCase(loadCart.fulfilled, (state, action) => {
      const list = adapterSelectors$3.selectAll(state).filter((row) => row.cartHeaderId === action.payload.header.id).map((row) => row.id);
      detailAdapter.removeMany(state, list);
      if (action.payload) {
        detailAdapter.addMany(state, action.payload.detail);
        return;
      }
    }).addCase(loadCart.rejected, (state, action) => {
      const list = adapterSelectors$3.selectAll(state).filter((row) => row.cartHeaderId === action.meta.arg.cartId).map((row) => row.id);
      detailAdapter.removeMany(state, list);
    }).addCase(loadCarts.pending, (state, action) => {
      if (state.customerKey !== action.meta.arg) {
        detailAdapter.removeAll(state);
        state.customerKey = action.meta.arg;
      }
    }).addCase(loadCarts.fulfilled, (state, action) => {
      const detail = [];
      action.payload.forEach((cart) => {
        detail.push(...cart.detail);
      });
      detailAdapter.setAll(state, detail);
    }).addCase(loadCustomer.pending, (state, action) => {
      if (state.customerKey !== customerSlug(action.meta.arg)) {
        detailAdapter.removeAll(state);
        state.customerKey = customerSlug(action.meta.arg);
      }
    }).addCase(duplicateSalesOrder.fulfilled, (state, action) => {
      if (action.payload) {
        detailAdapter.addMany(state, action.payload.detail);
      }
    }).addCase(saveCart.fulfilled, (state, action) => {
      if (action.payload) {
        const existing = adapterSelectors$3.selectAll(state).filter((row) => row.cartHeaderId === action.payload.header.id).map((row) => row.id);
        detailAdapter.removeMany(state, existing);
        detailAdapter.addMany(state, action.payload.detail);
      }
    }).addCase(saveCartItem.fulfilled, (state, action) => {
      if (action.payload) {
        const existing = adapterSelectors$3.selectAll(state).filter((row) => row.cartHeaderId === action.payload.header.id).map((row) => row.id);
        detailAdapter.removeMany(state, existing);
        detailAdapter.addMany(state, action.payload.detail);
      }
    });
  },
  selectors: {
    selectAll: (state) => adapterSelectors$3.selectAll(state),
    selectCartItemById: (state, id) => adapterSelectors$3.selectById(state, id),
    selectCartDetailSort: (state) => state.sort,
    selectCartItemStatus: (state, id) => adapterSelectors$3.selectById(state, id).lineStatus ?? "idle"
  }
});
const {
  selectCartDetailSort,
  selectAll: selectAll$1,
  selectCartItemById,
  selectCartItemStatus
} = cartDetailSlice.selectors;
const selectByCartId = createSelector(
  [selectAll$1, (_, cartId) => cartId],
  (rows, cartId) => {
    return rows.filter((row) => row.cartHeaderId === cartId);
  }
);
const selectCartQtyByCartId = createSelector(
  [selectByCartId],
  (detail) => {
    return calcCartQty(detail);
  }
);
const selectCartHasChanges = createSelector(
  [selectByCartId],
  (detail) => {
    return detail.reduce((pv, cv) => (cv.changed ?? false) || pv, false);
  }
);
const selectCartDetailById = createSelector(
  [selectByCartId, selectCartDetailSort],
  (rows, sort) => {
    return [...rows].sort(cartDetailSorter(sort));
  }
);
createSelector(
  [selectByCartId],
  (detail) => {
    return detail.reduce((pv, cv) => (cv.cartProduct?.requiresCustomization ?? false) || pv, false);
  }
);
const { setCartDetailSort, setCartItem } = cartDetailSlice.actions;
const clearActiveCart = (state) => {
  state.cartId = null;
  state.promoCode = null;
  state.shippingAccount = LocalStore.getItem(STORE_CUSTOMER_SHIPPING_ACCOUNT, null);
  state.nextShipDate = null;
};
const activeCartSlice = createSlice({
  name: "activeCart",
  initialState: initializeActiveCartState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      if (action.meta.arg.setActiveCart && action.payload) {
        state.cartId = action.payload.header.id;
      }
    }).addCase(loadCart.pending, (state, action) => {
      if (action.meta.arg.setActiveCart) {
        state.cartId = action.meta.arg.cartId;
      }
    }).addCase(loadCarts.pending, (state, action) => {
      if (state.customerKey !== action.meta.arg) {
        state.customerKey = action.meta.arg;
        state.cartId = null;
      }
    }).addCase(loadCarts.fulfilled, (state, action) => {
      if (!state.cartId && action.payload.length) {
        state.cartId = action.payload[0].header.id;
      }
    }).addCase(loadCustomer.pending, (state, action) => {
      if (state.customerKey !== customerSlug(action.meta.arg)) {
        state.customerKey = customerSlug(action.meta.arg);
        state.cartId = null;
      }
    }).addCase(setActiveCartId, (state, action) => {
      state.cartId = action.payload;
    }).addCase(setCartShippingAccount, (state, action) => {
      state.shippingAccount = action.payload;
    }).addCase(processCart.fulfilled, (state, action) => {
      if (state.cartId === action.meta.arg.id) {
        clearActiveCart(state);
      }
    }).addCase(duplicateSalesOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.cartId = action.payload.header.id;
      }
    }).addCase(loadNextShipDate.fulfilled, (state, action) => {
      state.nextShipDate = action.payload;
    });
  },
  selectors: {
    selectActiveCartId: (state) => state.cartId ?? 0,
    selectCartPromoCode: (state) => state.promoCode,
    selectCartShippingAccount: (state) => state.shippingAccount,
    selectNextShipDate: (state) => state.nextShipDate
  }
});
const {
  selectActiveCartId,
  selectCartShippingAccount,
  selectCartPromoCode,
  selectNextShipDate
} = activeCartSlice.selectors;
const loadCarts = createAsyncThunk(
  "carts/loadCarts",
  async (arg) => {
    const carts = await fetchCarts(arg);
    const _cartId = LocalStore.getItem(STORE_CURRENT_CART, null);
    if (_cartId && !carts.filter((c) => c.header.id === _cartId).length) {
      LocalStore.removeItem(STORE_CURRENT_CART);
    }
    return carts;
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg && selectCartsStatus(state) === "idle";
    }
  }
);
const loadCart = createAsyncThunk(
  "carts/loadCart",
  async (arg) => {
    const cart = await fetchCart(arg);
    if (cart && arg.setActiveCart) {
      LocalStore.setItem(STORE_CURRENT_CART, cart.header.id);
    } else if (!cart) {
      const currentCart = LocalStore.getItem(STORE_CURRENT_CART, null);
      if (currentCart === arg.cartId) {
        LocalStore.removeItem(STORE_CURRENT_CART);
      }
    }
    return cart;
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return selectCartStatusById(state, arg.cartId) === "idle";
    }
  }
);
const saveCart = createAsyncThunk(
  "carts/saveCart",
  async (arg, { getState }) => {
    const state = getState();
    const detail = selectCartDetailById(state, arg.cartId);
    const items = detail.filter((line) => line.changed).map((line) => {
      return {
        id: line.id,
        quantityOrdered: line.quantityOrdered,
        commentText: line.commentText,
        itemType: line.itemType
      };
    });
    if (items.length > 0) {
      await putUpdateCartItems({ ...arg, items });
    }
    return await putCart(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg.cartId && selectCartStatusById(state, arg.cartId) === "idle";
    }
  }
);
const removeCart = createAsyncThunk(
  "carts/removeCart",
  async (arg) => {
    return await deleteCart(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg.cartId && selectCartStatusById(state, arg.cartId) === "idle";
    }
  }
);
const addToCart = createAsyncThunk(
  "carts/addToCart",
  async (arg) => {
    return await postAddToCart(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return (arg.item.itemType === "4" || +arg.item.quantityOrdered > 0) && (!arg.cartId || selectCartStatusById(state, arg.cartId) === "idle");
    }
  }
);
const saveCartItem = createAsyncThunk(
  "carts/saveCartItem",
  async (arg) => {
    if (arg.item.quantityOrdered === 0) {
      return await deleteCartItem(arg);
    }
    return await putUpdateCartItem(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg.cartId && !!arg.cartItemId && selectCartStatusById(state, arg.cartId) === "idle";
    }
  }
);
const sendCartEmail = createAsyncThunk(
  "carts/sendEmail",
  async (arg) => {
    return await postCartEmail(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return selectCartStatusById(state, arg.cartId) === "idle";
    }
  }
);
const setActiveCartId = createAction("activeCart/setActiveCartId", (arg) => {
  if (arg) {
    LocalStore.setItem(STORE_CURRENT_CART, arg);
  } else {
    LocalStore.removeItem(STORE_CURRENT_CART);
  }
  return {
    payload: arg
  };
});
const setCartShippingAccount = createAction("activeCart/setCartShippingAccount", (arg) => {
  if (canStorePreferences()) {
    LocalStore.setItem(STORE_CUSTOMER_SHIPPING_ACCOUNT, arg);
  }
  return {
    payload: arg
  };
});
const processCart = createAsyncThunk(
  "processCart",
  async (arg, { getState }) => {
    const state = getState();
    const shippingAccount = selectCartShippingAccount(state);
    const userType = selectUserType(state);
    const comment = [];
    if (shippingAccount?.enabled) {
      comment.push("RCP");
      comment.push(`${shippingAccount.value.trim()}`);
    }
    if (arg.CancelReasonCode?.toUpperCase() === "HOLD") {
      comment.push("HOLD");
    } else {
      comment.push("SWR");
    }
    const FOB = [`SLC`, userType?.toUpperCase()?.slice(0, 1) ?? ""].filter((str) => !!str).join("~");
    const body = {
      action: "promote",
      cartId: arg.id,
      cartName: arg.customerPONo,
      shipExpireDate: arg.shipExpireDate,
      shipToCode: arg.shipToCode ?? "",
      shipVia: arg.shipVia ?? "",
      paymentType: arg.PaymentType,
      comment: comment.join(" ~ "),
      promoCode: arg.promoCode ?? "",
      FOB
    };
    return await postProcessCart(body);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg.id && selectCartStatusById(state, arg.id) === "idle";
    }
  }
);
const duplicateSalesOrder = createAsyncThunk(
  "carts/duplicateSalesOrder",
  async (arg) => {
    return await postDuplicateSalesOrder(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg.salesOrderNo && selectCartStatusById(state, 0) === "idle";
    }
  }
);
const loadNextShipDate = createAsyncThunk(
  "carts/loadNextShipDate",
  async () => {
    return await fetchNextShipDate();
  }
);
const setReturnToPath = createAction("customer/setReturnTo");
const setShipToCode = createAction("customer/setShipToCode");
const saveUser = createAsyncThunk(
  "customer/saveUser",
  async (arg, { getState }) => {
    const state = getState();
    const customer = selectCustomerKey(state);
    return await postCustomerUser(arg, customer);
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return selectLoggedIn(state) && selectCustomerLoadStatus(state) === "idle" && !!selectCustomerAccount(state);
    }
  }
);
const removeUser = createAsyncThunk(
  "customer/removeUser",
  async (arg, { getState }) => {
    const state = getState();
    const customer = selectCustomerAccount(state);
    return await deleteCustomerUser(arg, customer);
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return selectLoggedIn(state) && selectCustomerLoadStatus(state) === "idle" && !!selectCustomerAccount(state);
    }
  }
);
const setCustomerAccount = createAsyncThunk(
  "customer/setCurrent",
  async (arg, { getState }) => {
    const state = getState();
    const recentAccounts = buildRecentCustomers(selectRecentCustomers(state), arg);
    if (canStorePreferences()) {
      LocalStore.setItem(STORE_RECENT_ACCOUNTS, recentAccounts);
    }
    return { customer: arg, recent: recentAccounts };
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      const customer = selectCustomerAccount(state);
      return selectLoggedIn(state) && (!customer || customerSlug(customer) !== customerSlug(arg));
    }
  }
);
const loadCustomer = createAsyncThunk(
  "customer/load",
  async (arg, { dispatch, getState }) => {
    const response = await fetchCustomerAccount(arg);
    const customerKey2 = billToCustomerSlug(response.customer);
    if (customerKey2) {
      dispatch(loadOpenOrders(customerKey2));
      dispatch(loadCarts(customerKey2));
    }
    const state = getState();
    response.recent = buildRecentCustomers(selectRecentCustomers(state), response.customer);
    if (canStorePreferences()) {
      LocalStore.setItem(STORE_RECENT_ACCOUNTS, response.recent);
    }
    const { ARDivisionNo, CustomerNo, CustomerName, ShipToCode } = response.customer;
    LocalStore.setItem(STORE_CUSTOMER, {
      ARDivisionNo,
      CustomerNo,
      CustomerName,
      ShipToCode
    });
    return response;
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return selectLoggedIn(state) && !!arg && selectCustomerLoadStatus(state) === "idle";
    }
  }
);
const saveBillingAddress = createAsyncThunk(
  "customer/saveBillingAddress",
  async (arg) => {
    return await postBillingAddress(arg);
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return selectLoggedIn(state) && selectCustomerLoadStatus(state) === "idle";
    }
  }
);
const saveShipToAddress = createAsyncThunk(
  "customer/saveShipToAddress",
  async (arg) => {
    return await postShipToAddress(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return selectLoggedIn(state) && !!arg.ShipToCode && arg.ShipToCode.length <= 4 && selectCustomerLoadStatus(state) === "idle";
    }
  }
);
const setDefaultShipTo = createAsyncThunk(
  "customer/setDefaultShipTo",
  async (arg, { getState }) => {
    const state = getState();
    const customer = selectCustomerAccount(state);
    await postDefaultShipToCode(arg, customer);
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return selectLoggedIn(state) && selectCustomerLoadStatus(state) === "idle";
    }
  }
);
const loadCustomerPermissions = createAsyncThunk(
  "customer/values/load",
  async (arg) => {
    return await fetchCustomerValidation(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return selectLoggedIn(state) && !!arg && selectCustomerPermissionsStatus(state) === "idle" && !!selectCustomerAccount(state);
    }
  }
);
const loadCustomerUsers = createAsyncThunk(
  "customer/users/load",
  async (_, { getState }) => {
    const state = getState();
    const customerKey2 = selectCustomerKey(state);
    return await fetchCustomerUsers(customerKey2);
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return selectLoggedIn(state) && selectCustomerLoadStatus(state) === "idle" && !!selectCustomerKey(state);
    }
  }
);
const AUTH_LOCAL = "AUTH_LOCAL";
const AUTH_GOOGLE = "AUTH_GOOGLE";
const USER_EXISTS = "USER_EXISTS";
const GOOGLE_CLIENT_ID = "949305513396-8tmadc840cuabrda5ucvs171be1ups1e.apps.googleusercontent.com";
async function postLocalLogin(arg) {
  try {
    const body = JSON.stringify(arg);
    const url = "/api/user/v2/b2b/login/local.json";
    const res = await fetchJSON(
      url,
      { method: "POST", body, credentials: "omit" },
      allowErrorResponseHandler
    );
    if (isErrorResponse(res)) {
      return res;
    }
    if (!res) {
      return Promise.reject(new Error("Login Error: unknown error"));
    }
    ga4Login("credentials");
    return res.token;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postLocalLogin()", err.message);
      return Promise.reject(err);
    }
    console.debug("postLocalLogin()", err);
    return Promise.reject(new Error("Error in postLocalLogin()"));
  }
}
async function postLocalReauth() {
  try {
    const url = "/api/user/v2/b2b/auth/renew.json";
    const res = await fetchJSON(url, { method: "POST" });
    return res?.token ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postLocalReauth()", err.message);
      return Promise.reject(err);
    }
    console.debug("postLocalReauth()", err);
    return Promise.reject(new Error("Error in postLocalReauth()"));
  }
}
async function fetchUserProfile() {
  try {
    const url = "/api/user/v2/b2b/profile.json";
    const response = await fetchJSON(url, { cache: "no-cache" });
    if (!response) {
      return Promise.reject(new Error("Error loading user profile"));
    }
    response.reps = [];
    if (response.user?.accountType === 1) {
      response.reps = await fetchRepList();
    }
    configGtag({ user_id: `${response?.user?.id ?? 0}` });
    return response;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchUserProfile()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchUserProfile()", err);
    return Promise.reject(new Error("Error in fetchUserProfile()"));
  }
}
async function postUserProfile(arg) {
  try {
    const url = "/api/user/v2/b2b/profile.json";
    const body = JSON.stringify(arg);
    const response = await fetchJSON(url, { method: "PUT", body });
    if (!response) {
      return Promise.reject(new Error("Unknown error when saving user profile."));
    }
    response.reps = [];
    response.roles = response.roles?.map((role) => isUserRole(role) ? role.role : role);
    if (response.user?.accountType === 1) {
      response.reps = await fetchRepList();
    }
    if (response.token) {
      try {
        const decoded = jwtDecode(response.token);
        response.expires = decoded.exp;
      } catch (err) {
      }
    }
    return response;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postUserProfile()", err.message);
      return Promise.reject(err);
    }
    console.debug("postUserProfile()", err);
    return Promise.reject(new Error("Error in postUserProfile()"));
  }
}
async function fetchRepList() {
  try {
    const url = "/api/sales/b2b/salesperson/list.json";
    const response = await fetchJSON(url, { cache: "no-cache" });
    return (response?.list ?? []).filter((rep) => !!rep.active);
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchRepList()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchRepList()", err);
    return Promise.reject(new Error("Error in fetchRepList()"));
  }
}
async function fetchGoogleLogin(token) {
  try {
    if (!isTokenExpired(token)) {
      auth.setToken(token);
    }
    const body = JSON.stringify({ token });
    const url = "/api/user/v2/b2b/login/google.json";
    const response = await fetchJSON(url, {
      method: "POST",
      body,
      credentials: "omit"
    });
    if (!response) {
      return Promise.reject(new Error("Unable to load Google login"));
    }
    response.reps = [];
    if (response.user?.accountType === 1) {
      response.reps = await fetchRepList();
    }
    if (response.token) {
      try {
        const decoded = jwtDecode(response.token);
        response.expires = decoded.exp;
      } catch (err) {
      }
    }
    if (response.user) {
      const profile = getSignInProfile(token);
      const { user, roles, accounts } = response;
      const storedProfile = {
        ...profile,
        chums: {
          user: {
            ...user,
            roles,
            accounts
          }
        }
      };
      ga4Login("google");
      auth.setProfile(storedProfile);
      LocalStore.setItem(STORE_AUTHTYPE, AUTH_GOOGLE);
    }
    return response;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchGoogleLogin()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchGoogleLogin()", err);
    return Promise.reject(new Error("Error in fetchGoogleLogin()"));
  }
}
async function postResetPassword(arg) {
  try {
    const body = JSON.stringify({ email: arg });
    const url = "/api/user/v2/b2b/login/reset-password.json";
    const response = await fetchJSON(
      url,
      { method: "POST", body, credentials: "omit" }
    );
    return response?.success ?? false;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postResetPassword()", err.message);
      return Promise.reject(err);
    }
    console.debug("postResetPassword()", err);
    return Promise.reject(new Error("Error in postResetPassword()"));
  }
}
async function fetchSignUpProfile(arg) {
  try {
    const url = "/api/user/v2/b2b/signup/:hash/:key.json".replace(":hash", encodeURIComponent(arg.hash)).replace(":key", encodeURIComponent(arg.key));
    const res = await fetchJSON(url, { cache: "no-cache" }, allowErrorResponseHandler);
    if (isErrorResponse(res)) {
      return res;
    }
    configGtag({ user_id: `${res?.user?.id ?? 0}` });
    return res?.user ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchSignUpProfile()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchSignUpProfile()", err);
    return Promise.reject(new Error("Error in fetchSignUpProfile()"));
  }
}
async function postSignUpUser(arg) {
  try {
    const email = arg.email;
    const url = "/api/user/v2/b2b/signup.json".replace(":email", encodeURIComponent(email));
    const body = JSON.stringify(arg);
    const res = await fetchJSON(url, { method: "POST", body });
    ga4SignUp();
    return res;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postSignUpUser()", err.message);
      return Promise.reject(err);
    }
    console.debug("postSignUpUser()", err);
    return Promise.reject(new Error("Error in postSignUpUser()"));
  }
}
async function postPasswordChange(arg) {
  try {
    const url = "/api/user/v2/b2b/password.json";
    const body = JSON.stringify(arg);
    return await fetchJSON(url, {
      method: "POST",
      body
    }, allowErrorResponseHandler);
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postPasswordChange()", err.message);
      return Promise.reject(err);
    }
    console.debug("postPasswordChange()", err);
    return Promise.reject(new Error("Error in postPasswordChange()"));
  }
}
async function postNewPassword(arg) {
  try {
    const url = `/api/user/v2/b2b/signup/:hash/:key.json`.replace(":hash", encodeURIComponent(arg.hash)).replace(":key", encodeURIComponent(arg.key));
    const body = JSON.stringify({ newPassword: arg.newPassword });
    const res = await fetchJSON(url, { method: "POST", body }, allowErrorResponseHandler);
    return res ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postNewPassword()", err.message);
      return Promise.reject(err);
    }
    console.debug("postNewPassword()", err);
    return Promise.reject(new Error("Error in postNewPassword()"));
  }
}
async function postLogout() {
  try {
    const url = "/api/user/v2/b2b/logout.json";
    await fetchJSON(url, { method: "POST" }, allowErrorResponseHandler);
  } catch (err) {
    if (err instanceof Error) {
      console.debug("postLogout()", err.message);
      return Promise.reject(err);
    }
    console.debug("postLogout()", err);
    return Promise.reject(new Error("Error in postLogout()"));
  }
}
const setLoggedIn = createAction("user/setLoggedIn", function(arg) {
  if (arg.loggedIn) {
    const profile = auth.getProfile();
    const accounts = profile?.chums?.user?.accounts ?? [];
    if (!arg.accessList) {
      arg.accessList = accounts;
    }
    if (!arg.access) {
      arg.access = LocalStore.getItem(
        STORE_USER_ACCESS,
        accounts.length === 1 ? accounts[0] : null
      );
    }
    if (!arg.authType) {
      arg.authType = LocalStore.getItem(STORE_AUTHTYPE, null) ?? "";
    }
  }
  return {
    payload: {
      ...arg
    }
  };
});
const loginUser = createAsyncThunk(
  "user/login",
  async (arg, { dispatch }) => {
    const res = await postLocalLogin(arg);
    if (!isErrorResponse(res)) {
      const token = res;
      auth.setToken(token);
      LocalStore.setItem(STORE_AUTHTYPE, AUTH_LOCAL);
      auth.setProfile(getProfile(token));
      const expires = getTokenExpiry(token);
      const recentCustomers2 = LocalStore.getItem(STORE_RECENT_ACCOUNTS, []);
      dispatch(setLoggedIn({ loggedIn: true, authType: AUTH_LOCAL, token, expires, recentCustomers: recentCustomers2 }));
      const profileResponse = await dispatch(loadProfile());
      if (isFulfilled(profileResponse) && profileResponse.payload.accounts?.length === 1) {
        dispatch(loadCustomerList(profileResponse.payload.accounts[0]));
      }
    }
    return res;
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg.email && !!arg.password && !selectLoggingIn(state);
    }
  }
);
const updateLocalAuth = createAsyncThunk(
  "user/updateLocalAuth",
  async (_, { dispatch }) => {
    try {
      const token = await postLocalReauth();
      if (!token) {
        dispatch(setLoggedIn({ loggedIn: false }));
        auth.removeToken();
        return;
      }
      auth.setToken(token);
      auth.setProfile(getProfile(token));
      const expires = getTokenExpiry(token);
      dispatch(setLoggedIn({ loggedIn: true, authType: AUTH_LOCAL, token, expires }));
    } catch (err) {
      if (err instanceof Error) {
        console.log("updateLocalAuth()", err.message);
      }
      dispatch(setLoggedIn({ loggedIn: false }));
      auth.removeToken();
      return;
    }
    dispatch(loadProfile());
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const loggedIn = selectLoggedIn(state);
      const actionStatus = selectUserActionStatus(state);
      return loggedIn && actionStatus === "idle";
    }
  }
);
const signInWithGoogle = createAsyncThunk(
  "user/signInWithGoogle",
  async (arg) => {
    const response = await fetchGoogleLogin(arg);
    auth.setToken(response.token ?? arg);
    if (response.user) {
      const profile = getSignInProfile(arg);
      const { user, roles, accounts, token } = response;
      if (token) {
        auth.setToken(token);
      }
      const storedProfile = {
        ...profile,
        chums: {
          user: {
            ...user,
            roles: roles ?? [],
            accounts: accounts ?? []
          }
        }
      };
      response.picture = getSignInProfile(arg)?.imageUrl ?? null;
      auth.setProfile(storedProfile);
      response.recentCustomers = LocalStore.getItem(STORE_RECENT_ACCOUNTS, []);
    }
    return response;
  },
  {
    condition: (_arg, { getState }) => {
      const state = getState();
      return !selectUserLoading(state);
    }
  }
);
const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_arg, { dispatch }) => {
    try {
      await postLogout();
      auth.logout();
    } catch (err) {
      if (err instanceof Error) {
        console.debug("()", err.message);
      }
    }
    LocalStore.removeItem(STORE_CUSTOMER);
    LocalStore.removeItem(STORE_USER_ACCESS);
    LocalStore.removeItem(STORE_AUTHTYPE);
    LocalStore.removeItem(STORE_CURRENT_CART);
    LocalStore.removeItem(STORE_CUSTOMER_SHIPPING_ACCOUNT);
    dispatch(setLoggedIn({ loggedIn: false }));
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return selectUserActionStatus(state) === "idle";
    }
  }
);
const setUserAccess = createAsyncThunk(
  "userAccess/setCurrent",
  async (arg, { dispatch }) => {
    LocalStore.setItem(STORE_USER_ACCESS, arg);
    if (isCustomerAccess(arg)) {
      if (!arg.isRepAccount) {
        const { ARDivisionNo, CustomerNo, CustomerName, ShipToCode } = arg;
        dispatch(setCustomerAccount({ ARDivisionNo, CustomerNo, ShipToCode }));
        dispatch(loadCustomer(arg));
        LocalStore.setItem(STORE_CUSTOMER, {
          ARDivisionNo,
          CustomerNo,
          CustomerName: CustomerName ?? ""
        });
      } else {
        dispatch(loadCustomerList(arg));
      }
    }
    return arg;
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return selectLoggedIn(state) && !!arg?.isRepAccount && selectCurrentAccess(state)?.id !== arg?.id;
    }
  }
);
const loadProfile = createAsyncThunk(
  "user/loadProfile",
  async () => {
    return await fetchUserProfile();
  },
  {
    condition: (_arg, { getState }) => {
      const state = getState();
      return !selectUserLoading(state) && selectLoggedIn(state);
    }
  }
);
const changePassword = createAsyncThunk(
  "user/changePassword",
  async (arg) => {
    return await postPasswordChange(arg) ?? {
      success: false,
      error: "Unknown error changing password."
    };
  },
  {
    condition: (_arg, { getState }) => {
      const state = getState();
      return selectUserActionStatus(state) === "idle";
    }
  }
);
const setNewPassword = createAsyncThunk(
  "user/setNewPassword",
  async (arg) => {
    const res = await postNewPassword(arg);
    if (res?.success) ;
    return res;
  },
  {
    condition: (_arg, { getState }) => {
      const state = getState();
      return selectUserActionStatus(state) === "idle";
    }
  }
);
const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (arg) => {
    return await postResetPassword(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg.trim() && !selectLoggedIn(state) && !selectResettingPassword(state);
    }
  }
);
const saveUserProfile = createAsyncThunk(
  "user/saveProfile",
  async (arg) => {
    return await postUserProfile(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg.name.trim() && selectLoggedIn(state);
    }
  }
);
const setAvatar = createAction("user/setAvatar", (arg) => {
  if (arg) {
    LocalStore.setItem(STORE_AVATAR, arg);
  } else {
    LocalStore.removeItem(STORE_AVATAR);
  }
  return {
    payload: arg
  };
});
const alertSorter = (a, b) => a.alertId - b.alertId;
const adapter$4 = createEntityAdapter({
  selectId: (arg) => arg.alertId,
  sortComparer: (a, b) => a.alertId - b.alertId
});
const selectors$4 = adapter$4.getSelectors();
const extraState$5 = {
  index: 0
};
const alertsSlice = createSlice({
  name: "alerts",
  initialState: adapter$4.getInitialState(extraState$5),
  reducers: {
    setAlert: (state, action) => {
      const nextIndex = state.index + 1;
      if (action.payload.context) {
        const alert = Object.values(state.entities).find((alert2) => alert2.context === action.payload.context);
        if (!alert) {
          adapter$4.addOne(state, { ...action.payload, alertId: nextIndex, count: 1 });
          state.index = nextIndex;
        } else {
          adapter$4.updateOne(state, { changes: { count: (alert.count ?? 0) + 1 }, id: alert.alertId });
        }
      } else {
        adapter$4.addOne(state, { ...action.payload, alertId: nextIndex, count: 1 });
        state.index = nextIndex;
      }
    },
    dismissAlert: (state, action) => {
      adapter$4.removeOne(state, action.payload);
    },
    dismissContextAlert: (state, action) => {
      const alert = Object.values(state.entities).find((alert2) => alert2.context === action.payload);
      adapter$4.removeOne(state, alert?.alertId ?? 0);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setLoggedIn, (state, action) => {
      if (!action.payload?.loggedIn) {
        adapter$4.removeAll(state);
      }
    }).addMatcher(isRejected, (state, action) => {
      const nextIndex = state.index + 1;
      const context = action.type.replace("/rejected", "");
      const alert = Object.values(state.entities).find((alert2) => alert2.context === context);
      if (alert) {
        adapter$4.updateOne(state, { changes: { count: (alert.count ?? 0) + 1 }, id: alert.alertId });
      } else {
        adapter$4.addOne(state, {
          alertId: nextIndex,
          severity: "warning",
          message: action.error.message?.replace("", "") ?? "",
          context,
          count: 1
        });
        state.index = nextIndex;
      }
    }).addMatcher(
      (action) => isFulfilled(action),
      (state, action) => {
        const context = action.type.replace("/fulfilled", "");
        const alert = Object.values(state.entities).find((alert2) => alert2.context === context);
        if (alert) {
          adapter$4.removeOne(state, alert.alertId);
        }
      }
    );
  },
  selectors: {
    selectAlerts: (state) => selectors$4.selectAll(state)
  }
});
const { setAlert, dismissAlert, dismissContextAlert } = alertsSlice.actions;
const { selectAlerts } = alertsSlice.selectors;
const selectContextAlerts = createSelector(
  [selectAlerts, (_, context) => context],
  (list, context) => {
    return list.filter((alert) => !context || alert.context === context).sort(alertSorter);
  }
);
const initialAppState = {
  nonce: null
};
const appReducer = createReducer(initialAppState, () => {
});
const cartsAdapter = createEntityAdapter({
  selectId: (arg) => arg.id,
  sortComparer: (a, b) => a.id - b.id
});
const adapterSelectors$2 = cartsAdapter.getSelectors();
const extraState$4 = {
  customerKey: null,
  status: "idle",
  search: "",
  sort: { field: "id", ascending: true }
};
const cartHeadersSlice = createSlice({
  name: "cartHeaders",
  initialState: cartsAdapter.getInitialState(extraState$4),
  reducers: {
    setCartSearch: (state, action) => {
      state.search = action.payload;
    },
    setCartsSort: (state, action) => {
      state.sort = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      if (action.payload) {
        cartsAdapter.setOne(state, action.payload.header);
      }
    }).addCase(loadCart.fulfilled, (state, action) => {
      if (!action.payload) {
        cartsAdapter.removeOne(state, action.meta.arg.cartId);
        return;
      }
      cartsAdapter.setOne(state, action.payload.header);
    }).addCase(loadCarts.pending, (state, action) => {
      if (state.customerKey !== action.meta.arg) {
        state.customerKey = action.meta.arg;
        cartsAdapter.removeAll(state);
      }
    }).addCase(loadCarts.fulfilled, (state, action) => {
      cartsAdapter.setAll(state, action.payload.map((cart) => cart.header));
    }).addCase(loadCustomer.pending, (state, action) => {
      if (state.customerKey !== customerSlug(action.meta.arg)) {
        state.customerKey = customerSlug(action.meta.arg);
        cartsAdapter.removeAll(state);
      }
    }).addCase(saveCart.fulfilled, (state, action) => {
      if (action.payload) {
        cartsAdapter.setOne(state, action.payload.header);
      }
    }).addCase(saveCartItem.fulfilled, (state, action) => {
      if (action.payload) {
        cartsAdapter.setOne(state, action.payload.header);
      }
    }).addCase(processCart.fulfilled, (state, action) => {
      if (action.payload) {
        cartsAdapter.removeOne(state, action.meta.arg.id);
      }
    }).addCase(duplicateSalesOrder.fulfilled, (state, action) => {
      if (action.payload) {
        cartsAdapter.setOne(state, action.payload.header);
      }
    });
  },
  selectors: {
    selectAll: (state) => adapterSelectors$2.selectAll(state),
    selectCartHeaderById: (state, cartId) => adapterSelectors$2.selectById(state, cartId) ?? null,
    selectCartHeaders: (state) => adapterSelectors$2.selectAll(state),
    selectCartsSearch: (state) => state.search,
    selectCartsSort: (state) => state.sort,
    selectCartsLength: (state) => adapterSelectors$2.selectTotal(state)
  }
});
const { setCartSearch, setCartsSort } = cartHeadersSlice.actions;
const {
  selectCartsSearch,
  selectCartsSort,
  selectCartHeaderById,
  selectCartHeaders,
  selectCartsLength
} = cartHeadersSlice.selectors;
const selectCartTotalById = createSelector(
  [selectCartHeaderById],
  (cart) => {
    return cart?.subTotalAmt ?? null;
  }
);
const selectFilteredCarts = createSelector(
  [selectCartHeaders, selectCartsSearch, selectCartsSort],
  (list, search, sort) => {
    return list.filter(
      (cart) => !search.trim() || cart.id.toString().includes(search.trim()) || (cart.salesOrderNo ?? "").toLowerCase().includes(search.trim().toLowerCase()) || (cart.customerPONo ?? "").toLowerCase().includes(search.trim().toLowerCase())
    ).sort(cartsSorter(sort));
  }
);
const statusAdapter = createEntityAdapter({
  selectId: (arg) => arg.id,
  sortComparer: (a, b) => a.id - b.id
});
const adapterSelectors$1 = statusAdapter.getSelectors();
function mapItemStatus(detail, status) {
  return detail.map((row) => ({ id: row.id, cartId: row.cartHeaderId, status }));
}
const cartStatusSlice = createSlice({
  name: "cartsDetailStatus",
  initialState: statusAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state, action) => {
      statusAdapter.setOne(state, { id: 0, cartId: action.meta.arg.cartId ?? 0, status: "saving" });
    }).addCase(addToCart.fulfilled, (state, action) => {
      statusAdapter.removeOne(state, 0);
      if (action.payload) {
        const oldItems = adapterSelectors$1.selectAll(state).filter((s) => s.cartId === action.payload?.header.id).map((s) => s.id);
        statusAdapter.removeMany(state, oldItems);
        statusAdapter.setMany(state, mapItemStatus(action.payload.detail, "idle"));
      }
    }).addCase(addToCart.rejected, (state) => {
      statusAdapter.removeOne(state, 0);
    }).addCase(loadCart.fulfilled, (state, action) => {
      if (action.payload) {
        const oldItems = adapterSelectors$1.selectAll(state).filter((s) => s.cartId === action.payload?.header.id).map((s) => s.id);
        statusAdapter.removeMany(state, oldItems);
        statusAdapter.setMany(state, mapItemStatus(action.payload.detail, "idle"));
      }
    }).addCase(loadCarts.fulfilled, (state, action) => {
      statusAdapter.removeAll(state);
      const newItems = [];
      action.payload.forEach((cart) => {
        newItems.push(...mapItemStatus(cart.detail, "idle"));
      });
      statusAdapter.setMany(state, newItems);
    }).addCase(saveCart.fulfilled, (state, action) => {
      if (action.payload) {
        const oldItems = adapterSelectors$1.selectAll(state).filter((s) => s.cartId === action.payload?.header.id).map((s) => s.id);
        statusAdapter.removeMany(state, oldItems);
        statusAdapter.setMany(state, mapItemStatus(action.payload.detail, "idle"));
      }
    }).addCase(saveCartItem.pending, (state, action) => {
      statusAdapter.setOne(state, {
        id: action.meta.arg.cartItemId,
        cartId: action.meta.arg.cartId,
        status: "saving"
      });
    }).addCase(saveCartItem.fulfilled, (state, action) => {
      statusAdapter.setOne(state, {
        id: action.meta.arg.cartItemId,
        cartId: action.meta.arg.cartId,
        status: "idle"
      });
    }).addCase(saveCartItem.rejected, (state, action) => {
      statusAdapter.setOne(state, {
        id: action.meta.arg.cartItemId,
        cartId: action.meta.arg.cartId,
        status: "idle"
      });
    }).addCase(processCart.fulfilled, (state, action) => {
      const oldItems = adapterSelectors$1.selectAll(state).filter((s) => s.cartId === action.meta.arg.id).map((s) => s.id);
      statusAdapter.removeMany(state, oldItems);
    }).addCase(duplicateSalesOrder.fulfilled, (state, action) => {
      statusAdapter.removeOne(state, 0);
      if (action.payload) {
        statusAdapter.addMany(state, mapItemStatus(action.payload.detail, "idle"));
      }
    });
  },
  selectors: {
    selectCartItemStatusById: (state, id) => adapterSelectors$1.selectById(state, id)?.status ?? "idle"
  }
});
const { selectCartItemStatusById } = cartStatusSlice.selectors;
const initialState$1 = { customerKey: null, status: "idle", response: null, error: null };
const cartEmailSlice = createSlice({
  name: "cartEmail",
  initialState: initialState$1,
  reducers: {
    closeEmailResponse: (state) => {
      state.status = "idle";
      state.response = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        resetCartEmail(state, null);
      }
    }).addCase(setUserAccess.pending, (state, action) => {
      const customerKey2 = customerSlug(action?.meta?.arg);
      if (!action.meta.arg?.isRepAccount && state.customerKey !== customerKey2) {
        resetCartEmail(state, customerKey2);
      }
    }).addCase(loadCustomer.pending, (state, action) => {
      const customerKey2 = customerSlug(action.meta.arg);
      if (state.customerKey !== customerKey2) {
        resetCartEmail(state, customerKey2);
      }
    }).addCase(setCustomerAccount.fulfilled, (state, action) => {
      const customerKey2 = customerSlug(action.payload.customer);
      if (state.customerKey !== customerKey2) {
        resetCartEmail(state, customerKey2);
      }
    }).addCase(sendCartEmail.pending, (state) => {
      state.status = "sending";
      state.response = null;
      state.error = null;
    }).addCase(sendCartEmail.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.response = action.payload;
      state.error = null;
    }).addCase(sendCartEmail.rejected, (state, action) => {
      state.status = "rejected";
      state.response = null;
      state.error = action.error.message ?? null;
    });
  },
  selectors: {
    selectSendEmailResponse: (state) => state.response,
    selectSendEmailStatus: (state) => state.status,
    selectSendEmailError: (state) => state.error
  }
});
const { closeEmailResponse } = cartEmailSlice.actions;
const { selectSendEmailResponse, selectSendEmailStatus, selectSendEmailError } = cartEmailSlice.selectors;
function resetCartEmail(state, customerKey2) {
  state.status = "idle";
  state.response = null;
  state.error = customerKey2;
}
const messagesAdapter = createEntityAdapter({
  selectId: (arg) => arg.key,
  sortComparer: (a, b) => a.key.localeCompare(b.key)
});
const adapterSelectors = messagesAdapter.getSelectors();
const cartMessagesSlice = createSlice({
  name: "cartMessages",
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    clearCartMessage: (state, action) => {
      messagesAdapter.removeOne(state, action.payload);
    },
    clearCartMessages: (state) => {
      messagesAdapter.removeAll(state);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const item = action.meta.arg.item;
      messagesAdapter.addOne(state, {
        message: `Added to cart: ${item.itemCode}, ${item.quantityOrdered} ${item.unitOfMeasure}`.trim(),
        key: action.meta.requestId
      });
    }).addCase(addToCart.rejected, (state, action) => {
      const item = action.meta.arg.item;
      messagesAdapter.addOne(state, {
        message: `[${item.itemCode}] Add to cart failed: ${action.error.message}`.trim(),
        key: action.meta.requestId
      });
    }).addCase(saveCart.fulfilled, (state, action) => {
      messagesAdapter.addOne(state, {
        message: `Cart ${action.meta.arg.cartId} saved`,
        key: action.meta.requestId
      });
    }).addCase(saveCartItem.fulfilled, (state, action) => {
      messagesAdapter.addOne(state, {
        message: `Cart ${action.meta.arg.cartId} updated`,
        key: action.meta.requestId
      });
    });
  },
  selectors: {
    selectCartMessages: (state) => adapterSelectors.selectAll(state)
  }
});
const { selectCartMessages } = cartMessagesSlice.selectors;
const { clearCartMessages, clearCartMessage } = cartMessagesSlice.actions;
const selectCategoryLoading = (state) => state.category.status === "loading";
const selectCategoryStatus = (state) => state.category.status;
const selectCategory = (state) => state.category.category;
async function fetchCategory(keyword) {
  try {
    if (!keyword) {
      return null;
    }
    const url = `/api/products/v2/category/${encodeURIComponent(keyword)}.json`;
    const response = await fetchJSON(url, { cache: "no-cache" });
    return response?.categories?.[0] ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug(fetchCategory.name, err.message);
      return Promise.reject(err);
    }
    console.debug(fetchCategory.name, err);
    return Promise.reject(new Error("Error in fetchCategory()"));
  }
}
const loadCategory = createAsyncThunk(
  "category/load",
  async (arg) => {
    return await fetchCategory(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg && selectCategoryStatus(state) === "idle";
    }
  }
);
const initialCategoryState = {
  keyword: null,
  category: null,
  status: "idle"
};
const categoryReducer = createReducer(initialCategoryState, (builder) => {
  builder.addCase(loadCategory.pending, (state, action) => {
    state.status = "loading";
    if (action.meta.arg !== state.keyword) {
      state.keyword = action.meta.arg ?? null;
      state.category = null;
    }
  }).addCase(loadCategory.fulfilled, (state, action) => {
    state.status = "idle";
    state.keyword = action.payload?.keyword ?? null;
    state.category = action.payload ?? null;
  }).addCase(loadCategory.rejected, (state) => {
    state.status = "rejected";
  });
});
async function getCookieConsent() {
  try {
    const url = "/api/cookie-consent.json";
    const res = await fetchJSON(url, { cache: "no-cache" });
    return res ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("getCookieConsent()", err.message);
      return Promise.reject(err);
    }
    console.debug("getCookieConsent()", err);
    return Promise.reject(new Error("Error in getCookieConsent()"));
  }
}
async function postCookieConsent(arg) {
  try {
    const url = "/api/cookie-consent.json";
    const body = JSON.stringify(arg);
    return await fetchJSON(url, { method: "POST", body });
  } catch (err) {
    if (err instanceof Error) {
      console.debug("putCookieConsent()", err.message);
      return Promise.reject(err);
    }
    console.debug("putCookieConsent()", err);
    return Promise.reject(new Error("Error in putCookieConsent()"));
  }
}
async function getCookieConsentInfo() {
  try {
    const url = "/api/cookie-consent/info.json";
    const res = await fetchJSON(url);
    return res ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("getCookieConsentInfo()", err.message);
      return Promise.reject(err);
    }
    console.debug("getCookieConsentInfo()", err);
    return Promise.reject(new Error("Error in getCookieConsentInfo()"));
  }
}
const loadCookieConsentStatus = createAsyncThunk(
  "cookie-consent/load",
  async () => {
    return await getCookieConsent();
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return selectCookieConsentStatus(state) === "idle";
    }
  }
);
const saveCookieConsent = createAsyncThunk(
  "cookie-consent/save",
  async (arg) => {
    return await postCookieConsent(arg);
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return selectCookieConsentStatus(state) === "idle";
    }
  }
);
const loadCookieConsentInfo = createAsyncThunk(
  "cookie-consent/load-info",
  async () => {
    return await getCookieConsentInfo();
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return selectCookieConsentStatus(state) === "idle";
    }
  }
);
const initialCookieConsentState = {
  status: "idle",
  record: null,
  dismissed: false,
  details: null
};
const cookieConsentSlice = createSlice({
  name: "cookieConsent",
  initialState: initialCookieConsentState,
  reducers: {
    dismissCookieConsent: (state) => {
      state.dismissed = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadCookieConsentStatus.pending, (state) => {
      state.status = "loading";
    }).addCase(loadCookieConsentStatus.fulfilled, (state, action) => {
      state.status = "idle";
      state.record = action.payload;
    }).addCase(loadCookieConsentStatus.rejected, (state) => {
      state.status = "idle";
    }).addCase(saveCookieConsent.pending, (state) => {
      state.status = "loading";
    }).addCase(saveCookieConsent.fulfilled, (state, action) => {
      state.status = "idle";
      state.record = action.payload;
    }).addCase(saveCookieConsent.rejected, (state) => {
      state.status = "idle";
    }).addCase(loadCookieConsentInfo.pending, (state) => {
      state.status = "loading";
    }).addCase(loadCookieConsentInfo.fulfilled, (state, action) => {
      state.details = action.payload;
      state.status = "idle";
    }).addCase(loadCookieConsentInfo.rejected, (state) => {
      state.status = "idle";
    });
  },
  selectors: {
    selectHasCookieConsent: (state) => !!state.record?.ack,
    selectHasGPCFlag: (state) => !!state.record?.gpc,
    selectCookieConsentStatus: (state) => state.status,
    selectCookieConsentRecord: (state) => state.record,
    selectAllowsPreferences: (state) => state.record?.preferences?.preferences ?? false,
    selectAllowsAnalytics: (state) => state.record?.preferences?.analytics ?? false,
    selectAllowsMarketing: (state) => state.record?.preferences?.marketing ?? false,
    selectCookieConsentDismissed: (state) => state.dismissed,
    selectCookieConsentDetails: (state) => state.details
  }
});
const {
  selectHasCookieConsent,
  selectHasGPCFlag,
  selectCookieConsentStatus,
  selectCookieConsentRecord,
  selectAllowsPreferences,
  selectAllowsMarketing,
  selectAllowsAnalytics,
  selectCookieConsentDismissed,
  selectCookieConsentDetails
} = cookieConsentSlice.selectors;
const { dismissCookieConsent } = cookieConsentSlice.actions;
const initialCustomerState = () => ({
  company: "chums",
  key: null,
  account: null,
  contacts: [],
  loadStatus: "idle",
  loading: false,
  loaded: false,
  saving: false,
  returnToPath: null
});
const customerReducer = createReducer(initialCustomerState(), (builder) => {
  builder.addCase(setCustomerAccount.fulfilled, (state, action) => {
    state.company = companyCode("chums");
    if (!!state.account && (state.account.ARDivisionNo !== action.payload.customer.ARDivisionNo || state.account.CustomerNo !== action.payload.customer.CustomerNo || (state.account.ShipToCode ?? "") !== (action.payload.customer.ShipToCode ?? ""))) {
      state.contacts = [];
    }
    state.account = { ...emptyCustomer, ...action.payload.customer };
  }).addCase(setLoggedIn, (state, action) => {
    if (!action.payload?.loggedIn) {
      const initialState2 = initialCustomerState();
      state.key = initialState2.key;
      state.account = initialState2.account;
      state.contacts = initialState2.contacts;
      state.loaded = false;
    }
  }).addCase(saveBillingAddress.pending, (state) => {
    state.loading = true;
  }).addCase(saveBillingAddress.fulfilled, (state, action) => {
    state.loadStatus = "idle";
    state.loading = false;
    state.account = action.payload?.customer ?? null;
    state.contacts = action.payload?.contacts ?? [];
    state.loaded = true;
  }).addCase(saveBillingAddress.rejected, (state) => {
    state.loading = false;
    state.loadStatus = "idle";
  }).addCase(saveShipToAddress.pending, (state) => {
    state.loading = true;
    state.loadStatus = "pending";
  }).addCase(saveShipToAddress.fulfilled, (state, action) => {
    state.loading = false;
    state.loadStatus = "idle";
    state.account = action.payload?.customer ?? null;
    state.contacts = action.payload?.contacts ?? [];
    state.loaded = true;
  }).addCase(saveShipToAddress.rejected, (state) => {
    state.loading = false;
  }).addCase(setDefaultShipTo.pending, (state) => {
    state.loading = true;
  }).addCase(setDefaultShipTo.fulfilled, (state) => {
    state.loading = false;
  }).addCase(setDefaultShipTo.rejected, (state) => {
    state.loading = false;
  }).addCase(loadCustomer.pending, (state, action) => {
    state.loadStatus = "pending";
    if (state.key !== customerSlug(action.meta.arg)) {
      state.account = null;
      state.contacts = [];
      state.loaded = false;
    }
    state.key = customerSlug(action.meta.arg);
    state.loading = true;
  }).addCase(loadCustomer.fulfilled, (state, action) => {
    state.loadStatus = "idle";
    state.loading = false;
    state.account = action.payload?.customer ?? null;
    state.contacts = action.payload?.contacts ?? [];
    state.loaded = true;
  }).addCase(loadCustomer.rejected, (state) => {
    state.loadStatus = "rejected";
    state.loading = false;
  }).addCase(dismissContextAlert, (state, action) => {
    if (action.payload === loadCustomer.typePrefix) {
      state.loadStatus = "idle";
    }
  }).addCase(setUserAccess.pending, (state, action) => {
    if (!action.meta.arg?.isRepAccount && customerSlug(state.account) !== customerSlug(action.meta.arg)) {
      state.account = null;
      state.contacts = [];
      state.loaded = true;
    }
  }).addCase(setReturnToPath, (state, action) => {
    state.returnToPath = action.payload;
  }).addCase(loadCustomerList.fulfilled, (state, action) => {
    if (state.account) {
      const [customer] = action.payload.filter((customer2) => customerSlug(customer2) === customerSlug(state.account));
      if (!customer) {
        state.account = null;
        state.contacts = [];
        state.loaded = true;
      }
    }
  });
});
async function fetchItemLookup(arg) {
  try {
    if (!arg || !arg.trim()) {
      return [];
    }
    const url = `/api/search/items/${encodeURIComponent(arg)}`;
    const res = await fetchJSON(url);
    return res?.items ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchItemLookup()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchItemLookup()", err);
    return Promise.reject(new Error("Error in fetchItemLookup()"));
  }
}
const initialItemLookupState = {
  search: "",
  items: [],
  loadStatus: "idle"
};
const selectSearchResults$1 = (state) => state.itemLookup.items;
const selectSearchStatus = (state) => state.itemLookup.loadStatus;
const selectSearchLoading$1 = (state) => state.itemLookup.loadStatus === "pending";
const selectSearchFulfilled = (state) => state.itemLookup.loadStatus === "fulfilled";
createAction("itemLookup/search");
const loadItemLookup = createAsyncThunk(
  "itemLookup/load",
  async (arg) => {
    return await fetchItemLookup(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg.trim() && selectSearchStatus(state) !== "pending";
    }
  }
);
const itemLookupReducer = createReducer(initialItemLookupState, (builder) => {
  builder.addCase(loadItemLookup.pending, (state, action) => {
    state.loadStatus = "pending";
    state.search = action.meta.arg;
  }).addCase(loadItemLookup.fulfilled, (state, action) => {
    state.loadStatus = "fulfilled";
    state.items = action.payload.filter((item) => !item.ItemCode.endsWith("IMP"));
  }).addCase(loadItemLookup.rejected, (state) => {
    state.loadStatus = "idle";
    state.items = [];
  });
});
const keywordsSorter = (a, b) => {
  return a.keyword.toLowerCase() > b.keyword.toLowerCase() ? 1 : -1;
};
async function fetchKeywords() {
  try {
    const url = "/api/keywords.json";
    const res = await fetchJSON(url, { cache: "no-cache" });
    return res?.result ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchKeywords()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchKeywords()", err);
    return Promise.reject(new Error("Error in fetchKeywords()"));
  }
}
const selectKeywordsLoading = (state) => state.keywords.loading;
const selectKeywordsList = (state) => state.keywords.list;
createSelector(
  [selectKeywordsList, () => "products"],
  (list, pageType) => {
    return list.filter((kw) => kw.pagetype === pageType);
  }
);
createSelector(
  [selectKeywordsList, () => "category"],
  (list, pageType) => {
    return list.filter((kw) => kw.pagetype === pageType);
  }
);
createSelector(
  [selectKeywordsList, () => "page"],
  (list, pageType) => {
    return list.filter((kw) => kw.pagetype === pageType);
  }
);
const loadKeywords = createAsyncThunk(
  "keywords/load",
  async () => {
    return await fetchKeywords();
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return !selectKeywordsLoading(state);
    }
  }
);
const initialKeywordsState = {
  list: [],
  loading: false,
  loaded: false
};
const keywordsReducer = createReducer(initialKeywordsState, (builder) => {
  builder.addCase(loadKeywords.pending, (state) => {
    state.loading = true;
  }).addCase(loadKeywords.fulfilled, (state, action) => {
    state.loading = false;
    state.loaded = true;
    state.list = [...action.payload].sort(keywordsSorter);
  }).addCase(loadKeywords.rejected, (state) => {
    state.loading = false;
  });
});
async function fetchMenu(id) {
  try {
    if (!id) {
      return null;
    }
    const url = "/api/menus/active/:id.json".replace(":id", encodeURIComponent(id));
    const response = await fetchJSON(url, { cache: "no-cache" });
    return response?.menu ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("loadMenu()", err.message);
      return Promise.reject(err);
    }
    console.debug("loadMenu()", err);
    return Promise.reject(new Error("Error in loadMenu()"));
  }
}
const defaultMenuItem = {
  title: "",
  url: "",
  id: 0,
  description: "",
  className: "",
  parentId: 0,
  priority: 0,
  status: true
};
function buildCustomerMenuItems(account) {
  const customerSlug2 = customerPath(account);
  return [
    {
      id: "account",
      title: "Billing address",
      url: generatePath("/account/:customerSlug", { customerSlug: customerSlug2 })
    },
    {
      id: "delivery",
      title: "Delivery Addresses",
      url: generatePath("/account/:customerSlug/delivery", { customerSlug: customerSlug2 })
    },
    {
      id: "carts",
      title: "Carts",
      url: generatePath("/account/:customerSlug/carts", { customerSlug: customerSlug2 })
    },
    {
      id: "orders",
      title: "Open Orders",
      url: generatePath("/account/:customerSlug/orders", { customerSlug: customerSlug2 })
    },
    {
      id: "invoices",
      title: "Invoices",
      url: generatePath("/account/:customerSlug/invoices", { customerSlug: customerSlug2 })
    }
  ];
}
const initialMenuState = {
  productMenu: null,
  productMenuStatus: "idle",
  resourcesMenu: null,
  resourcesMenuStatus: "idle",
  isOpen: false
};
const loadProductMenu = createAsyncThunk(
  "menus/productMenu",
  async () => {
    return fetchMenu(2);
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return !selectProductsMenuLoading(state);
    }
  }
);
const loadResourcesMenu = createAsyncThunk(
  "menus/loadResourcesMenu",
  async () => {
    return await fetchMenu(122);
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return !selectResourcesMenuLoading(state);
    }
  }
);
const selectProductMenu = (state) => state.menu.productMenu;
const selectResourcesMenu = (state) => state.menu.resourcesMenu;
const selectProductsMenuLoading = (state) => state.menu.productMenuStatus !== "idle";
const selectResourcesMenuLoading = (state) => state.menu.resourcesMenuStatus !== "loading";
const selectProductMenuLoaded = (state) => !!state.menu.productMenu;
const selectResourcesMenuLoaded = (state) => !!state.menu.resourcesMenu;
const selectIsDrawerOpen = (state) => state.menu.isOpen;
createSelector(
  [selectCustomerAccessList],
  (list) => list.map((row) => ({
    ...defaultMenuItem,
    title: `${row.CustomerName} (${row.ARDivisionNo}-${row.CustomerNo})`,
    url: accessListURL(row)
  }))
);
createSelector(
  [selectRepAccessList],
  (list) => list.map((row) => ({
    ...defaultMenuItem,
    title: `${row.SalespersonName} (${row.SalespersonDivisionNo}-${row.SalespersonNo})`,
    url: accessListURL(row)
  }))
);
const selectShouldLoadProductMenu = createSelector(
  [selectProductsMenuLoading, selectProductMenuLoaded],
  (loading, loaded) => !loading && !loaded
);
const selectShouldLoadResourcesMenu = createSelector(
  [selectResourcesMenuLoading, selectResourcesMenuLoaded],
  (loading, loaded) => !loading && !loaded
);
const toggleMenuDrawer = createAction("menu/toggleDrawer");
const menuReducer = createReducer(initialMenuState, (builder) => {
  builder.addCase(toggleMenuDrawer, (state, action) => {
    state.isOpen = action.payload ?? !state.isOpen;
  }).addCase(loadProductMenu.pending, (state) => {
    state.productMenuStatus = "loading";
  }).addCase(loadProductMenu.fulfilled, (state, action) => {
    state.productMenuStatus = "idle";
    state.productMenu = action.payload;
  }).addCase(loadProductMenu.rejected, (state) => {
    state.productMenuStatus = "rejected";
  }).addCase(loadResourcesMenu.pending, (state) => {
    state.resourcesMenuStatus = "loading";
  }).addCase(loadResourcesMenu.fulfilled, (state, action) => {
    state.resourcesMenuStatus = "idle";
    state.resourcesMenu = action.payload;
  }).addCase(loadResourcesMenu.rejected, (state) => {
    state.resourcesMenuStatus = "rejected";
  });
});
const fetchMessages = async () => {
  try {
    const response = await fetchJSON("/api/messages.json", { cache: "no-cache" });
    return response?.messages ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchMessages()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchMessages()", err);
    return Promise.reject(new Error("Error in fetchMessages()"));
  }
};
const selectActiveMessages = (state) => state.messages.list;
const selectMessagesLoading = (state) => state.messages.loading;
const selectMessagesLoaded = (state) => state.messages.loaded;
const loadMessages = createAsyncThunk(
  "messages/load",
  async () => {
    const messages = await fetchMessages();
    return {
      list: messages,
      loaded: (/* @__PURE__ */ new Date()).valueOf()
    };
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return !selectMessagesLoading(state);
    }
  }
);
const initialMessagesState = {
  list: [],
  loading: false,
  loaded: 0
};
const messagesReducer = createReducer(initialMessagesState, (builder) => {
  builder.addCase(loadMessages.pending, (state) => {
    state.loading = true;
  }).addCase(loadMessages.rejected, (state) => {
    state.loading = true;
  }).addCase(loadMessages.fulfilled, (state, action) => {
    state.list = action.payload.list;
    state.loaded = action.payload.loaded;
    state.loading = false;
  });
});
async function fetchPage(arg) {
  try {
    const url = `/api/pages/${encodeURIComponent(arg)}.json`;
    const response = await fetchJSON(url, { cache: "no-cache" });
    return response?.page ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchPage()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchPage()", err);
    return Promise.reject(new Error("Error in fetchPage()"));
  }
}
const selectPageLoadingStatus = (state) => state.page.status;
const selectPageLoaded = (state) => state.page.loaded;
const selectPageContent = (state) => state.page.content;
const selectPageHTML = (state) => state.page.html;
const loadPage = createAsyncThunk(
  "page/load",
  async (arg) => {
    return await fetchPage(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !!arg && selectPageLoadingStatus(state) === "idle";
    }
  }
);
const initialPageState = {
  list: [],
  keyword: null,
  status: "idle",
  loaded: false,
  content: null,
  html: null
};
const pageReducer = createReducer(initialPageState, (builder) => {
  builder.addCase(loadPage.pending, (state, action) => {
    state.status = "loading";
    state.loaded = false;
    if (action.meta.arg !== state.keyword) {
      state.content = null;
    }
    state.keyword = action.meta.arg ?? null;
  }).addCase(loadPage.fulfilled, (state, action) => {
    state.status = "idle";
    state.loaded = true;
    state.content = action.payload;
    state.html = action.payload?.content ?? null;
  }).addCase(loadPage.rejected, (state) => {
    state.status = "idle";
  });
});
const selectCurrentProduct = (state) => state.products.product;
const selectProductLoading = (state) => state.products.loading;
const selectSelectedProduct = (state) => state.products.selectedProduct;
const selectProductColorCode = (state) => state.products.colorCode;
const selectProductMSRP = (state) => state.products.msrp;
const selectProductSalesUM = (state) => state.products.salesUM;
const selectProductVariantId = (state) => state.products.variantId;
const selectProductCartItem = (state) => state.products.cartItem;
const selectProductCustomerKey = (state) => state.products.customerKey;
const selectProductImage = (state) => state.products.image;
const selectCurrentVariantProduct = createSelector(
  [selectCurrentProduct],
  (product) => {
    if (isSellAsVariants(product)) {
      return product;
    }
    return null;
  }
);
const selectProductAltImages = createSelector(
  [selectCurrentProduct],
  (product) => {
    return [...product?.images ?? []].sort((a, b) => a.id - b.id);
  }
);
createSelector(
  [selectProductCartItem],
  (cartItem) => cartItem?.season?.active ?? cartItem?.seasonAvailable ?? false
);
createSelector(
  [selectSelectedProduct, selectProductCartItem],
  (product, cartItem) => {
    return (isProduct(product) ? product.season_code : null) ?? (isCartProduct(cartItem) ? cartItem.seasonCode : null) ?? null;
  }
);
createSelector(
  [selectSelectedProduct, selectProductCartItem],
  (product, cartItem) => {
    return (isProduct(product) ? product?.season_available : null) ?? (isCartProduct(cartItem) ? cartItem.seasonAvailable : null) ?? null;
  }
);
createSelector(
  [selectSelectedProduct, selectProductCartItem],
  (product, cartItem) => {
    return (isProduct(product) ? product?.season_description : null) ?? (isCartProduct(cartItem) ? cartItem.seasonDescription : null) ?? null;
  }
);
createSelector(
  [selectSelectedProduct, selectProductCartItem],
  (product, cartItem) => {
    return (isProduct(product) ? product.season_teaser : null) ?? (isCartProduct(cartItem) ? cartItem.seasonTeaser : null) ?? null;
  }
);
async function fetchProduct(arg) {
  try {
    const url = "/api/products/v2/keyword/:keyword.json".replace(":keyword", encodeURIComponent(arg));
    const res = await fetchJSON(url, { cache: "no-cache" });
    const [product] = res?.products ?? [];
    return product ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchProduct()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchProduct()", err);
    return Promise.reject(new Error("Error in fetchProduct()"));
  }
}
const adapter$3 = createEntityAdapter({
  selectId: (arg) => customerPriceCodeKey(arg),
  sortComparer: (a, b) => customerPriceCodeKey(a).localeCompare(customerPriceCodeKey(b))
});
const selectors$3 = adapter$3.getSelectors();
const extraState$3 = {
  customerKey: null
};
const customerPricingSlice = createSlice({
  name: "customerPricing",
  initialState: adapter$3.getInitialState(extraState$3),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setCustomerAccount.fulfilled, (state, action) => {
      const customerKey2 = customerSlug(action.payload.customer);
      if (state.customerKey !== customerKey2) {
        adapter$3.removeAll(state);
      }
      state.customerKey = customerKey2;
    }).addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        adapter$3.removeAll(state);
        state.customerKey = null;
      }
    }).addCase(saveBillingAddress.fulfilled, (state, action) => {
      adapter$3.setAll(state, action.payload?.pricing ?? []);
    }).addCase(saveShipToAddress.fulfilled, (state, action) => {
      adapter$3.setAll(state, action.payload?.pricing ?? []);
    }).addCase(loadCustomer.pending, (state, action) => {
      const customerKey2 = customerSlug(action.meta.arg);
      if (state.customerKey !== customerKey2) {
        state.customerKey = customerKey2;
        adapter$3.removeAll(state);
      }
    }).addCase(loadCustomer.fulfilled, (state, action) => {
      state.customerKey = customerSlug(action.payload?.customer ?? null);
      adapter$3.setAll(state, action.payload?.pricing ?? []);
    }).addCase(setUserAccess.pending, (state, action) => {
      if (!action.meta.arg?.isRepAccount && customerSlug(action.meta.arg) !== state.customerKey) {
        adapter$3.removeAll(state);
      }
    }).addCase(loadCustomerList.fulfilled, (state, action) => {
      if (state.customerKey) {
        const customer = action.payload.find((customer2) => customerSlug(customer2) === state.customerKey);
        if (!customer) {
          adapter$3.removeAll(state);
        }
      }
    });
  },
  selectors: {
    selectCustomerPricing: (state) => selectors$3.selectAll(state),
    selectCustomerPricingById: (state, key) => selectors$3.selectById(state, key)
  }
});
const { selectCustomerPricing, selectCustomerPricingById } = customerPricingSlice.selectors;
const loadProduct = createAsyncThunk(
  "products/current/load",
  async (arg, { getState }) => {
    const product = await fetchProduct(arg);
    const state = getState();
    const loggedIn = selectLoggedIn(state);
    const pricing = selectCustomerPricing(state);
    const variant = hasVariants(product) ? defaultVariant(product) : null;
    const msrp = getMSRP(variant?.product ?? product);
    const customerPrice = loggedIn ? getPrices(variant?.product ?? product, pricing) : [...msrp];
    const salesUM = getSalesUM(variant?.product ?? product);
    const cartItem = defaultCartItem(variant?.product ?? product, {
      colorCode: variant?.product?.defaultColor || product?.defaultColor
    });
    if (cartItem && customerPrice.length) {
      cartItem.price = customerPrice[0];
    }
    return {
      product,
      variant,
      msrp,
      customerPrice,
      salesUM,
      cartItem
    };
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !selectProductLoading(state);
    }
  }
);
const setColorCode = createAsyncThunk(
  "products/setColorCode",
  (arg, { getState }) => {
    const state = getState();
    const existingCartItem = selectProductCartItem(state);
    const selectedProduct = selectSelectedProduct(state);
    const customerKey2 = selectProductCustomerKey(state);
    const customerPricing = selectCustomerPricing(state);
    const account = selectCustomerAccount(state);
    if (isSellAsColors(selectedProduct)) {
      const quantity = existingCartItem?.quantity ?? 1;
      const uom = existingCartItem?.salesUM;
      let cartItem = defaultCartItem(selectedProduct, { colorCode: arg });
      if (cartItem && cartItem?.salesUM === uom) {
        cartItem.quantity = quantity;
      }
      if (customerKey2) {
        cartItem = updateCartProductPricing(cartItem, customerPricing);
        if (cartItem) {
          cartItem.priceLevel = account?.PriceLevel ?? "";
        }
      }
      if (cartItem && !cartItem.image) {
        cartItem.image = parseImageFilename(selectedProduct.image, cartItem?.colorCode ?? selectedProduct.defaultColor);
      }
      return cartItem;
    } else if (!!existingCartItem && isSellAsMix(selectedProduct)) {
      const [item] = selectedProduct.mix.items.filter((item2) => item2.color?.code === arg);
      const cartItem = { ...existingCartItem };
      cartItem.priceLevel = account?.PriceLevel ?? "";
      cartItem.colorName = item?.color?.name ?? item?.color?.code ?? "";
      cartItem.colorCode = item?.color?.code ?? item.color_code ?? "";
      cartItem.image = parseImageFilename(item.additionalData?.image_filename ?? selectedProduct.image, cartItem?.colorCode ?? selectedProduct.defaultColor);
      return cartItem;
    }
    return null;
  }
);
const setCurrentVariant = createAsyncThunk(
  "products/setVariant",
  (arg, { getState }) => {
    const state = getState();
    const loggedIn = selectLoggedIn(state);
    const customerKey2 = selectProductCustomerKey(state);
    const priceCodes = selectCustomerPricing(state);
    const customerAccount = selectCustomerAccount(state);
    const msrp = getMSRP(arg.product);
    const customerPrice = loggedIn ? getPrices(arg.product, priceCodes) : [...msrp];
    const salesUM = getSalesUM(arg.product);
    const colorCode = selectProductColorCode(state);
    let cartItem = defaultCartItem(arg.product ?? null, { itemCode: arg.preferredItem, colorCode });
    if (customerKey2) {
      cartItem = updateCartProductPricing(cartItem, priceCodes);
      if (cartItem) {
        cartItem.priceLevel = customerAccount?.PriceLevel ?? "";
      }
    }
    return {
      variant: arg,
      msrp,
      customerPrice,
      salesUM,
      cartItem
    };
  }
);
const setCartItemQuantity = createAction("product/cartItem/setQuantity");
const initialProductsState = {
  keyword: null,
  product: null,
  selectedProduct: null,
  selectedItemCode: null,
  image: null,
  colorCode: "",
  variantId: null,
  loading: false,
  msrp: [],
  customerPrice: [],
  salesUM: null,
  cartItem: null,
  pricing: [],
  customerKey: null
};
const productsReducer = createReducer(initialProductsState, (builder) => {
  builder.addCase(setLoggedIn, (state, action) => {
    if (!action.payload?.loggedIn) {
      state.customerKey = null;
      state.pricing = [];
      state.customerPrice = [];
    }
  }).addCase(loadCustomer.pending, (state) => {
    state.pricing = [];
  }).addCase(loadCustomer.fulfilled, (state, action) => {
    state.customerKey = customerSlug(action.payload?.customer ?? null);
    state.pricing = [...action.payload?.pricing ?? []].sort(customerPriceRecordSorter);
    state.msrp = getMSRP(state.selectedProduct);
    state.customerPrice = state.customerKey ? getPrices(state.selectedProduct, state.pricing) : state.msrp;
    if (isCartProduct(state.cartItem)) {
      state.cartItem.priceLevel = action.payload?.customer.PriceLevel ?? "";
      state.cartItem = updateCartProductPricing(state.cartItem, state.pricing);
    }
  }).addCase(loadProduct.pending, (state, action) => {
    state.loading = true;
    if (action.meta.arg !== state.keyword) {
      state.keyword = action.meta.arg;
      state.product = null;
      state.image = null;
    }
  }).addCase(loadProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.product = action.payload?.product ?? null;
    state.selectedProduct = action.payload?.variant?.product ?? action.payload?.product ?? null;
    state.variantId = action.payload?.variant?.id ?? null;
    state.msrp = action.payload?.msrp ?? [];
    state.salesUM = action.payload?.salesUM ?? null;
    state.customerPrice = action.payload?.customerPrice ?? [];
    state.cartItem = action.payload?.cartItem ?? null;
    state.colorCode = action.payload?.cartItem?.colorCode ?? action.payload?.variant?.product?.defaultColor ?? action.payload?.product?.defaultColor ?? "";
    state.image = {
      filename: parsePossiblyMissingFilename(state.cartItem?.image ?? state.selectedProduct?.image ?? null, state.colorCode),
      itemCode: getImageItemCode(state)
    };
    state.image.filename = parsePossiblyMissingFilename(state.cartItem?.image ?? state.selectedProduct?.image ?? null, state.colorCode);
    state.image.itemCode = getImageItemCode(state);
  }).addCase(loadProduct.rejected, (state) => {
    state.loading = false;
  }).addCase(setColorCode.fulfilled, (state, action) => {
    state.colorCode = action.meta.arg;
    state.cartItem = action.payload;
    state.image = {
      filename: parsePossiblyMissingFilename(state.cartItem?.image ?? state.selectedProduct?.image ?? null, state.colorCode),
      itemCode: getImageItemCode(state)
    };
  }).addCase(setCartItemQuantity, (state, action) => {
    if (state.cartItem) {
      state.cartItem.quantity = action.payload;
    }
  }).addCase(setCurrentVariant.fulfilled, (state, action) => {
    state.selectedProduct = action.payload.variant?.product ?? null;
    state.colorCode = action.payload?.cartItem?.colorCode ?? action.payload?.variant?.product?.defaultColor ?? "";
    state.variantId = action.payload.variant?.id ?? null;
    state.msrp = action.payload.msrp;
    state.salesUM = action.payload.salesUM;
    state.customerPrice = action.payload.customerPrice;
    state.cartItem = action.payload.cartItem;
    state.image = {
      filename: action.payload.cartItem?.image ?? null,
      itemCode: getImageItemCode(state)
    };
  });
});
async function fetchPromoCodes() {
  try {
    const res = await fetchJSON("/api/sales/b2b/promo/?valid=1", { cache: "no-cache" });
    return res?.promo_codes ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("loadPromoCodes()", err.message);
      return Promise.reject(err);
    }
    console.debug("loadPromoCodes()", err);
    return Promise.reject(new Error("Error in loadPromoCodes()"));
  }
}
async function fetchPromoCode(arg) {
  try {
    const url = "/api/sales/b2b/promo/:code?valid=1".replace(":code", encodeURIComponent(arg));
    const res = await fetchJSON(url, { cache: "no-cache" });
    const [promo] = res?.promo_codes ?? [];
    return promo ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchPromoCode()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchPromoCode()", err);
    return Promise.reject(new Error("Error in fetchPromoCode()"));
  }
}
const selectPromoCodesLoading = (state) => state.promo_code.loading;
const loadPromoCodes = createAsyncThunk(
  "promoCodes/load",
  async () => {
    return await fetchPromoCodes();
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !selectPromoCodesLoading(state);
    }
  }
);
createAction("promoCodes/setCurrent");
const loadPromoCode = createAsyncThunk(
  "promoCodes/current/load",
  async (arg) => {
    const promoCode = await fetchPromoCode(arg);
    if (!promoCode) {
      return Promise.reject(new Error(`Sorry! '${arg}' is not a valid promo code.`));
    }
    return promoCode;
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !selectPromoCodesLoading(state);
    }
  }
);
const promoCodeSorter = (a, b) => a.id - b.id;
const initialPromoCodeState = {
  current: null,
  list: [],
  loading: false
};
const promoCodeReducer = createReducer(initialPromoCodeState, (builder) => {
  builder.addCase(loadPromoCodes.pending, (state) => {
    state.loading = true;
  }).addCase(loadPromoCodes.fulfilled, (state, action) => {
    state.loading = false;
    state.list = action.payload.sort(promoCodeSorter);
    const [promo] = action.payload.filter((pc) => !pc.require_code_entry);
    if (!state.current) {
      state.current = promo ?? null;
    }
  }).addCase(loadPromoCodes.rejected, (state) => {
    state.loading = false;
  }).addCase(loadPromoCode.pending, (state) => {
    state.loading = true;
  }).addCase(loadPromoCode.fulfilled, (state, action) => {
    state.current = action.payload;
    const list = state.list.filter((pc) => pc.promo_code !== action.meta.arg);
    if (action.payload) {
      list.push(action.payload);
    }
    state.list = list.sort(promoCodeSorter);
  }).addCase(setLoggedIn, (state, action) => {
    if (!action.payload?.loggedIn) {
      state.list = [];
      state.current = null;
    }
  });
});
async function fetchSearchResults(arg) {
  try {
    const params = new URLSearchParams();
    params.set("term", arg);
    const url = `/api/search.json?${params.toString()}`;
    const response = await fetchJSON(url);
    return response ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchSearchResults()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchSearchResults()", err);
    return Promise.reject(new Error("Error in fetchSearchResults()"));
  }
}
const initialSearchState = () => ({
  term: "",
  results: [],
  loading: false,
  show: false
});
const selectSearchResults = (state) => state.search.results;
const selectSearchLoading = (state) => state.search.loading;
const setSearchTerm = createAction("search/setTerm");
const showSearch = createAction("search/show");
const getSearchResults = createAsyncThunk(
  "search/load",
  async (arg) => {
    ga4Search(arg);
    return await fetchSearchResults(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return arg.trim().length > 2 && !selectSearchLoading(state);
    }
  }
);
const searchReducer = createReducer(initialSearchState, (builder) => {
  builder.addCase(setSearchTerm, (state, action) => {
    state.term = action.payload;
  }).addCase(showSearch, (state, action) => {
    state.show = action.payload ?? !state.show;
  }).addCase(getSearchResults.pending, (state) => {
    state.loading = true;
  }).addCase(getSearchResults.fulfilled, (state, action) => {
    state.loading = false;
    state.results = action.payload;
    state.show = state.results.length > 0;
  }).addCase(getSearchResults.rejected, (state) => {
    state.loading = false;
  });
});
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isEmail = (email) => emailRegex.test(email);
const signUpUser = createAsyncThunk(
  "signUp/signUpUser",
  async (arg) => {
    return await postSignUpUser(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return isEmail(arg.email) && arg.agreeToPolicy && selectSignUpStatus(state) === "idle";
    }
  }
);
const loadSignUpProfile = createAsyncThunk(
  "signUp/loadSignUpProfile",
  async (arg) => {
    return await fetchSignUpProfile(arg);
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return selectSignUpStatus(state) === "idle";
    }
  }
);
const initialState = {
  profile: null,
  error: null,
  status: "idle"
};
const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.status = "saving";
    }).addCase(signUpUser.fulfilled, (state, action) => {
      state.status = action.payload?.success ? "success" : "rejected";
      state.error = action.payload?.message ?? "An unexpected error occurred";
    }).addCase(signUpUser.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message ?? null;
    }).addCase(setLoggedIn, (state) => {
      state.profile = null;
    }).addCase(loadSignUpProfile.pending, (state) => {
      state.status = "loading";
    }).addCase(loadSignUpProfile.fulfilled, (state, action) => {
      if (!isErrorResponse(action.payload)) {
        state.profile = action.payload;
      }
      state.status = "idle";
    }).addCase(loadSignUpProfile.rejected, (state) => {
      state.profile = null;
      state.status = "idle";
    });
  },
  selectors: {
    selectSignUpProfile: (state) => state.profile,
    selectSignUpStatus: (state) => state.status,
    selectSignUpError: (state) => state.error
  }
});
const { selectSignUpProfile, selectSignUpStatus, selectSignUpError } = signUpSlice.selectors;
const isVersionResponse = (version) => {
  return version.versionNo !== void 0;
};
async function fetchVersion() {
  try {
    const response = await fetchJSON("/version", { cache: "no-cache" });
    return (isVersionResponse(response?.version) ? response.version.versionNo : response?.version) ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("fetchVersion()", err.message);
      return Promise.reject(err);
    }
    console.debug("fetchVersion()", err);
    return Promise.reject(new Error("Error in fetchVersion()"));
  }
}
const loadVersion = createAsyncThunk(
  "version/load",
  async () => {
    const versionNo = await fetchVersion();
    SessionStore.setItem(STORE_VERSION, versionNo);
    const lastChecked = (/* @__PURE__ */ new Date()).valueOf();
    return { versionNo, lastChecked };
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return arg === true || !selectVersionLoading(state) && selectShouldCheckVersion(state);
    }
  }
);
const ignoreVersion = createAction("version/ignore");
const minCheckInterval = 15 * 60 * 1e3;
const selectVersion = (state) => state.version.versionNo;
const selectVersionLoading = (state) => state.version.loading;
const selectVersionChanged = (state) => state.version.changed;
const selectLastChecked = (state) => state.version.lastChecked;
const selectVersionIgnored = (state) => state.version.ignored;
const selectShouldAlertVersion = createSelector(
  [selectVersion, selectVersionChanged, selectVersionIgnored],
  (version, changed, ignored) => {
    return changed && !!version && version !== ignored;
  }
);
const selectShouldCheckVersion = createSelector(
  [selectVersion, selectLastChecked],
  (version, lastChecked) => {
    if (!version || !lastChecked) {
      return true;
    }
    return lastChecked + minCheckInterval < (/* @__PURE__ */ new Date()).valueOf();
  }
);
const initialVersionState = {
  versionNo: null,
  loading: false,
  changed: false,
  ignored: null,
  lastChecked: 0
};
const versionReducer = createReducer(initialVersionState, (builder) => {
  builder.addCase(loadVersion.pending, (state) => {
    state.loading = true;
  }).addCase(loadVersion.fulfilled, (state, action) => {
    state.loading = false;
    state.changed = !!state.versionNo && action.payload.versionNo !== state.versionNo;
    state.versionNo = action.payload.versionNo;
    state.lastChecked = action.payload.lastChecked;
  }).addCase(loadVersion.rejected, (state) => {
    state.loading = false;
  }).addCase(ignoreVersion, (state) => {
    state.ignored = state.versionNo;
  });
});
const adapter$2 = createEntityAdapter({
  selectId: (arg) => arg.id,
  sortComparer: (a, b) => a.id - b.id
});
const selectors$2 = adapter$2.getSelectors();
const extraState$2 = {
  customerKey: null,
  status: "idle",
  sort: { field: "name", ascending: true }
};
const customerUsersSlice = createSlice({
  name: "customerUsers",
  initialState: adapter$2.getInitialState(extraState$2),
  reducers: {
    setCustomerUsersSort: (state, action) => {
      state.sort = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadCustomerUsers.pending, (state, action) => {
      state.status = "loading";
    }).addCase(loadCustomerUsers.fulfilled, (state, action) => {
      state.status = "idle";
      adapter$2.setAll(state, action.payload);
    }).addCase(saveUser.pending, (state) => {
      state.status = "saving";
    }).addCase(saveUser.fulfilled, (state, action) => {
      state.status = "idle";
      adapter$2.setAll(state, action.payload);
    }).addCase(removeUser.pending, (state) => {
      state.status = "deleting";
    }).addCase(removeUser.fulfilled, (state, action) => {
      state.status = "idle";
      adapter$2.setAll(state, action.payload);
    }).addCase(setCustomerAccount.fulfilled, (state, action) => {
      const nextKey = customerSlug(action.payload.customer);
      if (state.customerKey !== nextKey) {
        adapter$2.removeAll(state);
      }
      state.customerKey = nextKey;
    }).addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        adapter$2.removeAll(state);
      }
    }).addCase(saveBillingAddress.fulfilled, (state, action) => {
      adapter$2.setAll(state, action.payload?.users ?? []);
    }).addCase(saveShipToAddress.fulfilled, (state, action) => {
      adapter$2.setAll(state, action.payload?.users ?? []);
    }).addCase(loadCustomer.pending, (state, action) => {
      if (state.customerKey !== customerSlug(action.meta.arg)) {
        adapter$2.removeAll(state);
      }
    }).addCase(loadCustomer.fulfilled, (state, action) => {
      adapter$2.setAll(state, action.payload?.users ?? []);
    }).addCase(setUserAccess.pending, (state, action) => {
      if (!action.meta.arg?.isRepAccount && customerSlug(action.meta.arg) !== state.customerKey) {
        adapter$2.removeAll(state);
      }
    }).addCase(loadCustomerList.fulfilled, (state, action) => {
      if (state.customerKey) {
        const customer = action.payload.find((customer2) => customerSlug(customer2) === state.customerKey);
        if (!customer) {
          adapter$2.removeAll(state);
        }
      }
    }).addMatcher(isAnyOf(loadCustomerUsers.rejected, removeUser.rejected, saveUser.rejected), (state) => {
      state.status = "rejected";
    }).addMatcher(isDismissedAction, (state) => {
      state.status = "idle";
    });
  },
  selectors: {
    selectCustomerUsers: (state) => selectors$2.selectAll(state),
    selectCustomerUsersSort: (state) => state.sort,
    selectCustomerUsersStatus: (state) => state.status
  }
});
const { setCustomerUsersSort } = customerUsersSlice.actions;
const { selectCustomerUsers, selectCustomerUsersStatus, selectCustomerUsersSort } = customerUsersSlice.selectors;
const selectPermittedCustomerUsers = createSelector(
  [selectCustomerUsers, selectPermittedBillToAddress, selectPermittedShipToAddresses, selectCustomerUsersSort],
  (users, billTo, shipToAddresses, sort) => {
    return users.filter((user) => billTo || shipToAddresses.filter((addr) => user.shipToCode?.includes(addr.ShipToCode)).length > 0).sort(customerUserSorter(sort));
  }
);
function isDismissedAction(action) {
  if (typeof action.payload === "string") {
    return [saveUser.typePrefix, removeUser.typePrefix, loadCustomerUsers.typePrefix].includes(action.payload);
  }
  return false;
}
const adapter$1 = createEntityAdapter({
  selectId: (arg) => arg.CreditCardGUID,
  sortComparer: (a, b) => a.CreditCardGUID.localeCompare(b.CreditCardGUID)
});
const selectors$1 = adapter$1.getSelectors();
const extraState$1 = {
  customerKey: null
};
const customerPaymentCardsSlice = createSlice({
  name: "customerPaymentCards",
  initialState: adapter$1.getInitialState(extraState$1),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setCustomerAccount.fulfilled, (state, action) => {
      const customerKey2 = customerSlug(action.payload.customer);
      if (state.customerKey !== customerKey2) {
        state.customerKey = customerKey2;
        adapter$1.removeAll(state);
      }
    }).addCase(setLoggedIn, (state, action) => {
      if (!action.payload.loggedIn) {
        state.customerKey = null;
        adapter$1.removeAll(state);
      }
    }).addCase(saveBillingAddress.fulfilled, (state, action) => {
      adapter$1.setAll(state, action.payload?.paymentCards ?? []);
    }).addCase(saveShipToAddress.fulfilled, (state, action) => {
      adapter$1.setAll(state, action.payload?.paymentCards ?? []);
    }).addCase(loadCustomer.pending, (state, action) => {
      const customerKey2 = customerSlug(action.meta.arg);
      if (state.customerKey !== customerKey2) {
        state.customerKey = customerKey2;
        adapter$1.removeAll(state);
      }
    }).addCase(loadCustomer.fulfilled, (state, action) => {
      state.customerKey = customerSlug(action.payload?.customer ?? null);
      adapter$1.setAll(state, action.payload?.paymentCards ?? []);
    }).addCase(setUserAccess.pending, (state, action) => {
      if (!action.meta.arg?.isRepAccount && customerSlug(action.meta.arg) !== state.customerKey) {
        adapter$1.removeAll(state);
      }
    }).addCase(loadCustomerList.fulfilled, (state, action) => {
      if (state.customerKey) {
        const customer = action.payload.find((customer2) => customerSlug(customer2) === state.customerKey);
        if (!customer) {
          adapter$1.removeAll(state);
        }
      }
    });
  },
  selectors: {
    selectCustomerPaymentCards: (state) => selectors$1.selectAll(state)
  }
});
const { selectCustomerPaymentCards } = customerPaymentCardsSlice.selectors;
const selectActiveCustomerPaymentCards = createSelector(
  [selectCustomerPaymentCards],
  (cards) => {
    const exp = dayjs().format("YYYY-MM");
    return cards.filter((card) => `${card.ExpirationDateYear}-${card.ExpirationDateMonth}` >= exp);
  }
);
const loadRepList = createAsyncThunk(
  "reps/load",
  async () => {
    return await fetchRepList();
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return selectLoggedIn(state) && selectRepsLoading(state) === "idle";
    }
  }
);
const adapter = createEntityAdapter({
  selectId: (arg) => salespersonKey(arg),
  sortComparer: (a, b) => salespersonKey(a).localeCompare(salespersonKey(b))
});
const selectors = adapter.getSelectors();
const extraState = {
  status: "idle",
  loaded: false
};
const salespersonSlice = createSlice({
  name: "reps",
  initialState: adapter.getInitialState(extraState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setLoggedIn, (state, action) => {
      if (!action.payload?.loggedIn) {
        adapter.removeAll(state);
        state.loaded = false;
      }
    }).addCase(loadRepList.pending, (state) => {
      state.status = "loading";
    }).addCase(loadRepList.fulfilled, (state, action) => {
      state.status = "idle";
      state.loaded = true;
      adapter.setAll(state, action.payload);
    }).addCase(loadRepList.rejected, (state) => {
      state.status = "idle";
      state.loaded = true;
      adapter.removeAll(state);
    });
  },
  selectors: {
    selectAll: (state) => selectors.selectAll(state),
    selectRepsLoading: (state) => state.status,
    selectRepsLoaded: (state) => state.loaded
  }
});
const {
  selectAll,
  selectRepsLoading,
  selectRepsLoaded
} = salespersonSlice.selectors;
const selectRepsList = createSelector(
  [selectAll],
  (list) => {
    return [...list].sort(userRepListSort);
  }
);
const rootReducer = combineReducers({
  [alertsSlice.reducerPath]: alertsSlice.reducer,
  app: appReducer,
  [bannersSlice.reducerPath]: bannersSlice.reducer,
  [cartHeadersSlice.reducerPath]: cartHeadersSlice.reducer,
  [cartDetailSlice.reducerPath]: cartDetailSlice.reducer,
  [cartStatusSlice.reducerPath]: cartStatusSlice.reducer,
  [cartEmailSlice.reducerPath]: cartEmailSlice.reducer,
  [cartMessagesSlice.reducerPath]: cartMessagesSlice.reducer,
  [cartStatusSlice$1.reducerPath]: cartStatusSlice$1.reducer,
  [activeCartSlice.reducerPath]: activeCartSlice.reducer,
  category: categoryReducer,
  [cookieConsentSlice.reducerPath]: cookieConsentSlice.reducer,
  customer: customerReducer,
  [currentCustomerSlice.reducerPath]: currentCustomerSlice.reducer,
  [customerPaymentCardsSlice.reducerPath]: customerPaymentCardsSlice.reducer,
  [customerPermissionsSlice.reducerPath]: customerPermissionsSlice.reducer,
  [customerPricingSlice.reducerPath]: customerPricingSlice.reducer,
  [customerShipToAddressSlice.reducerPath]: customerShipToAddressSlice.reducer,
  [customerUsersSlice.reducerPath]: customerUsersSlice.reducer,
  [customerListSlice.reducerPath]: customerListSlice.reducer,
  [recentCustomersSlice.reducerPath]: recentCustomersSlice.reducer,
  [invoiceListSlice.reducerPath]: invoiceListSlice.reducer,
  [currentInvoiceSlice.reducerPath]: currentInvoiceSlice.reducer,
  itemLookup: itemLookupReducer,
  keywords: keywordsReducer,
  menu: menuReducer,
  messages: messagesReducer,
  [openOrdersSlice.reducerPath]: openOrdersSlice.reducer,
  [currentOrderSlice.reducerPath]: currentOrderSlice.reducer,
  page: pageReducer,
  products: productsReducer,
  promo_code: promoCodeReducer,
  [salespersonSlice.reducerPath]: salespersonSlice.reducer,
  search: searchReducer,
  [signUpSlice.reducerPath]: signUpSlice.reducer,
  [userProfileSlice.reducerPath]: userProfileSlice.reducer,
  [userAccessSlice.reducerPath]: userAccessSlice.reducer,
  version: versionReducer
});
const createServerSideStore = (preload) => configureStore({
  reducer: rootReducer,
  preloadedState: {
    ...preload,
    banners: getPreloadedBannersState(preload.banners?.list ?? [])
  }
});
const PasswordTextField = React.forwardRef(
  function PasswordInput(props, ref) {
    const [showPassword, setShowPassword] = useState(false);
    const {
      slotProps,
      ...rest
    } = props;
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const renderInputAdornment = () => /* @__PURE__ */ jsx(InputAdornment, { position: "end", children: /* @__PURE__ */ jsx(
      IconButton,
      {
        "aria-label": "toggle password visibility",
        onClick: handleClickShowPassword,
        onMouseDown: handleMouseDownPassword,
        edge: "end",
        children: showPassword ? /* @__PURE__ */ jsx(VisibilityOff, {}) : /* @__PURE__ */ jsx(Visibility, {})
      }
    ) });
    return /* @__PURE__ */ jsx(
      TextField,
      {
        slotProps: {
          ...slotProps,
          input: {
            ...slotProps?.input,
            ref,
            type: showPassword ? "text" : "password",
            endAdornment: renderInputAdornment()
          }
        },
        ...rest
      }
    );
  }
);
const LoginLocal = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectUserLoading);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert2] = useState(null);
  const submitHandler = async (ev) => {
    ev.preventDefault();
    if (forgotPassword) {
      await dispatch(resetPassword(email));
      setForgotPassword(false);
      return;
    }
    const res = await dispatch(loginUser({ email, password }));
    if (isErrorResponse(res.payload)) {
      setAlert2(res.payload.error ?? null);
      setPassword("");
    }
  };
  return /* @__PURE__ */ jsx(Box, { component: "form", onSubmit: submitHandler, children: /* @__PURE__ */ jsxs(Stack, { direction: "column", children: [
    !!alert && /* @__PURE__ */ jsx(Alert, { severity: "warning", sx: { my: 3 }, children: alert }),
    loading && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate", title: "Processing Login Request" }),
    /* @__PURE__ */ jsx(Typography, { component: "h3", children: "Login with your credentials" }),
    /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center", mb: 1 }, children: [
      /* @__PURE__ */ jsx(AccountCircle, { sx: { color: "action.active", mr: 1 } }),
      /* @__PURE__ */ jsx(
        TextField,
        {
          type: "email",
          fullWidth: true,
          variant: "filled",
          label: "Email",
          onChange: (ev) => setEmail(ev.target.value),
          value: email,
          autoComplete: "username",
          slotProps: {
            htmlInput: { maxLength: 255 },
            inputLabel: { shrink: true }
          },
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center", mb: 1 }, children: [
      /* @__PURE__ */ jsx(KeyIcon, { sx: { color: "action.active", mr: 1 } }),
      /* @__PURE__ */ jsx(
        PasswordTextField,
        {
          variant: "filled",
          fullWidth: true,
          label: "Password",
          onChange: (ev) => setPassword(ev.target.value),
          value: password,
          autoComplete: "current-password",
          slotProps: {
            htmlInput: { maxLength: 128 },
            inputLabel: { shrink: true }
          },
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, useFlexGap: true, justifyContent: "flex-end", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "text", component: Link$1, to: "/reset-password", children: "Forgot Password" }),
      /* @__PURE__ */ jsx(Button, { type: "submit", variant: "contained", children: "Sign In" })
    ] })
  ] }) });
};
const selectAppNonce = (state) => state.app.nonce;
const GoogleSignInButton = () => {
  const dispatch = useAppDispatch();
  const nonce = useAppSelector(selectAppNonce);
  const handleGoogleResponse = (credentialResponse) => {
    if (credentialResponse.credential) {
      dispatch(signInWithGoogle(credentialResponse.credential));
    }
  };
  return /* @__PURE__ */ jsx(GoogleLogin, { onSuccess: handleGoogleResponse, use_fedcm_for_prompt: true, nonce: nonce ?? void 0 });
};
GoogleSignInButton.displayName = "GoogleSignInButton";
const DocumentTitle = ({ documentTitle }) => {
  const [title, setTitle] = useState(documentTitle ?? "Chums B2B Dealer Website");
  useEffect(() => {
    setTitle(documentTitle ?? "Chums B2B Dealer Website");
  }, [documentTitle]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("title", { children: [title, "Chums B2B"].join(" | ") }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: [title, "Chums B2B"].join(" | ") })
  ] });
};
const AccessWarningAlert = () => {
  return /* @__PURE__ */ jsxs(Alert, { severity: "error", title: "WARNING:", sx: { my: 3, p: 5 }, children: [
    /* @__PURE__ */ jsx(Typography, { sx: { fontWeight: "bold", marginRight: 1, mb: 1 }, children: "WARNING" }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(Typography, { children: "Unauthorized access to this system is forbidden and will be prosecuted by law. By accessing this system, you agree that your actions may be monitored if unauthorized usage is suspected." })
  ] });
};
const LoginPage = () => {
  const loggedIn = useAppSelector(selectLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, []);
  useEffect(() => {
    if (loggedIn && location.pathname === "/login") {
      navigate(PATH_PROFILE, { replace: true });
    }
  }, [loggedIn]);
  return /* @__PURE__ */ jsxs(Container, { maxWidth: "sm", children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle: documentTitles.login }),
    /* @__PURE__ */ jsx(Typography, { variant: "h1", component: "h1", sx: { my: 3 }, children: "Chums B2B Portal" }),
    /* @__PURE__ */ jsx(Typography, { variant: "body1", children: "Hey there friend! This site is for authorized Chums dealers only." }),
    !!message && /* @__PURE__ */ jsx(Alert, { severity: "info", sx: { my: 3 }, onClose: () => setMessage(null), children: message }),
    /* @__PURE__ */ jsxs(Stack, { direction: "column", sx: { mt: 5 }, spacing: 3, children: [
      /* @__PURE__ */ jsx(Typography, { component: "h2", variant: "h3", children: "Login" }),
      /* @__PURE__ */ jsxs(Box, { children: [
        /* @__PURE__ */ jsx(Typography, { component: "h3", children: "Login with Google" }),
        /* @__PURE__ */ jsx(GoogleSignInButton, {})
      ] }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(LoginLocal, {})
    ] }),
    /* @__PURE__ */ jsx(AccessWarningAlert, {})
  ] });
};
const defaultProfilePic = (email) => email?.endsWith("@chums.com") ? "/images/chums/Chums_Logo_Booby.png" : null;
const UserProfile = () => {
  const dispatch = useAppDispatch();
  const imageUrl = useAppSelector(selectProfilePicture);
  const profile = useAppSelector(selectUserProfile);
  const authType = useAppSelector(selectAuthType);
  const loading = useAppSelector(selectUserLoading);
  const [user, setUser] = useState(profile);
  const [profilePic, setProfilePic] = useState(imageUrl ?? defaultProfilePic(profile?.email));
  useEffect(() => {
    if (!profile) {
      setUser(null);
      setProfilePic(null);
      return;
    }
    const { name, email } = profile;
    setUser({ name, email });
    setProfilePic(imageUrl ?? defaultProfilePic(email));
  }, [profile, imageUrl]);
  const submitHandler = (ev) => {
    ev.preventDefault();
    if (!user) {
      return;
    }
    dispatch(saveUserProfile(user));
  };
  const changeHandler = (field) => (ev) => {
    if (!user) {
      return;
    }
    setUser({ ...user, [field]: ev.target.value, changed: true });
  };
  const refreshHandler = () => {
    dispatch(loadProfile());
  };
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  const clearSettingsHandler = () => {
  };
  const renderEmailLockIcon = () => {
    return authType === AUTH_GOOGLE ? /* @__PURE__ */ jsx(
      InputAdornment,
      {
        position: "end",
        title: "Logged in with Google",
        sx: { cursor: "not-allowed" },
        children: /* @__PURE__ */ jsx(LockPersonIcon, {})
      }
    ) : null;
  };
  return /* @__PURE__ */ jsxs(Container, { maxWidth: "xl", children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h1", component: "h1", sx: { mb: 5 }, children: "Login Profile" }),
    /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 3, alignItems: "start", children: [
      /* @__PURE__ */ jsx(Grid, { size: { xs: 3, sm: 2 }, sx: { display: "flex", justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ jsx(
        Avatar,
        {
          alt: user?.name,
          src: profilePic ?? void 0,
          sx: { width: 80, height: 80 },
          slotProps: { img: { referrerPolicy: "no-referrer" } },
          variant: "rounded"
        }
      ) }),
      /* @__PURE__ */ jsx(Grid, { size: { xs: 9, sm: 10 }, children: /* @__PURE__ */ jsxs("form", { onSubmit: submitHandler, children: [
        loading && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate", sx: { mb: 1 } }),
        /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: { xs: "column", lg: "row" }, children: [
          /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Name",
              type: "text",
              fullWidth: true,
              variant: "filled",
              size: "small",
              value: user?.name ?? "",
              onChange: changeHandler("name"),
              slotProps: {
                htmlInput: { maxLength: 45 }
              }
            }
          ),
          /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Email Address",
              type: "email",
              fullWidth: true,
              variant: "filled",
              size: "small",
              value: user?.email ?? "",
              onChange: changeHandler("email"),
              slotProps: {
                htmlInput: { readOnly: authType !== AUTH_LOCAL, maxLength: 255 },
                input: { endAdornment: renderEmailLockIcon() }
              },
              helperText: authType === AUTH_GOOGLE ? "Please contact CHUMS customer service if you need to change your email address" : void 0
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, sx: { mt: 5 }, useFlexGap: true, justifyContent: "flex-end", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "text", onClick: logoutHandler, color: "error", children: "Logout" }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "text", onClick: refreshHandler, children: "Refresh" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "text",
              disabled: authType !== AUTH_LOCAL,
              component: Link$1,
              to: "/profile/set-password",
              children: "Change Password"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "text", onClick: clearSettingsHandler, children: "Clear All Settings" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "contained", disabled: !user?.changed, children: "Save Changes" })
        ] }),
        user?.changed && /* @__PURE__ */ jsx(Alert, { severity: "warning", children: "Don't forget to save your changes." })
      ] }) })
    ] })
  ] });
};
const protectedSettings = [
  STORE_AUTHTYPE,
  STORE_TOKEN
];
function StoredSettings(props) {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(getSettings());
  const removeSettingHandler = (key) => {
    LocalStore.removeItem(key);
    switch (key) {
      case STORE_CUSTOMERS_FILTER_STATE:
        dispatch(setCustomersStateFilter(null));
        break;
      case STORE_PROFILE:
        dispatch(loadProfile());
        break;
      case STORE_AVATAR:
        dispatch(setAvatar(null));
        break;
      case STORE_CUSTOMER_SHIPPING_ACCOUNT:
        dispatch(setCartShippingAccount(null));
        break;
      case STORE_CUSTOMERS_FILTER_REP:
        dispatch(setCustomersRepFilter(null));
        break;
      case STORE_RECENT_ACCOUNTS:
        dispatch(clearRecentCustomers());
        break;
      case STORE_USER_ACCESS:
        dispatch(setUserAccess(null));
        break;
    }
    reloadHandler();
  };
  const reloadHandler = () => {
    setValues(getSettings());
  };
  return /* @__PURE__ */ jsxs(Box, { ...props, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h2", component: "h2", children: "Stored Settings" }),
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(Typography, { component: "caption", variant: "body2", children: /* @__PURE__ */ jsxs(Alert, { severity: "warning", children: [
        /* @__PURE__ */ jsx("div", { children: "Occasionally a setting will be stuck or not cleared from a previous version. Removing those settings may help to restore normal function. These settings will be regenerated automatically as needed." }),
        /* @__PURE__ */ jsx("div", { children: "For best results, refresh your browser after clearing a setting." })
      ] }) }),
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: "Action" }),
        /* @__PURE__ */ jsx(TableCell, { children: "Key" }),
        /* @__PURE__ */ jsx(TableCell, { children: "Value" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: Object.keys(values).map((key) => {
        return /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "outlined",
              size: "small",
              onClick: () => removeSettingHandler(key),
              disabled: protectedSettings.includes(key),
              children: "X"
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: key }),
          /* @__PURE__ */ jsx(TableCell, { sx: { whiteSpace: "wrap" }, children: values[key] })
        ] }, key);
      }) })
    ] })
  ] });
}
function getSettings() {
  const keys = [
    STORE_AUTHTYPE,
    STORE_AVATAR,
    STORE_CURRENT_CART,
    STORE_CUSTOMER,
    STORE_CUSTOMER_SHIPPING_ACCOUNT,
    STORE_CUSTOMERS_FILTER_REP,
    STORE_CUSTOMERS_FILTER_STATE,
    STORE_INVOICES_ROWS_PER_PAGE,
    STORE_INVOICES_SORT,
    STORE_PROFILE,
    STORE_RECENT_ACCOUNTS,
    STORE_SHOW_SIGNUP_POPUP,
    STORE_TOKEN,
    STORE_USER_ACCESS,
    STORE_VERSION
  ];
  const settings = {};
  function parseProfileValues(value) {
    const { email, name, chums } = value;
    const { id, last_login, logins } = chums?.user ?? {};
    return JSON.stringify({ email, name, id, last_login, logins }, void 0, 2);
  }
  function parseRecentAccounts(value) {
    return JSON.stringify(value.map((c) => shortCustomerKey(c)), void 0, 2);
  }
  function parseUserAccess(value) {
    const {
      id,
      isRepAccount,
      ARDivisionNo,
      CustomerNo,
      CustomerName,
      SalespersonDivisionNo,
      SalespersonNo,
      SalespersonName
    } = value;
    return isRepAccount ? JSON.stringify({ id, SalespersonDivisionNo, SalespersonNo, SalespersonName }, void 0, 2) : JSON.stringify({ id, ARDivisionNo, CustomerNo, CustomerName }, void 0, 2);
  }
  keys.forEach((key) => {
    const value = LocalStore.getItem(key, null);
    if (value) {
      switch (key) {
        case STORE_PROFILE:
          settings[key] = parseProfileValues(value);
          break;
        case STORE_RECENT_ACCOUNTS:
          settings[key] = parseRecentAccounts(value);
          break;
        case STORE_TOKEN:
          settings[key] = JSON.stringify({
            getTokenExpirationDate: getTokenExpirationDate(value),
            isTokenExpired: isTokenExpired(value)
          }, void 0, 2);
          break;
        case STORE_USER_ACCESS:
          settings[key] = parseUserAccess(value);
          break;
        default:
          settings[key] = JSON.stringify(value, void 0, 2);
      }
    }
  });
  return settings;
}
function CustomerAccessButton({ access, active }) {
  const linkPath = generatePath(PATH_CUSTOMER_ACCOUNT, { customerSlug: customerSlug(access) });
  return /* @__PURE__ */ jsx(Button, { variant: active ? "contained" : "outlined", component: Link$1, to: linkPath, children: /* @__PURE__ */ jsxs(Stack, { direction: "column", textAlign: "center", children: [
    /* @__PURE__ */ jsx("div", { children: longCustomerNo(access) }),
    /* @__PURE__ */ jsx("div", { children: access.CustomerName })
  ] }) });
}
function CustomerAccessList() {
  const list = useAppSelector(selectCustomerAccessList);
  const current = useAppSelector(selectCurrentAccess);
  if (list.length === 0) return null;
  return /* @__PURE__ */ jsxs(Box, { sx: { mt: 3 }, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h2", component: "h2", children: "Customer Accounts" }),
    /* @__PURE__ */ jsx(Stack, { spacing: 2, direction: "row", useFlexGap: true, flexWrap: "wrap", children: list.sort(sortUserAccounts).map((acct) => /* @__PURE__ */ jsx(CustomerAccessButton, { access: acct, active: acct.id === current?.id }, acct.id)) })
  ] });
}
function RepAccessButton({ access, active }) {
  const linkPath = generatePath(PATH_PROFILE_ACCOUNT, { id: `${access.id}` });
  return /* @__PURE__ */ jsx(Button, { variant: active ? "contained" : "outlined", component: Link$1, to: linkPath, children: /* @__PURE__ */ jsxs(Stack, { direction: "column", textAlign: "center", children: [
    /* @__PURE__ */ jsx("div", { children: longRepNo({
      SalespersonDivisionNo: access.SalespersonDivisionNo,
      SalespersonNo: access.SalespersonNo
    }) }),
    /* @__PURE__ */ jsx("div", { children: access.SalespersonName })
  ] }) });
}
function RepAccessList() {
  const list = useAppSelector(selectRepAccessList);
  const current = useAppSelector(selectCurrentAccess);
  if (list.length === 0) return null;
  return /* @__PURE__ */ jsxs(Box, { sx: { mt: 3 }, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h2", component: "h2", children: "Rep Accounts" }),
    /* @__PURE__ */ jsx(Stack, { spacing: 2, direction: "row", useFlexGap: true, flexWrap: "wrap", children: list.sort(sortUserAccounts).map((acct) => /* @__PURE__ */ jsx(RepAccessButton, { access: acct, active: acct.id === current?.id }, acct.id)) })
  ] });
}
const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const accessStatus = useAppSelector(selectAccessStatus);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.returnTo) {
      dispatch(setReturnToPath(location.state.returnTo));
    }
  }, []);
  return /* @__PURE__ */ jsxs(Container, { maxWidth: "lg", children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle: documentTitles.profile }),
    /* @__PURE__ */ jsx(UserProfile, {}),
    accessStatus === "loading" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
    /* @__PURE__ */ jsx(CustomerAccessList, {}),
    /* @__PURE__ */ jsx(RepAccessList, {}),
    /* @__PURE__ */ jsx(StoredSettings, { sx: { mt: 5 } })
  ] });
};
const BreadcrumbItem = ({ title, pathname, active = false }) => active ? /* @__PURE__ */ jsx(Typography, { "aria-current": "page", children: title }) : /* @__PURE__ */ jsx(Link$2, { component: Link$1, to: pathname, children: title });
const Breadcrumb = ({ paths }) => {
  const location = useLocation();
  return /* @__PURE__ */ jsx(Breadcrumbs, { sx: { mb: 2 }, "aria-label": "Breadcrumb", children: paths.map((path2, index) => /* @__PURE__ */ jsx(BreadcrumbItem, { ...path2, active: path2.pathname === location.pathname }, index)) });
};
const AccountBreadcrumbs = () => {
  const countUserAccounts = useAppSelector(selectUserAccessCount);
  const userAccount = useAppSelector(selectCurrentAccess);
  const customerKey2 = useAppSelector(selectCustomerKey);
  const location = useLocation();
  if (countUserAccounts < 2) {
    return null;
  }
  const paths = [
    { title: "Profile", pathname: PATH_PROFILE }
  ];
  if (userAccount?.isRepAccount) {
    paths.push(
      { title: repAccessCode(userAccount), pathname: PATH_PROFILE },
      {
        title: "Account List",
        pathname: generatePath(PATH_PROFILE_ACCOUNT, { id: `${userAccount?.id ?? 0}` })
      }
    );
  } else if (customerKey2) {
    paths.push({
      title: customerKey2,
      pathname: location.pathname
    });
  }
  return /* @__PURE__ */ jsx(Breadcrumb, { paths });
};
const CUSTOMER_TABS = [
  { value: "billing", label: "Billing address", to: "" },
  { value: "delivery", label: "Delivery Addresses", to: "delivery" },
  { value: "users", label: "Users", to: "users" },
  { value: "carts", label: "Carts", to: "carts" },
  { value: "orders", label: "Open Orders", to: "orders" },
  { value: "invoices", label: "Invoices", to: "invoices" }
];
function LinkTab({ value, label, to }) {
  return /* @__PURE__ */ jsx(Tab, { component: NavLink, to, label, value });
}
const AccountTabs = () => {
  const [value, setValue] = useState("billing");
  const tabMatch = useMatch("/account/:customerSlug/:tab/*");
  useEffect(() => {
    switch (tabMatch?.params.tab) {
      case "closed":
        return setValue("invoices");
      default:
        setValue(tabMatch?.params.tab ?? "billing");
    }
  }, [tabMatch?.params]);
  return /* @__PURE__ */ jsx(Box, { sx: { width: "100%", mb: 1 }, children: /* @__PURE__ */ jsx(Tabs, { value, children: CUSTOMER_TABS.map((tab) => /* @__PURE__ */ jsx(LinkTab, { ...tab }, tab.value)) }) });
};
const returnPathText = (path2) => {
  if (path2.startsWith("/products")) {
    return "Continue Shopping";
  }
  return `Return to ${path2}`;
};
const ReturnToAlert = () => {
  const dispatch = useAppDispatch();
  const returnToPath = useAppSelector(selectCustomerReturnToPath);
  if (!returnToPath) {
    return null;
  }
  const onCancel = () => {
    dispatch(setReturnToPath(null));
  };
  return /* @__PURE__ */ jsx(Alert, { severity: "info", onClose: onCancel, children: /* @__PURE__ */ jsx(Link$2, { component: Link$1, to: returnToPath, children: returnPathText(returnToPath) }) });
};
function CustomerTitle({ customer, shipTo, loading }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Typography, { variant: "h1", component: "h1", children: [
      customer?.CustomerName,
      shipTo && shipTo.ShipToCode !== customer?.PrimaryShipToCode && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Box, { component: "span", sx: { mx: 1 }, children: "/" }),
        /* @__PURE__ */ jsx(Box, { component: "span", children: shipTo.ShipToName })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Typography, { variant: "h2", component: "h2", children: [
      isValidCustomer(customer) && /* @__PURE__ */ jsxs(Box, { sx: { me: 3 }, children: [
        customerNo(customer),
        shipTo && shipTo.ShipToCode !== customer?.PrimaryShipToCode && /* @__PURE__ */ jsxs(Box, { component: "span", children: [
          "/",
          shipTo.ShipToCode
        ] })
      ] }),
      !isValidCustomer(customer) && !loading && /* @__PURE__ */ jsx(Box, { children: "Please select a customer" })
    ] })
  ] });
}
const AccountPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const customer = useAppSelector(selectCustomerAccount);
  const userAccount = useAppSelector(selectCurrentAccess);
  const params = useParams();
  const loadStatus = useAppSelector(selectCustomerLoadStatus);
  const shipTo = useAppSelector(selectCustomerShipTo);
  useEffect(() => {
    return () => {
      dispatch(setReturnToPath(null));
    };
  }, []);
  useEffect(() => {
    if (customer) {
      ga4SelectCustomer(customerSlug(customer));
    }
  }, [customer]);
  useEffect(() => {
    const nextCustomer = parseCustomerSlug(params.customerSlug ?? "");
    if (!nextCustomer || !customerSlug(nextCustomer)) {
      console.log("nextCustomer", nextCustomer, customerSlug(nextCustomer));
      if (!userAccount?.id) {
        navigate(`/profile`);
        return;
      }
      navigate(generatePath("/profile/:id", { id: `${userAccount.id}` }));
      return;
    }
    if (isSameCustomer(customer, nextCustomer)) {
      return;
    }
    if (loadStatus === "idle") {
      dispatch(loadCustomer(nextCustomer));
    }
  }, [params, customer, loadStatus, userAccount]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle: customer?.CustomerName ?? "" }),
    /* @__PURE__ */ jsx(AccountBreadcrumbs, {}),
    /* @__PURE__ */ jsx(ReturnToAlert, {}),
    /* @__PURE__ */ jsx(CustomerTitle, { customer, shipTo, loading: loadStatus !== "idle" }),
    /* @__PURE__ */ jsx(AccountTabs, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
function SalesOrderCommentLine({ line }) {
  const rowClassName = {
    "table-warning": line.changed,
    "table-info": line.newLine
  };
  return /* @__PURE__ */ jsxs(TableRow, { className: classNames(rowClassName), children: [
    line.ItemType === "4" && /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsx(TextSnippetIcon, {}) }),
    /* @__PURE__ */ jsx(TableCell, { colSpan: 3, children: line.CommentText }),
    /* @__PURE__ */ jsx(TableCell, { colSpan: 4, children: " " }),
    line.ItemType === "4" && /* @__PURE__ */ jsx(TableCell, { children: " " })
  ] });
}
const API_PATH_CART_IMAGE = "/api/images/products/find/80/:ItemCode";
const OrderItemImage = ({ itemCode, itemCodeDesc, colorCode, image }) => {
  if (!itemCode) {
    return null;
  }
  if (!!image && image?.includes("?") && !!colorCode) {
    image = parseImageFilename2({ image, colorCode });
  }
  const src = image ? `/images/products/80/${encodeURIComponent(image)}` : API_PATH_CART_IMAGE.replace(":ItemCode", encodeURIComponent(itemCode));
  return /* @__PURE__ */ jsx("img", { src, alt: itemCodeDesc ?? void 0, className: "img-thumbnail" });
};
const PRICE_LEVELS = {
  1: "Wholesale 100 Pc",
  2: "Wholesale 200 Pc",
  5: "Wholesale 500 Pc",
  A: "Distributor 5000 Pc",
  B: "Distributor 10000 Pc",
  C: "Distributor 20000 Pc",
  N: "Safety DNS",
  S: "Safety DSS",
  M: "Safety DSM",
  L: "Safety DSL",
  G: "Safety GOV",
  X: "International 5000",
  Y: "International 10000",
  Z: "International 20000"
};
const PriceLevelNotice = ({ priceLevel = "" }) => {
  if (!priceLevel || !PRICE_LEVELS[priceLevel]) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Typography, { component: "div", variant: "body2", children: [
    PRICE_LEVELS[priceLevel],
    " Price"
  ] });
};
const SalesOrderLineButtons = ({
  onCopyToCart,
  copyToCartDisabled
}) => {
  const actions = [
    {
      icon: /* @__PURE__ */ jsx(AddShoppingCartIcon, {}),
      name: "Add to Cart",
      disabled: !onCopyToCart || copyToCartDisabled,
      onClick: onCopyToCart
    }
  ];
  return /* @__PURE__ */ jsx(Box, { sx: { position: "relative", height: "calc(0.5rem + 80px + 24px)" }, children: /* @__PURE__ */ jsx(
    SpeedDial,
    {
      ariaLabel: "Cart Item Actions",
      icon: /* @__PURE__ */ jsx(SpeedDialIcon, {}),
      direction: "left",
      sx: { position: "absolute", bottom: 8, right: 0 },
      children: actions.filter((action) => !action.disabled).map((action) => /* @__PURE__ */ jsx(
        SpeedDialAction,
        {
          icon: action.icon,
          slotProps: { tooltip: { title: action.name } },
          onClick: action.onClick
        },
        action.name
      ))
    }
  ) });
};
class UPCA {
  static CHUMS = "000298";
  static raw(upc) {
    const re = /[0-9]/;
    return upc.split("").filter((c) => re.test(c)).join("");
  }
  static format(upc) {
    upc = UPCA.raw(upc);
    if (upc.length === 5) {
      upc = UPCA.CHUMS + upc;
    }
    if (upc.length !== 11 && upc.length !== 12) {
      return upc;
    }
    const [, p1, p2, p3] = /(\d)(\d{5})(\d{5})(\d)/.exec(upc) ?? [];
    return [p1, p2, p3, UPCA.checkdigit(upc)].join(" ");
  }
  static checkdigit(upc) {
    upc = UPCA.raw(upc.trim()).slice(0, 11);
    if (upc.length === 5) {
      upc = UPCA.CHUMS + upc;
    }
    if (upc.length !== 11) {
      console.log("UPCA.checkdigit() UPC is too short", upc);
      return upc;
    }
    const cd = {
      even: 0,
      odd: 0
    };
    upc.split("").map((c, index) => {
      const parsed = parseInt(c, 10);
      if (index % 2 === 0) {
        cd.even += parsed;
      } else {
        cd.odd += parsed;
      }
    });
    cd.even *= 3;
    return (10 - (cd.odd + cd.even) % 10) % 10;
  }
}
const FormattedUPC = ({ value }) => {
  if (!value) {
    return null;
  }
  return /* @__PURE__ */ jsx(Typography, { variant: "bodyMono", children: UPCA.format(value) });
};
function calcUnitPrice(line) {
  return new Decimal(1).sub(new Decimal(line.LineDiscountPercent).div(100)).times(new Decimal(line.UnitPrice).div(line.UnitOfMeasureConvFactor ?? 1));
}
function calcItemPrice(line) {
  return new Decimal(1).sub(new Decimal(line.LineDiscountPercent).div(100)).times(line.UnitPrice);
}
function SalesOrderItemLine({
  line,
  customerPriceLevel,
  onAddToCart
}) {
  const [unitPrice, setUnitPrice] = useState(calcUnitPrice(line));
  const [itemPrice, setItemPrice] = useState(calcItemPrice(line));
  const [lineDiscount, setLineDiscount] = useState(new Decimal(line.LineDiscountPercent));
  useEffect(() => {
    setUnitPrice(calcUnitPrice(line));
    setItemPrice(calcItemPrice(line));
    setLineDiscount(new Decimal(line.LineDiscountPercent));
  }, [line]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      TableRow,
      {
        sx: {
          '& > *:not([rowspan="2"])': { borderBottom: line.CommentText ? "unset" : void 0 },
          verticalAlign: "top"
        },
        children: [
          /* @__PURE__ */ jsxs(TableCell, { rowSpan: line.CommentText ? 2 : 1, component: "th", children: [
            /* @__PURE__ */ jsx(Typography, { variant: "body1", sx: { fontWeight: 700 }, component: "div", children: line.ItemCode }),
            line.ItemType === "1" && /* @__PURE__ */ jsx(OrderItemImage, { itemCode: line.ItemCode, itemCodeDesc: line.ItemCodeDesc, image: line.image })
          ] }),
          /* @__PURE__ */ jsxs(TableCell, { children: [
            /* @__PURE__ */ jsx(Typography, { variant: "body1", children: line.ItemCodeDesc }),
            !!line.UDF_UPC && /* @__PURE__ */ jsx(FormattedUPC, { value: line.UDF_UPC })
          ] }),
          /* @__PURE__ */ jsx(TableCell, { children: line.UnitOfMeasure }),
          /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(line.QuantityOrdered).format("0,0") }),
          /* @__PURE__ */ jsxs(TableCell, { align: "right", children: [
            /* @__PURE__ */ jsx("div", { children: numeral(unitPrice).format("0,0.00") }),
            !lineDiscount.eq(0) && /* @__PURE__ */ jsxs("div", { className: "sale", children: [
              numeral(lineDiscount).format("0,0.0"),
              "% Off"
            ] }),
            !!line.PriceLevel && line.PriceLevel !== customerPriceLevel && /* @__PURE__ */ jsx(PriceLevelNotice, { priceLevel: line.PriceLevel })
          ] }),
          /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(line.SuggestedRetailPrice).format("0,0.00") }),
          /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(itemPrice).format("0,0.00") }),
          /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(new Decimal(line.QuantityOrdered).times(itemPrice)).format("0,0.00") }),
          /* @__PURE__ */ jsx(TableCell, { rowSpan: line.CommentText ? 2 : 1, children: /* @__PURE__ */ jsx(
            SalesOrderLineButtons,
            {
              onCopyToCart: onAddToCart,
              copyToCartDisabled: !line.ProductType || line.ProductType === "D" || line.InactiveItem === "Y" || line.ItemType !== "1"
            }
          ) })
        ]
      }
    ),
    !!line.CommentText && /* @__PURE__ */ jsx(SalesOrderCommentLine, { line })
  ] });
}
function SalesOrderKitComponentLine({
  line,
  onAddToCart
}) {
  const [unitPrice, setUnitPrice] = useState(calcUnitPrice(line));
  const [itemPrice, setItemPrice] = useState(calcItemPrice(line));
  useEffect(() => {
    setUnitPrice(calcUnitPrice(line));
    setItemPrice(calcItemPrice(line));
  }, [line]);
  const rowClassName = {};
  return /* @__PURE__ */ jsxs(TableRow, { sx: { verticalAlign: "top" }, className: classNames(rowClassName), children: [
    /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(Stack, { direction: "row", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ArrowForwardIosIcon, {}) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { children: line.ItemCode }),
        line.ItemType === "1" && /* @__PURE__ */ jsx(OrderItemImage, { itemCode: line.ItemCode, itemCodeDesc: line.ItemCodeDesc, image: line.image })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(TableCell, { children: [
      /* @__PURE__ */ jsx("p", { children: line.ItemCodeDesc }),
      !!line.UDF_UPC && /* @__PURE__ */ jsx("p", { children: UPCA.format(line.UDF_UPC) })
    ] }),
    /* @__PURE__ */ jsx(TableCell, { children: line.UnitOfMeasure }),
    /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(line.QuantityOrdered).format("0,0") }),
    /* @__PURE__ */ jsx(TableCell, { align: "right", children: new Decimal(unitPrice).eq(0) ? null : numeral(unitPrice).format("0,0.00") }),
    /* @__PURE__ */ jsx(TableCell, { align: "right", sx: { display: { xs: "none", sm: "table-cell" } }, children: numeral(line.SuggestedRetailPrice).format("0,0.00") }),
    /* @__PURE__ */ jsx(TableCell, { align: "right", sx: { display: { xs: "none", sm: "table-cell" } }, children: new Decimal(itemPrice).eq(0) ? null : numeral(itemPrice).format("0,0.00") }),
    /* @__PURE__ */ jsx(TableCell, { align: "right", children: new Decimal(itemPrice).eq(0) ? null : numeral(new Decimal(line.QuantityOrdered).times(itemPrice)).format("0,0.00") }),
    /* @__PURE__ */ jsx(TableCell, { align: "right", children: /* @__PURE__ */ jsx(SalesOrderLineButtons, { onCopyToCart: onAddToCart }) })
  ] });
}
function OrderDetailLine({
  line,
  customerPriceLevel,
  onAddToCart
}) {
  const addToCartHandler = () => {
    if (onAddToCart) {
      onAddToCart(line);
    }
  };
  const isKitComponent = !!line.SalesKitLineKey && line.SalesKitLineKey !== line.LineKey;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    line.ItemType !== "4" && !isKitComponent && /* @__PURE__ */ jsx(
      SalesOrderItemLine,
      {
        line,
        customerPriceLevel,
        onAddToCart: addToCartHandler
      }
    ),
    line.ProductType === "K" && line.ExplodedKitItem === "Y" && /* @__PURE__ */ jsxs(TableRow, { sx: { verticalAlign: "top" }, children: [
      /* @__PURE__ */ jsx(TableCell, { children: " " }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 4, children: "Contains:" }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, sx: { display: { xs: "none", sm: "table-cell" } }, children: " " }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: " " })
    ] }),
    line.ItemType !== "4" && isKitComponent && /* @__PURE__ */ jsx(SalesOrderKitComponentLine, { line, onAddToCart: addToCartHandler }),
    line.ItemType === "4" && line.ItemCode === "/C" && /* @__PURE__ */ jsx(SalesOrderCommentLine, { line })
  ] });
}
const reCustomerFreight = /^(RCP|COL|FREE|THRD)[ ~-]+([\w ]*)[ ~-]+(SWR|HOLD|RUSH)/;
const getFreightInfo = (header) => {
  if (reCustomerFreight.test(header?.Comment ?? "")) {
    const info = reCustomerFreight.exec(header?.Comment ?? "") ?? [];
    return {
      isCharged: false,
      freightMethod: info[1]?.trim() ?? "",
      freightAmt: "0.00",
      freightAcct: info[2]?.trim() ?? "",
      status: info[3]?.trim() ?? ""
    };
  }
  return {
    isCharged: true,
    freightAmt: new Decimal(header?.FreightAmt ?? 0).gt(0) ? numeral(header?.FreightAmt).format("0,0.00") : "TBD"
  };
};
function SalesOrderTotal({ salesOrderNo }) {
  const header = useAppSelector((state) => selectOpenOrderById(state, salesOrderNo ?? ""));
  const [freightInfo, setFreightInfo] = React.useState(getFreightInfo(header));
  useEffect(() => {
    setFreightInfo(getFreightInfo(header));
  }, [header]);
  if (!header) {
    return null;
  }
  const subTotal = new Decimal(header.NonTaxableAmt).add(header.TaxableAmt);
  const total = subTotal.add(header.FreightAmt ?? 0).add(header.SalesTaxAmt ?? 0).sub(header.DepositAmt ?? 0).sub(header.DiscountAmt ?? 0);
  return /* @__PURE__ */ jsxs(TableFooter, { children: [
    /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { component: "th", scope: "row", colSpan: 5, align: "right", children: "Sub Total" }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(new Decimal(header.NonTaxableAmt).add(header.TaxableAmt)).format("$ 0,0.00") }),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] }),
    /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxs(TableCell, { component: "th", scope: "row", colSpan: 5, align: "right", children: [
        "Sales Tax ",
        !new Decimal(header.SalesTaxAmt).eq(0) ? header.TaxSchedule : ""
      ] }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(header.SalesTaxAmt || 0).format("$ 0,0.00") }),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] }),
    /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { colSpan: 5, align: "right", children: "Freight" }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: !!freightInfo.freightAcct && /* @__PURE__ */ jsxs("span", { children: [
        freightInfo.freightMethod,
        " - ",
        freightInfo.freightAcct
      ] }) }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: freightInfo.freightAmt === "TBD" || new Decimal(freightInfo.freightAmt).isNaN() ? "TBD" : numeral(freightInfo.freightAmt).format("$ 0,0.00") }),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] }),
    !new Decimal(header.DiscountAmt ?? 0).eq(0) && /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { colSpan: 5, align: "right", children: "Discount" }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(header.DiscountAmt).format("$ 0,0.00") }),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] }),
    !new Decimal(header.DepositAmt ?? 0).eq(0) && /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { colSpan: 5, align: "right", children: "Deposit" }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(header.DepositAmt).format("$ 0,0.00") }),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] }),
    /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { colSpan: 5, align: "right", children: "Total" }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: freightInfo.freightAmt === "TBD" || new Decimal(freightInfo.freightAmt).isNaN() ? "TBD" : numeral(total.toString()).format("$ 0,0.00") }),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] })
  ] });
}
const allLocationsValue = "__ALL";
function ShipToSelect({
  value,
  defaultName,
  label,
  disabledShipToLocations,
  allowAllLocations,
  onChange,
  readOnly,
  required,
  ...formControlProps
}) {
  const customer = useAppSelector(selectCustomerAccount);
  const shipToAddresses = useAppSelector(selectPermittedShipToAddresses);
  const hasBillToPermissions = useAppSelector(selectPermittedBillToAddress);
  const permissions = useAppSelector(selectCustomerPermissions);
  const id = useId();
  const changeHandler = (ev) => {
    if (!customer) {
      return onChange(ev.target.value, null);
    }
    const value2 = ev.target.value ?? customer?.PrimaryShipToCode ?? "";
    if (allowAllLocations && value2 === allLocationsValue) {
      return onChange(null, null);
    }
    const [address] = shipToAddresses.filter((st) => st.ShipToCode === value2);
    if (!address && permissions?.billTo) {
      return onChange(value2, shipToAddressFromBillingAddress(customer));
    }
    const {
      ShipToName,
      ShipToAddress1,
      ShipToAddress2,
      ShipToAddress3,
      ShipToCity,
      ShipToState,
      ShipToCountryCode,
      ShipToZipCode
    } = address;
    onChange(value2, {
      ShipToName,
      ShipToAddress1,
      ShipToAddress2,
      ShipToAddress3,
      ShipToCity,
      ShipToState,
      ShipToCountryCode,
      ShipToZipCode
    });
  };
  if (!shipToAddresses.length) {
    return null;
  }
  const renderValueHandler = (value2) => {
    if (value2 === "" && permissions?.billTo) {
      return "Billing address";
    }
    if (value2 === allLocationsValue) {
      return "All Locations";
    }
    const [shipTo] = shipToAddresses.filter((st) => st.ShipToCode === value2);
    if (shipTo) {
      return `[${shipTo?.ShipToCode}]  ${shipTo?.ShipToName}, ${shipTo?.ShipToCity} ${shipTo?.ShipToState}`;
    }
    return "";
  };
  const isValidValue = value === "" || allowAllLocations && value === allLocationsValue || !!shipToAddresses.filter((st) => st.ShipToCode === value).length;
  return /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, variant: "filled", size: "small", ...formControlProps, children: [
    /* @__PURE__ */ jsx(InputLabel, { id, shrink: true, children: label ?? "Ship-To Location" }),
    /* @__PURE__ */ jsxs(
      Select,
      {
        onChange: changeHandler,
        variant: formControlProps.variant ?? "filled",
        id,
        value: isValidValue ? value ?? (allowAllLocations ? allLocationsValue : "") : "",
        displayEmpty: true,
        renderValue: renderValueHandler,
        readOnly,
        required,
        children: [
          allowAllLocations && /* @__PURE__ */ jsx(MenuItem, { value: allLocationsValue, children: "All Addresses" }),
          hasBillToPermissions && /* @__PURE__ */ jsx(MenuItem, { value: "", children: "Billing Address" }),
          shipToAddresses.filter((shipTo) => shipTo.ShipToCode !== "" || permissions?.billTo).map((shipTo) => /* @__PURE__ */ jsx(
            MenuItem,
            {
              value: shipTo.ShipToCode,
              disabled: disabledShipToLocations?.includes(shipTo.ShipToCode),
              children: /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, sx: { width: "100%" }, children: [
                /* @__PURE__ */ jsx(Chip, { label: shipTo.ShipToCode, size: "small", sx: { flex: "0 0 20%" } }),
                /* @__PURE__ */ jsxs(Box, { sx: { width: "80%" }, children: [
                  /* @__PURE__ */ jsx(
                    Typography,
                    {
                      variant: "body1",
                      sx: { whiteSpace: "wrap" },
                      children: shipTo.ShipToName
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Typography,
                    {
                      variant: "body1",
                      sx: { fontSize: "80%" },
                      children: [
                        shipTo.ShipToCity,
                        ", ",
                        shipTo.ShipToState
                      ]
                    }
                  )
                ] })
              ] }, shipTo.ShipToCode)
            },
            shipTo.ShipToCode
          ))
        ]
      }
    )
  ] });
}
const CartNameInput = ({ value, onChange, ...rest }) => {
  const id = useId();
  const changeHandler = (ev) => {
    onChange(ev.target.value);
  };
  return /* @__PURE__ */ jsx(
    TextField,
    {
      id,
      label: "Cart Name",
      value,
      onChange: changeHandler,
      slotProps: {
        htmlInput: { maxLength: 30 }
      },
      size: "small",
      variant: "filled",
      ...rest
    }
  );
};
function AddToCartButton({ disabled, children, ...rest }) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      color: "primary",
      variant: "contained",
      type: "submit",
      size: "small",
      fullWidth: true,
      disabled,
      endIcon: /* @__PURE__ */ jsx(ShoppingCartIcon, {}),
      ...rest,
      children: children ?? "Add to Cart"
    }
  );
}
function CartSelect({
  cartId = 0,
  onChange,
  excludeCartId,
  required,
  ref
}) {
  const id = useId();
  const carts = useAppSelector(selectCartHeaders);
  const changeHandler = (ev) => {
    LocalStore.setItem(STORE_CURRENT_CART, +ev.target.value);
    onChange(+ev.target.value);
  };
  if (!carts.length) {
    return null;
  }
  const value = `${cartId ?? 0}`;
  return /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, size: "small", variant: "filled", children: [
    /* @__PURE__ */ jsx(InputLabel, { id, children: "Cart" }),
    /* @__PURE__ */ jsxs(Select, { labelId: id, value, label: "Cart", onChange: changeHandler, required, ref, children: [
      /* @__PURE__ */ jsx(MenuItem, { value: 0, children: "New Cart" }),
      carts.map((cart) => /* @__PURE__ */ jsx(
        MenuItem,
        {
          value: cart.id,
          disabled: cart.id === excludeCartId,
          children: /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", justifyContent: "space-between", width: "100%" }, children: [
            /* @__PURE__ */ jsx("div", { children: cart.customerPONo }),
            cart.shipToCode && /* @__PURE__ */ jsxs("div", { children: [
              "[",
              cart.shipToCode,
              "] ",
              cart.shipToName
            ] }),
            !cart.shipToCode && /* @__PURE__ */ jsx("div", { children: cart.shipToName })
          ] })
        },
        cart.id
      ))
    ] })
  ] });
}
const NumericInput = styled(FilledInput)`
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
const CartQuantityInput = ({ quantity, unitOfMeasure = "EA", onChange, min = 0, disabled, required }) => {
  const theme2 = useTheme();
  const id = useId();
  const incrementHandler = () => {
    onChange(quantity + 1);
  };
  const decrementHandler = () => {
    onChange(Math.max(min, quantity - 1));
  };
  const changeHandler = (ev) => {
    const _value = +ev.target.value;
    if (isNaN(_value)) {
      return;
    }
    const value = Math.max(_value, 0);
    onChange(value);
  };
  return /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, children: [
    /* @__PURE__ */ jsx(InputLabel, { htmlFor: id, sx: { ...visuallyHidden }, children: "Quantity" }),
    /* @__PURE__ */ jsx(
      NumericInput,
      {
        value: quantity ?? "",
        size: "small",
        onChange: changeHandler,
        type: "number",
        inputProps: {
          inputMode: "numeric",
          pattern: "[0-9]*",
          readOnly: disabled,
          min: 1,
          maxLength: 4,
          sx: { textAlign: "center", minWidth: "4rem", flex: "1 0 4rem" },
          id,
          autoCorrect: "off",
          autoComplete: "off"
        },
        required,
        "aria-label": "Quantity to add to cart",
        startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(
          IconButton,
          {
            onClick: decrementHandler,
            size: "small",
            edge: "start",
            "aria-label": "decrease by one",
            disabled: disabled || +quantity === min,
            children: /* @__PURE__ */ jsx(RemoveIcon, {})
          }
        ) }),
        endAdornment: /* @__PURE__ */ jsxs(InputAdornment, { position: "end", children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              onClick: incrementHandler,
              size: "small",
              edge: "end",
              "aria-label": "increase by 1",
              disabled,
              children: /* @__PURE__ */ jsx(AddIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(Box, { sx: { ml: 1 }, color: theme2.palette.chumsGrey.dark, children: unitOfMeasure ?? "EA" })
        ] })
      }
    )
  ] });
};
function cartItems(detail) {
  return detail.filter((item) => !(item.lineStatus === "U" && item.quantityOrdered === 0)).map((item) => ({
    item_id: item.itemCode,
    item_name: item.itemCodeDesc ?? item.itemCode,
    quantity: +item.quantityOrdered,
    price: new Decimal(item.extensionAmt).toNumber()
  }));
}
function cartValue(header) {
  return new Decimal(header.subTotalAmt).sub(header.DiscountAmt ?? 0).toNumber();
}
function ga4ViewCart(header, detail) {
  if (!canStoreAnalytics()) return;
  if (header && detail.length > 0) {
    sendGtagEvent("view_cart", {
      currency: "USD",
      value: cartValue(header),
      items: cartItems(detail)
    });
  }
}
function ga4AddPaymentInfo(header, detail) {
  if (!canStoreAnalytics()) return;
  sendGtagEvent("add_payment_info", {
    currency: "USD",
    value: cartValue(header),
    payment_type: header.PaymentType,
    items: cartItems(detail)
  });
}
function ga4BeginCheckout(header, detail) {
  if (!canStoreAnalytics()) return;
  sendGtagEvent("begin_checkout", {
    currency: "USD",
    value: cartValue(header),
    items: cartItems(detail)
  });
}
function ga4AddShippingInfo(header, detail) {
  if (!canStoreAnalytics()) return;
  sendGtagEvent("add_shipping_info", {
    currency: "USD",
    value: cartValue(header),
    shipping_tier: header.shipVia,
    items: cartItems(detail)
  });
}
function ga4Purchase(header, detail) {
  if (!canStoreAnalytics()) return;
  sendGtagEvent("purchase", {
    currency: "USD",
    value: cartValue(header),
    transaction_id: header.salesOrderNo ?? header.id.toString(),
    items: cartItems(detail)
  });
}
function ga4AddToCart(cartItem, quantity) {
  if (!canStoreAnalytics()) return;
  const price = cartItem.price ? new Decimal(cartItem.price).toNumber() : 0;
  const value = cartItem.price ? new Decimal(cartItem.price).times(quantity).toNumber() : 0;
  sendGtagEvent("add_to_cart", {
    currency: "USD",
    value,
    items: [{ item_id: cartItem.itemCode, item_name: cartItem.name, price, quantity }]
  });
}
function AddToCartForm({
  cartItem,
  quantity,
  unitOfMeasure,
  comment,
  disabled,
  onDone,
  onChangeQuantity,
  excludeCartId,
  setActiveCart
}) {
  const dispatch = useAppDispatch();
  const customerKey2 = useAppSelector(selectCustomerKey);
  const carts = useAppSelector(selectCartHeaders);
  const activeCartId = useAppSelector(selectActiveCartId);
  const activeCart = useAppSelector((state) => selectCartHeaderById(state, activeCartId));
  const customer = useAppSelector(selectCustomerAccount);
  const permissions = useAppSelector(selectCustomerPermissions);
  const permissionsStatus = useAppSelector(selectCustomerPermissionsStatus);
  const currentShipToCode = useAppSelector(selectCustomerShipToCode);
  const cartsStatus = useAppSelector(selectCartsStatus);
  const [cartId, setCartId] = useState(activeCart?.id ?? null);
  const [cartComment, setCartComment] = useState(comment ?? "");
  const [cartName, setCartName] = useState(activeCart?.customerPONo ?? "");
  const [shipToCode, setShipToCode2] = useState(activeCart?.shipToCode ?? null);
  const cartStatus = useAppSelector((state) => selectCartStatusById(state, cartId ?? 0));
  const submitHandler = useCallback(async (ev) => {
    ev.preventDefault();
    if (disabled || !customerKey2 || !cartName) {
      return;
    }
    ga4AddToCart(cartItem, quantity);
    if (!cartId) {
      await dispatch(addToCart({
        cartId: null,
        cartName,
        customerKey: customerKey2,
        shipToCode,
        setActiveCart: true,
        item: {
          itemCode: cartItem.itemCode,
          itemType: "1",
          unitOfMeasure: unitOfMeasure ?? cartItem.salesUM ?? "EA",
          commentText: cartComment,
          productId: cartItem.productId,
          quantityOrdered: quantity
        }
      }));
    } else {
      await dispatch(addToCart({
        cartId,
        customerKey: customerKey2,
        shipToCode,
        setActiveCart,
        item: {
          itemCode: cartItem.itemCode,
          itemType: "1",
          unitOfMeasure: unitOfMeasure ?? cartItem.salesUM ?? "EA",
          commentText: cartComment,
          productId: cartItem.productId,
          quantityOrdered: quantity
        }
      }));
    }
    if (onDone) {
      onDone();
    }
  }, [cartId, quantity, customerKey2, cartName, shipToCode, cartItem, cartComment, setActiveCart, onDone]);
  const setCartState = useCallback((cart) => {
    setCartId(cart?.id ?? 0);
    setShipToCode2(cart?.shipToCode ?? null);
    setCartName(cart?.customerPONo ?? "");
  }, []);
  useEffect(() => {
    if (!permissions && permissionsStatus === "idle") {
      dispatch(loadCustomerPermissions(customer));
    }
  }, [customer, dispatch, permissions, permissionsStatus]);
  useEffect(() => {
    setCartState(activeCart ?? null);
  }, [activeCart]);
  useEffect(() => {
    let _comment = "";
    if (cartItem.season?.active && !(cartItem.season.product_available || cartItem.seasonAvailable)) {
      _comment = [`PRE-SEASON ITEM: ${cartItem.season.code}`, comment ?? ""].filter((val) => !!val).join("; ");
    }
    setCartComment(_comment);
  }, [cartItem]);
  useEffect(() => {
    const shipToCode2 = currentShipToCode;
    if (!shipToCode2) {
      if (permissions?.billTo) {
        setShipToCode2(customer?.PrimaryShipToCode ?? "");
      } else {
        setShipToCode2(permissions?.shipTo[0] ?? "");
      }
    }
    setShipToCode2(shipToCode2 ?? "");
  }, [currentShipToCode, customer, permissions]);
  const cartChangeHandler = (value) => {
    const [cart] = carts.filter((cart2) => cart2.id === value);
    setCartState(cart ?? null);
  };
  const onChangeCartName = (value) => {
    setCartName(value);
  };
  const shipToCodeChangeHandler = (code) => {
    setShipToCode2(code);
  };
  return /* @__PURE__ */ jsx("form", { onSubmit: submitHandler, className: "add-to-cart", method: "post", children: /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "column", children: [
    /* @__PURE__ */ jsx(
      CartSelect,
      {
        cartId: cartId === excludeCartId ? 0 : cartId,
        onChange: cartChangeHandler,
        required: true,
        excludeCartId
      }
    ),
    !cartId && cartsStatus === "loading" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate", "aria-label": "Loading Carts" }),
    !cartId && cartsStatus === "idle" && /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: { xs: "column", md: "row" }, children: [
      /* @__PURE__ */ jsx(Box, { sx: { width: "50%" }, children: /* @__PURE__ */ jsx(
        CartNameInput,
        {
          value: cartName,
          onChange: onChangeCartName,
          required: true,
          error: !cartName,
          fullWidth: true,
          helperText: "Please name your cart."
        }
      ) }),
      /* @__PURE__ */ jsx(Box, { sx: { width: "50%" }, children: /* @__PURE__ */ jsx(ShipToSelect, { value: shipToCode, onChange: shipToCodeChangeHandler }) })
    ] }),
    /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "flex-end", children: [
      /* @__PURE__ */ jsx(
        CartQuantityInput,
        {
          quantity,
          onChange: onChangeQuantity,
          unitOfMeasure: unitOfMeasure ?? cartItem.salesUM ?? "EA",
          disabled,
          required: true
        }
      ),
      /* @__PURE__ */ jsx(AddToCartButton, { disabled: disabled || !quantity || cartStatus !== "idle" })
    ] }),
    cartStatus !== "idle" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" })
  ] }) });
}
function OrderDetail({ salesOrderNo }) {
  const detail = useAppSelector(selectSalesOrderDetail);
  const [cartItem, setCartItem2] = useState(null);
  const [unitOfMeasure, setUnitOfMeasure] = useState("EA");
  const addToCartHandler = (line) => {
    setUnitOfMeasure(line.UnitOfMeasure);
    const item = detailToCartItem(line);
    if (!item) {
      setCartItem2(null);
      return;
    }
    setCartItem2({ ...item, name: line.ItemCodeDesc, productId: 0, image: "" });
  };
  const quantityChangeHandler = (quantity) => {
    if (!cartItem) {
      return;
    }
    setCartItem2({ ...cartItem, quantity });
  };
  const open = !!cartItem;
  if (!salesOrderNo) {
    return null;
  }
  return /* @__PURE__ */ jsxs(TableContainer, { sx: { mt: 3 }, children: [
    /* @__PURE__ */ jsxs(Table, { size: "small", children: [
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: "Item" }),
        /* @__PURE__ */ jsx(TableCell, { children: "Description" }),
        /* @__PURE__ */ jsx(TableCell, { children: "U/M" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "Ordered" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "Unit Price" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "MSRP" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "Item Price" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "Ext Price" }),
        /* @__PURE__ */ jsx(TableCell, { align: "center", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: detail.map((line) => /* @__PURE__ */ jsx(
        OrderDetailLine,
        {
          line,
          onAddToCart: addToCartHandler
        },
        line.LineSeqNo
      )) }),
      /* @__PURE__ */ jsx(SalesOrderTotal, { salesOrderNo })
    ] }),
    /* @__PURE__ */ jsxs(Dialog, { open, onClose: () => setCartItem2(null), children: [
      /* @__PURE__ */ jsxs(DialogTitle, { children: [
        "Add ",
        cartItem?.itemCode,
        " To Cart"
      ] }),
      /* @__PURE__ */ jsx(DialogContent, { children: !!cartItem && /* @__PURE__ */ jsx(
        AddToCartForm,
        {
          cartItem,
          unitOfMeasure,
          quantity: cartItem?.quantity ?? 1,
          onChangeQuantity: quantityChangeHandler,
          onDone: () => setCartItem2(null)
        }
      ) }),
      /* @__PURE__ */ jsx(DialogActions, { children: /* @__PURE__ */ jsx(Button, { autoFocus: true, onClick: () => setCartItem2(null), children: "Cancel" }) })
    ] })
  ] });
}
const genInvoicePath = (customer, invoiceNo, invoiceType) => {
  return generatePath(`/account/:customerSlug/invoices/:invoiceType/:invoiceNo`, {
    customerSlug: customerSlug(customer),
    invoiceType: "IN",
    invoiceNo
  });
};
const customerUserPath = "/account/:customerSlug/users/:id?";
const DuplicateCartDialog = ({ open, salesOrderNo, shipToCode, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const customerKey2 = useAppSelector(selectCustomerKey);
  const cartStatus = useAppSelector((state) => selectCartStatusById(state, 0));
  const [cartName, setCartName] = useState("");
  const [shipTo, setShipTo] = useState(shipToCode ?? "");
  const onDuplicateOrder = useCallback(async () => {
    if (!salesOrderNo || !customerKey2) {
      return;
    }
    const arg = {
      customerKey: customerKey2,
      salesOrderNo,
      cartName,
      shipToCode: shipTo
    };
    const res = await dispatch(duplicateSalesOrder(arg));
    if (res.payload?.header) {
      const cartId = res.payload.header.id;
      onClose();
      navigate(generatePath("/account/:customerSlug/carts/:cartId", {
        customerSlug: customerSlug(parseCustomerSlug(customerKey2)),
        cartId: cartId.toString()
      }));
    }
  }, [salesOrderNo, customerKey2, shipTo, cartName]);
  return /* @__PURE__ */ jsxs(Dialog, { open, onClose, title: "Confirm", children: [
    /* @__PURE__ */ jsxs(DialogTitle, { children: [
      "Duplicate SO# ",
      salesOrderNo,
      "?"
    ] }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogContentText, { children: [
        "Are you sure you want to duplicate order #",
        salesOrderNo,
        "?"
      ] }),
      /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "column", children: [
        /* @__PURE__ */ jsx(Alert, { severity: "info", children: /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 1, children: [
          /* @__PURE__ */ jsx("div", { children: "Any discontinued items will no longer be available. Please check your new cart for accuracy." }),
          /* @__PURE__ */ jsx("div", { children: "Comments will not copy to the new order - you may need to add those manually, or copy them from this order." })
        ] }) }),
        /* @__PURE__ */ jsx(
          TextField,
          {
            autoFocus: true,
            label: "New Cart Name",
            type: "text",
            fullWidth: true,
            variant: "filled",
            value: cartName,
            onChange: (ev) => setCartName(ev.target.value)
          }
        ),
        /* @__PURE__ */ jsx(ShipToSelect, { value: shipTo ?? "", onChange: (shipToCode2) => setShipTo(shipToCode2 ?? "") }),
        cartStatus !== "idle" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(DialogActions, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsx(Button, { onClick: onDuplicateOrder, disabled: !cartName, children: "Duplicate Order" })
    ] })
  ] });
};
function isValidDate(date) {
  return !!date && dayjs(date).isValid() && dayjs(date).valueOf() > 0;
}
function toDateString(date) {
  return isValidDate(date) ? dayjs(date).format("YYYY-MM-DD") : "";
}
const SalesOrderHeaderElement = () => {
  const dispatch = useAppDispatch();
  useParams();
  const customer = useAppSelector(selectCustomerAccount);
  const header = useAppSelector(selectSalesOrderHeader);
  const invoices = useAppSelector(selectSalesOrderInvoices);
  const [showDuplicateCart, setShowDuplicateCart] = useState(false);
  const [hasCancelDate, setHasCancelDate] = useState(isValidDate(header?.UDF_CANCEL_DATE));
  const [cancelDate, setCancelDate] = useState(toDateString(header?.UDF_CANCEL_DATE));
  const [orderDate, setOrderDate] = useState(toDateString(header?.OrderDate));
  const [shipDate, setShipDate] = useState(toDateString(header?.ShipExpireDate));
  useEffect(() => {
    setHasCancelDate(isValidDate(header?.UDF_CANCEL_DATE));
    setCancelDate(toDateString(header?.UDF_CANCEL_DATE));
    setOrderDate(toDateString(header?.OrderDate));
    setShipDate(toDateString(header?.ShipExpireDate));
  }, [header]);
  const reloadHandler = () => {
    if (!customer || !header) {
      return;
    }
    dispatch(loadSalesOrder(header?.SalesOrderNo));
  };
  if (!customer || !header) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, lg: 6 }, children: /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "column", children: [
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Ship To Code",
            type: "text",
            variant: "filled",
            size: "small",
            value: header?.ShipToCode ?? "Default address",
            slotProps: {
              htmlInput: { readOnly: true }
            }
          }
        ),
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Delivery Address",
            type: "text",
            multiline: true,
            variant: "filled",
            size: "small",
            value: multiLineAddress(addressFromShipToAddress(header)).join("\n"),
            slotProps: {
              htmlInput: { readOnly: true }
            }
          }
        ),
        /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: { xs: "column", md: "row" }, children: [
          /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Ship Via",
              type: "text",
              fullWidth: true,
              value: getShippingMethod(header?.ShipVia)?.description ?? header?.ShipVia ?? "",
              variant: "filled",
              size: "small",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          ),
          /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Ship Comment",
              type: "text",
              fullWidth: true,
              value: header?.Comment ?? "",
              variant: "filled",
              size: "small",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: { sm: "column", md: "row" }, sx: { justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "text", onClick: reloadHandler, children: "Reload" }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outlined", onClick: () => setShowDuplicateCart(true), children: "Duplicate Order" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, lg: 6 }, children: /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "column", children: [
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Order Date",
            type: "date",
            fullWidth: true,
            variant: "filled",
            size: "small",
            value: orderDate,
            placeholder: "",
            slotProps: {
              htmlInput: { readOnly: true }
            }
          }
        ),
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Purchase Order No",
            type: "text",
            fullWidth: true,
            variant: "filled",
            size: "small",
            value: header?.CustomerPONo ?? "",
            slotProps: {
              htmlInput: { readOnly: true }
            }
          }
        ),
        hasCancelDate && /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Cancel Date",
            type: "date",
            fullWidth: true,
            value: cancelDate,
            variant: "filled",
            size: "small",
            slotProps: {
              htmlInput: { readOnly: true }
            }
          }
        ),
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Requested Ship Date",
            type: "date",
            size: "small",
            variant: "filled",
            fullWidth: true,
            value: shipDate,
            slotProps: {
              htmlInput: { readOnly: true }
            }
          }
        ),
        isClosedSalesOrder(header) && header.LastInvoiceNo && /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "row", children: [
          /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Invoice No",
              type: "text",
              fullWidth: true,
              value: header.LastInvoiceNo,
              variant: "filled",
              size: "small",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          ),
          dayjs(header.LastInvoiceDate).isValid() && /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Invoice Date",
              type: "date",
              fullWidth: true,
              value: dayjs(header.LastInvoiceDate).format("YYYY-MM-DD"),
              variant: "filled",
              size: "small",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          )
        ] }),
        header?.UDF_PROMO_DEAL && /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Promo Code",
            type: "text",
            fullWidth: true,
            value: header?.UDF_PROMO_DEAL ?? "",
            variant: "filled",
            size: "small",
            slotProps: {
              htmlInput: { readOnly: true }
            }
          }
        ),
        !!invoices.length && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Typography, { children: "Invoices:" }),
          invoices.map((inv) => /* @__PURE__ */ jsx(
            Chip,
            {
              label: inv,
              component: NavLink,
              to: genInvoicePath(customer, inv)
            },
            inv
          ))
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      DuplicateCartDialog,
      {
        open: showDuplicateCart,
        salesOrderNo: header?.SalesOrderNo,
        shipToCode: header.ShipToCode,
        onClose: () => setShowDuplicateCart(false)
      }
    )
  ] });
};
function SalesOrderSkeleton() {
  return /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 2, children: [
      /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 30 }),
      /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 30 }),
      /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 30 })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 2, children: [
      /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 30 }),
      /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 60 }),
      /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 30 })
    ] }) })
  ] });
}
function SalesOrderLoadingProgress() {
  const loading = useAppSelector(selectSalesOrderStatus);
  if (loading === "idle" || loading === "rejected") {
    return null;
  }
  return /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate", sx: { my: 1 } });
}
const SalesOrderPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const match = useMatch("/account/:customerSlug/:orderType/:salesOrderNo");
  const userAccount = useAppSelector(selectCurrentAccess);
  const customer = useAppSelector(selectCustomerAccount);
  const salesOrderHeader = useAppSelector(selectSalesOrderHeader);
  const loading = useAppSelector(selectSalesOrderStatus);
  const customerLoaded = useAppSelector(selectCustomerLoaded);
  useEffect(() => {
    if (loading !== "idle") {
      return;
    }
    if (!!params?.salesOrderNo && params?.salesOrderNo !== salesOrderHeader?.SalesOrderNo) {
      dispatch(loadSalesOrder(params.salesOrderNo));
    }
  }, [customer, userAccount, params, loading, salesOrderHeader]);
  if (!customer && customerLoaded) {
    redirect("/profile");
    return;
  }
  const documentTitle = `Sales Order #${match?.params?.salesOrderNo}`;
  if (!salesOrderHeader || !customer) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(DocumentTitle, { documentTitle }),
      /* @__PURE__ */ jsxs(Typography, { variant: "h3", component: "h2", children: [
        "Sales Order #",
        match?.params?.salesOrderNo
      ] }),
      /* @__PURE__ */ jsx("div", { className: "sales-order-page", children: /* @__PURE__ */ jsx(SalesOrderSkeleton, {}) }),
      /* @__PURE__ */ jsx(SalesOrderLoadingProgress, {})
    ] });
  }
  if (salesOrderHeader.OrderStatus === "X") {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(DocumentTitle, { documentTitle }),
      /* @__PURE__ */ jsxs(Typography, { variant: "h3", component: "h2", children: [
        "Cancelled Order #",
        salesOrderHeader.SalesOrderNo
      ] }),
      /* @__PURE__ */ jsx("div", { className: "sales-order-page", children: /* @__PURE__ */ jsx(SalesOrderSkeleton, {}) }),
      /* @__PURE__ */ jsx(Alert, { severity: "error", title: "Note:", children: "This order has been cancelled. Please contact Customer Service if you have any questions." })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle }),
    /* @__PURE__ */ jsxs("div", { className: "sales-order-page", children: [
      /* @__PURE__ */ jsxs(Typography, { variant: "h3", component: "h2", children: [
        "Sales Order #",
        salesOrderHeader.SalesOrderNo
      ] }),
      /* @__PURE__ */ jsx(SalesOrderHeaderElement, {}),
      /* @__PURE__ */ jsx(SalesOrderLoadingProgress, {}),
      /* @__PURE__ */ jsx(OrderDetail, { salesOrderNo: match?.params?.salesOrderNo })
    ] })
  ] });
};
const StateSelect = ({ countryCode, value, filterList, allowAllStates, onChange, id, ...rest }) => {
  const [options, setOptions] = useState(STATES_USA.filter((state) => !filterList || !filterList.length || filterList.includes(state.code)));
  const _id = id ?? useId();
  useEffect(() => {
    switch (countryCode) {
      case "USA":
      case "US":
        return setOptions(STATES_USA.filter((state) => !filterList || !filterList.length || filterList.includes(state.code)));
      case "CA":
      case "CAN":
        return setOptions(TERRITORIES_CANADA.filter((state) => !filterList || !filterList.length || filterList.includes(state.code)));
      default:
        return setOptions([]);
    }
  }, [countryCode, filterList]);
  const changeHandler = (ev) => {
    onChange(ev.target.value);
  };
  return /* @__PURE__ */ jsxs(
    TextField,
    {
      select: true,
      label: "State / Territory",
      slotProps: {
        input: { id: _id },
        inputLabel: { htmlFor: _id }
      },
      ...rest,
      value: value ?? "",
      onChange: changeHandler,
      fullWidth: true,
      children: [
        !allowAllStates && /* @__PURE__ */ jsx(MenuItem, { children: "Select One" }),
        allowAllStates && /* @__PURE__ */ jsx(MenuItem, { children: "All States" }),
        options.map((option) => /* @__PURE__ */ jsx(MenuItem, { value: option.code, children: option.name }, option.code))
      ]
    }
  );
};
const COUNTRIES = [
  {
    "cca3": "ABW",
    "cca2": "AW",
    "name": "Aruba"
  },
  {
    "cca3": "AFG",
    "cca2": "AF",
    "name": "Afghanistan"
  },
  {
    "cca3": "AGO",
    "cca2": "AO",
    "name": "Angola"
  },
  {
    "cca3": "AIA",
    "cca2": "AI",
    "name": "Anguilla"
  },
  {
    "cca3": "ALA",
    "cca2": "AX",
    "name": "Åland Islands"
  },
  {
    "cca3": "ALB",
    "cca2": "AL",
    "name": "Albania"
  },
  {
    "cca3": "AND",
    "cca2": "AD",
    "name": "Andorra"
  },
  {
    "cca3": "ARE",
    "cca2": "AE",
    "name": "United Arab Emirates"
  },
  {
    "cca3": "ARG",
    "cca2": "AR",
    "name": "Argentina"
  },
  {
    "cca3": "ARM",
    "cca2": "AM",
    "name": "Armenia"
  },
  {
    "cca3": "ASM",
    "cca2": "AS",
    "name": "American Samoa"
  },
  {
    "cca3": "ATA",
    "cca2": "AQ",
    "name": "Antarctica"
  },
  {
    "cca3": "ATF",
    "cca2": "TF",
    "name": "French Southern and Antarctic Lands"
  },
  {
    "cca3": "ATG",
    "cca2": "AG",
    "name": "Antigua and Barbuda"
  },
  {
    "cca3": "AUS",
    "cca2": "AU",
    "name": "Australia"
  },
  {
    "cca3": "AUT",
    "cca2": "AT",
    "name": "Austria"
  },
  {
    "cca3": "AZE",
    "cca2": "AZ",
    "name": "Azerbaijan"
  },
  {
    "cca3": "BDI",
    "cca2": "BI",
    "name": "Burundi"
  },
  {
    "cca3": "BEL",
    "cca2": "BE",
    "name": "Belgium"
  },
  {
    "cca3": "BEN",
    "cca2": "BJ",
    "name": "Benin"
  },
  {
    "cca3": "BFA",
    "cca2": "BF",
    "name": "Burkina Faso"
  },
  {
    "cca3": "BGD",
    "cca2": "BD",
    "name": "Bangladesh"
  },
  {
    "cca3": "BGR",
    "cca2": "BG",
    "name": "Bulgaria"
  },
  {
    "cca3": "BHR",
    "cca2": "BH",
    "name": "Bahrain"
  },
  {
    "cca3": "BHS",
    "cca2": "BS",
    "name": "Bahamas"
  },
  {
    "cca3": "BIH",
    "cca2": "BA",
    "name": "Bosnia and Herzegovina"
  },
  {
    "cca3": "BLM",
    "cca2": "BL",
    "name": "Saint Barthélemy"
  },
  {
    "cca3": "BLR",
    "cca2": "BY",
    "name": "Belarus"
  },
  {
    "cca3": "BLZ",
    "cca2": "BZ",
    "name": "Belize"
  },
  {
    "cca3": "BMU",
    "cca2": "BM",
    "name": "Bermuda"
  },
  {
    "cca3": "BOL",
    "cca2": "BO",
    "name": "Bolivia"
  },
  {
    "cca3": "BRA",
    "cca2": "BR",
    "name": "Brazil"
  },
  {
    "cca3": "BRB",
    "cca2": "BB",
    "name": "Barbados"
  },
  {
    "cca3": "BRN",
    "cca2": "BN",
    "name": "Brunei"
  },
  {
    "cca3": "BTN",
    "cca2": "BT",
    "name": "Bhutan"
  },
  {
    "cca3": "BVT",
    "cca2": "BV",
    "name": "Bouvet Island"
  },
  {
    "cca3": "BWA",
    "cca2": "BW",
    "name": "Botswana"
  },
  {
    "cca3": "CAF",
    "cca2": "CF",
    "name": "Central African Republic"
  },
  {
    "cca3": "CAN",
    "cca2": "CA",
    "name": "Canada"
  },
  {
    "cca3": "CCK",
    "cca2": "CC",
    "name": "Cocos (Keeling) Islands"
  },
  {
    "cca3": "CHE",
    "cca2": "CH",
    "name": "Switzerland"
  },
  {
    "cca3": "CHL",
    "cca2": "CL",
    "name": "Chile"
  },
  {
    "cca3": "CHN",
    "cca2": "CN",
    "name": "China"
  },
  {
    "cca3": "CIV",
    "cca2": "CI",
    "name": "Ivory Coast"
  },
  {
    "cca3": "CMR",
    "cca2": "CM",
    "name": "Cameroon"
  },
  {
    "cca3": "COD",
    "cca2": "CD",
    "name": "DR Congo"
  },
  {
    "cca3": "COG",
    "cca2": "CG",
    "name": "Republic of the Congo"
  },
  {
    "cca3": "COK",
    "cca2": "CK",
    "name": "Cook Islands"
  },
  {
    "cca3": "COL",
    "cca2": "CO",
    "name": "Colombia"
  },
  {
    "cca3": "COM",
    "cca2": "KM",
    "name": "Comoros"
  },
  {
    "cca3": "CPV",
    "cca2": "CV",
    "name": "Cape Verde"
  },
  {
    "cca3": "CRI",
    "cca2": "CR",
    "name": "Costa Rica"
  },
  {
    "cca3": "CUB",
    "cca2": "CU",
    "name": "Cuba"
  },
  {
    "cca3": "CUW",
    "cca2": "CW",
    "name": "Curaçao"
  },
  {
    "cca3": "CXR",
    "cca2": "CX",
    "name": "Christmas Island"
  },
  {
    "cca3": "CYM",
    "cca2": "KY",
    "name": "Cayman Islands"
  },
  {
    "cca3": "CYP",
    "cca2": "CY",
    "name": "Cyprus"
  },
  {
    "cca3": "CZE",
    "cca2": "CZ",
    "name": "Czech Republic"
  },
  {
    "cca3": "DEU",
    "cca2": "DE",
    "name": "Germany"
  },
  {
    "cca3": "DJI",
    "cca2": "DJ",
    "name": "Djibouti"
  },
  {
    "cca3": "DMA",
    "cca2": "DM",
    "name": "Dominica"
  },
  {
    "cca3": "DNK",
    "cca2": "DK",
    "name": "Denmark"
  },
  {
    "cca3": "DOM",
    "cca2": "DO",
    "name": "Dominican Republic"
  },
  {
    "cca3": "DZA",
    "cca2": "DZ",
    "name": "Algeria"
  },
  {
    "cca3": "ECU",
    "cca2": "EC",
    "name": "Ecuador"
  },
  {
    "cca3": "EGY",
    "cca2": "EG",
    "name": "Egypt"
  },
  {
    "cca3": "ERI",
    "cca2": "ER",
    "name": "Eritrea"
  },
  {
    "cca3": "ESH",
    "cca2": "EH",
    "name": "Western Sahara"
  },
  {
    "cca3": "ESP",
    "cca2": "ES",
    "name": "Spain"
  },
  {
    "cca3": "EST",
    "cca2": "EE",
    "name": "Estonia"
  },
  {
    "cca3": "ETH",
    "cca2": "ET",
    "name": "Ethiopia"
  },
  {
    "cca3": "FIN",
    "cca2": "FI",
    "name": "Finland"
  },
  {
    "cca3": "FJI",
    "cca2": "FJ",
    "name": "Fiji"
  },
  {
    "cca3": "FLK",
    "cca2": "FK",
    "name": "Falkland Islands"
  },
  {
    "cca3": "FRA",
    "cca2": "FR",
    "name": "France"
  },
  {
    "cca3": "FRO",
    "cca2": "FO",
    "name": "Faroe Islands"
  },
  {
    "cca3": "FSM",
    "cca2": "FM",
    "name": "Micronesia"
  },
  {
    "cca3": "GAB",
    "cca2": "GA",
    "name": "Gabon"
  },
  {
    "cca3": "GBR",
    "cca2": "GB",
    "name": "United Kingdom"
  },
  {
    "cca3": "GEO",
    "cca2": "GE",
    "name": "Georgia"
  },
  {
    "cca3": "GGY",
    "cca2": "GG",
    "name": "Guernsey"
  },
  {
    "cca3": "GHA",
    "cca2": "GH",
    "name": "Ghana"
  },
  {
    "cca3": "GIB",
    "cca2": "GI",
    "name": "Gibraltar"
  },
  {
    "cca3": "GIN",
    "cca2": "GN",
    "name": "Guinea"
  },
  {
    "cca3": "GLP",
    "cca2": "GP",
    "name": "Guadeloupe"
  },
  {
    "cca3": "GMB",
    "cca2": "GM",
    "name": "Gambia"
  },
  {
    "cca3": "GNB",
    "cca2": "GW",
    "name": "Guinea-Bissau"
  },
  {
    "cca3": "GNQ",
    "cca2": "GQ",
    "name": "Equatorial Guinea"
  },
  {
    "cca3": "GRC",
    "cca2": "GR",
    "name": "Greece"
  },
  {
    "cca3": "GRD",
    "cca2": "GD",
    "name": "Grenada"
  },
  {
    "cca3": "GRL",
    "cca2": "GL",
    "name": "Greenland"
  },
  {
    "cca3": "GTM",
    "cca2": "GT",
    "name": "Guatemala"
  },
  {
    "cca3": "GUF",
    "cca2": "GF",
    "name": "French Guiana"
  },
  {
    "cca3": "GUM",
    "cca2": "GU",
    "name": "Guam"
  },
  {
    "cca3": "GUY",
    "cca2": "GY",
    "name": "Guyana"
  },
  {
    "cca3": "HKG",
    "cca2": "HK",
    "name": "Hong Kong"
  },
  {
    "cca3": "HMD",
    "cca2": "HM",
    "name": "Heard Island and McDonald Islands"
  },
  {
    "cca3": "HND",
    "cca2": "HN",
    "name": "Honduras"
  },
  {
    "cca3": "HRV",
    "cca2": "HR",
    "name": "Croatia"
  },
  {
    "cca3": "HTI",
    "cca2": "HT",
    "name": "Haiti"
  },
  {
    "cca3": "HUN",
    "cca2": "HU",
    "name": "Hungary"
  },
  {
    "cca3": "IDN",
    "cca2": "ID",
    "name": "Indonesia"
  },
  {
    "cca3": "IMN",
    "cca2": "IM",
    "name": "Isle of Man"
  },
  {
    "cca3": "IND",
    "cca2": "IN",
    "name": "India"
  },
  {
    "cca3": "IOT",
    "cca2": "IO",
    "name": "British Indian Ocean Territory"
  },
  {
    "cca3": "IRL",
    "cca2": "IE",
    "name": "Ireland"
  },
  {
    "cca3": "IRN",
    "cca2": "IR",
    "name": "Iran"
  },
  {
    "cca3": "IRQ",
    "cca2": "IQ",
    "name": "Iraq"
  },
  {
    "cca3": "ISL",
    "cca2": "IS",
    "name": "Iceland"
  },
  {
    "cca3": "ISR",
    "cca2": "IL",
    "name": "Israel"
  },
  {
    "cca3": "ITA",
    "cca2": "IT",
    "name": "Italy"
  },
  {
    "cca3": "JAM",
    "cca2": "JM",
    "name": "Jamaica"
  },
  {
    "cca3": "JEY",
    "cca2": "JE",
    "name": "Jersey"
  },
  {
    "cca3": "JOR",
    "cca2": "JO",
    "name": "Jordan"
  },
  {
    "cca3": "JPN",
    "cca2": "JP",
    "name": "Japan"
  },
  {
    "cca3": "KAZ",
    "cca2": "KZ",
    "name": "Kazakhstan"
  },
  {
    "cca3": "KEN",
    "cca2": "KE",
    "name": "Kenya"
  },
  {
    "cca3": "KGZ",
    "cca2": "KG",
    "name": "Kyrgyzstan"
  },
  {
    "cca3": "KHM",
    "cca2": "KH",
    "name": "Cambodia"
  },
  {
    "cca3": "KIR",
    "cca2": "KI",
    "name": "Kiribati"
  },
  {
    "cca3": "KNA",
    "cca2": "KN",
    "name": "Saint Kitts and Nevis"
  },
  {
    "cca3": "KOR",
    "cca2": "KR",
    "name": "South Korea"
  },
  {
    "cca3": "UNK",
    "cca2": "XK",
    "name": "Kosovo"
  },
  {
    "cca3": "KWT",
    "cca2": "KW",
    "name": "Kuwait"
  },
  {
    "cca3": "LAO",
    "cca2": "LA",
    "name": "Laos"
  },
  {
    "cca3": "LBN",
    "cca2": "LB",
    "name": "Lebanon"
  },
  {
    "cca3": "LBR",
    "cca2": "LR",
    "name": "Liberia"
  },
  {
    "cca3": "LBY",
    "cca2": "LY",
    "name": "Libya"
  },
  {
    "cca3": "LCA",
    "cca2": "LC",
    "name": "Saint Lucia"
  },
  {
    "cca3": "LIE",
    "cca2": "LI",
    "name": "Liechtenstein"
  },
  {
    "cca3": "LKA",
    "cca2": "LK",
    "name": "Sri Lanka"
  },
  {
    "cca3": "LSO",
    "cca2": "LS",
    "name": "Lesotho"
  },
  {
    "cca3": "LTU",
    "cca2": "LT",
    "name": "Lithuania"
  },
  {
    "cca3": "LUX",
    "cca2": "LU",
    "name": "Luxembourg"
  },
  {
    "cca3": "LVA",
    "cca2": "LV",
    "name": "Latvia"
  },
  {
    "cca3": "MAC",
    "cca2": "MO",
    "name": "Macau"
  },
  {
    "cca3": "MAF",
    "cca2": "MF",
    "name": "Saint Martin"
  },
  {
    "cca3": "MAR",
    "cca2": "MA",
    "name": "Morocco"
  },
  {
    "cca3": "MCO",
    "cca2": "MC",
    "name": "Monaco"
  },
  {
    "cca3": "MDA",
    "cca2": "MD",
    "name": "Moldova"
  },
  {
    "cca3": "MDG",
    "cca2": "MG",
    "name": "Madagascar"
  },
  {
    "cca3": "MDV",
    "cca2": "MV",
    "name": "Maldives"
  },
  {
    "cca3": "MEX",
    "cca2": "MX",
    "name": "Mexico"
  },
  {
    "cca3": "MHL",
    "cca2": "MH",
    "name": "Marshall Islands"
  },
  {
    "cca3": "MKD",
    "cca2": "MK",
    "name": "Macedonia"
  },
  {
    "cca3": "MLI",
    "cca2": "ML",
    "name": "Mali"
  },
  {
    "cca3": "MLT",
    "cca2": "MT",
    "name": "Malta"
  },
  {
    "cca3": "MMR",
    "cca2": "MM",
    "name": "Myanmar"
  },
  {
    "cca3": "MNE",
    "cca2": "ME",
    "name": "Montenegro"
  },
  {
    "cca3": "MNG",
    "cca2": "MN",
    "name": "Mongolia"
  },
  {
    "cca3": "MNP",
    "cca2": "MP",
    "name": "Northern Mariana Islands"
  },
  {
    "cca3": "MOZ",
    "cca2": "MZ",
    "name": "Mozambique"
  },
  {
    "cca3": "MRT",
    "cca2": "MR",
    "name": "Mauritania"
  },
  {
    "cca3": "MSR",
    "cca2": "MS",
    "name": "Montserrat"
  },
  {
    "cca3": "MTQ",
    "cca2": "MQ",
    "name": "Martinique"
  },
  {
    "cca3": "MUS",
    "cca2": "MU",
    "name": "Mauritius"
  },
  {
    "cca3": "MWI",
    "cca2": "MW",
    "name": "Malawi"
  },
  {
    "cca3": "MYS",
    "cca2": "MY",
    "name": "Malaysia"
  },
  {
    "cca3": "MYT",
    "cca2": "YT",
    "name": "Mayotte"
  },
  {
    "cca3": "NAM",
    "cca2": "NA",
    "name": "Namibia"
  },
  {
    "cca3": "NCL",
    "cca2": "NC",
    "name": "New Caledonia"
  },
  {
    "cca3": "NER",
    "cca2": "NE",
    "name": "Niger"
  },
  {
    "cca3": "NFK",
    "cca2": "NF",
    "name": "Norfolk Island"
  },
  {
    "cca3": "NGA",
    "cca2": "NG",
    "name": "Nigeria"
  },
  {
    "cca3": "NIC",
    "cca2": "NI",
    "name": "Nicaragua"
  },
  {
    "cca3": "NIU",
    "cca2": "NU",
    "name": "Niue"
  },
  {
    "cca3": "NLD",
    "cca2": "NL",
    "name": "Netherlands"
  },
  {
    "cca3": "NOR",
    "cca2": "NO",
    "name": "Norway"
  },
  {
    "cca3": "NPL",
    "cca2": "NP",
    "name": "Nepal"
  },
  {
    "cca3": "NRU",
    "cca2": "NR",
    "name": "Nauru"
  },
  {
    "cca3": "NZL",
    "cca2": "NZ",
    "name": "New Zealand"
  },
  {
    "cca3": "OMN",
    "cca2": "OM",
    "name": "Oman"
  },
  {
    "cca3": "PAK",
    "cca2": "PK",
    "name": "Pakistan"
  },
  {
    "cca3": "PAN",
    "cca2": "PA",
    "name": "Panama"
  },
  {
    "cca3": "PCN",
    "cca2": "PN",
    "name": "Pitcairn Islands"
  },
  {
    "cca3": "PER",
    "cca2": "PE",
    "name": "Peru"
  },
  {
    "cca3": "PHL",
    "cca2": "PH",
    "name": "Philippines"
  },
  {
    "cca3": "PLW",
    "cca2": "PW",
    "name": "Palau"
  },
  {
    "cca3": "PNG",
    "cca2": "PG",
    "name": "Papua New Guinea"
  },
  {
    "cca3": "POL",
    "cca2": "PL",
    "name": "Poland"
  },
  {
    "cca3": "PRI",
    "cca2": "PR",
    "name": "Puerto Rico"
  },
  {
    "cca3": "PRK",
    "cca2": "KP",
    "name": "North Korea"
  },
  {
    "cca3": "PRT",
    "cca2": "PT",
    "name": "Portugal"
  },
  {
    "cca3": "PRY",
    "cca2": "PY",
    "name": "Paraguay"
  },
  {
    "cca3": "PSE",
    "cca2": "PS",
    "name": "Palestine"
  },
  {
    "cca3": "PYF",
    "cca2": "PF",
    "name": "French Polynesia"
  },
  {
    "cca3": "QAT",
    "cca2": "QA",
    "name": "Qatar"
  },
  {
    "cca3": "REU",
    "cca2": "RE",
    "name": "Réunion"
  },
  {
    "cca3": "ROU",
    "cca2": "RO",
    "name": "Romania"
  },
  {
    "cca3": "RUS",
    "cca2": "RU",
    "name": "Russia"
  },
  {
    "cca3": "RWA",
    "cca2": "RW",
    "name": "Rwanda"
  },
  {
    "cca3": "SAU",
    "cca2": "SA",
    "name": "Saudi Arabia"
  },
  {
    "cca3": "SDN",
    "cca2": "SD",
    "name": "Sudan"
  },
  {
    "cca3": "SEN",
    "cca2": "SN",
    "name": "Senegal"
  },
  {
    "cca3": "SGP",
    "cca2": "SG",
    "name": "Singapore"
  },
  {
    "cca3": "SGS",
    "cca2": "GS",
    "name": "South Georgia"
  },
  {
    "cca3": "SJM",
    "cca2": "SJ",
    "name": "Svalbard and Jan Mayen"
  },
  {
    "cca3": "SLB",
    "cca2": "SB",
    "name": "Solomon Islands"
  },
  {
    "cca3": "SLE",
    "cca2": "SL",
    "name": "Sierra Leone"
  },
  {
    "cca3": "SLV",
    "cca2": "SV",
    "name": "El Salvador"
  },
  {
    "cca3": "SMR",
    "cca2": "SM",
    "name": "San Marino"
  },
  {
    "cca3": "SOM",
    "cca2": "SO",
    "name": "Somalia"
  },
  {
    "cca3": "SPM",
    "cca2": "PM",
    "name": "Saint Pierre and Miquelon"
  },
  {
    "cca3": "SRB",
    "cca2": "RS",
    "name": "Serbia"
  },
  {
    "cca3": "SSD",
    "cca2": "SS",
    "name": "South Sudan"
  },
  {
    "cca3": "STP",
    "cca2": "ST",
    "name": "São Tomé and Príncipe"
  },
  {
    "cca3": "SUR",
    "cca2": "SR",
    "name": "Suriname"
  },
  {
    "cca3": "SVK",
    "cca2": "SK",
    "name": "Slovakia"
  },
  {
    "cca3": "SVN",
    "cca2": "SI",
    "name": "Slovenia"
  },
  {
    "cca3": "SWE",
    "cca2": "SE",
    "name": "Sweden"
  },
  {
    "cca3": "SWZ",
    "cca2": "SZ",
    "name": "Swaziland"
  },
  {
    "cca3": "SXM",
    "cca2": "SX",
    "name": "Sint Maarten"
  },
  {
    "cca3": "SYC",
    "cca2": "SC",
    "name": "Seychelles"
  },
  {
    "cca3": "SYR",
    "cca2": "SY",
    "name": "Syria"
  },
  {
    "cca3": "TCA",
    "cca2": "TC",
    "name": "Turks and Caicos Islands"
  },
  {
    "cca3": "TCD",
    "cca2": "TD",
    "name": "Chad"
  },
  {
    "cca3": "TGO",
    "cca2": "TG",
    "name": "Togo"
  },
  {
    "cca3": "THA",
    "cca2": "TH",
    "name": "Thailand"
  },
  {
    "cca3": "TJK",
    "cca2": "TJ",
    "name": "Tajikistan"
  },
  {
    "cca3": "TKL",
    "cca2": "TK",
    "name": "Tokelau"
  },
  {
    "cca3": "TKM",
    "cca2": "TM",
    "name": "Turkmenistan"
  },
  {
    "cca3": "TLS",
    "cca2": "TL",
    "name": "Timor-Leste"
  },
  {
    "cca3": "TON",
    "cca2": "TO",
    "name": "Tonga"
  },
  {
    "cca3": "TTO",
    "cca2": "TT",
    "name": "Trinidad and Tobago"
  },
  {
    "cca3": "TUN",
    "cca2": "TN",
    "name": "Tunisia"
  },
  {
    "cca3": "TUR",
    "cca2": "TR",
    "name": "Turkey"
  },
  {
    "cca3": "TUV",
    "cca2": "TV",
    "name": "Tuvalu"
  },
  {
    "cca3": "TWN",
    "cca2": "TW",
    "name": "Taiwan"
  },
  {
    "cca3": "TZA",
    "cca2": "TZ",
    "name": "Tanzania"
  },
  {
    "cca3": "UGA",
    "cca2": "UG",
    "name": "Uganda"
  },
  {
    "cca3": "UKR",
    "cca2": "UA",
    "name": "Ukraine"
  },
  {
    "cca3": "UMI",
    "cca2": "UM",
    "name": "United States Minor Outlying Islands"
  },
  {
    "cca3": "URY",
    "cca2": "UY",
    "name": "Uruguay"
  },
  {
    "cca3": "USA",
    "cca2": "US",
    "name": "United States"
  },
  {
    "cca3": "UZB",
    "cca2": "UZ",
    "name": "Uzbekistan"
  },
  {
    "cca3": "VAT",
    "cca2": "VA",
    "name": "Vatican City"
  },
  {
    "cca3": "VCT",
    "cca2": "VC",
    "name": "Saint Vincent and the Grenadines"
  },
  {
    "cca3": "VEN",
    "cca2": "VE",
    "name": "Venezuela"
  },
  {
    "cca3": "VGB",
    "cca2": "VG",
    "name": "British Virgin Islands"
  },
  {
    "cca3": "VIR",
    "cca2": "VI",
    "name": "United States Virgin Islands"
  },
  {
    "cca3": "VNM",
    "cca2": "VN",
    "name": "Vietnam"
  },
  {
    "cca3": "VUT",
    "cca2": "VU",
    "name": "Vanuatu"
  },
  {
    "cca3": "WLF",
    "cca2": "WF",
    "name": "Wallis and Futuna"
  },
  {
    "cca3": "WSM",
    "cca2": "WS",
    "name": "Samoa"
  },
  {
    "cca3": "YEM",
    "cca2": "YE",
    "name": "Yemen"
  },
  {
    "cca3": "ZAF",
    "cca2": "ZA",
    "name": "South Africa"
  },
  {
    "cca3": "ZMB",
    "cca2": "ZM",
    "name": "Zambia"
  },
  {
    "cca3": "ZWE",
    "cca2": "ZW",
    "name": "Zimbabwe"
  }
];
const CountrySelect = ({ value, onChange, id, ...rest }) => {
  const _id = id ?? useId();
  const changeHandler = (ev) => {
    onChange(ev.target.value);
  };
  return /* @__PURE__ */ jsxs(
    TextField,
    {
      select: true,
      label: "Country",
      slotProps: {
        input: { id: _id },
        inputLabel: { htmlFor: _id }
      },
      ...rest,
      onChange: changeHandler,
      value: value ?? "",
      fullWidth: true,
      children: [
        /* @__PURE__ */ jsx(MenuItem, { children: "Select One" }),
        COUNTRIES.map((option) => /* @__PURE__ */ jsx(MenuItem, { value: option.cca3, children: option.name }, option.cca3))
      ]
    }
  );
};
const AddressFormFields = ({ address, onChange, readOnly, addressType }) => {
  if (!addressType) {
    addressType = "billing";
  }
  const requiresStateCode = isUSA(address.CountryCode ?? "") || isCanada(address.CountryCode ?? "");
  const changeHandler = (field) => (ev) => {
    switch (field) {
      case "AddressLine1":
      case "AddressLine2":
      case "AddressLine3":
      case "City":
      case "State":
      case "ZipCode":
        return onChange({ [field]: ev.target.value });
    }
  };
  const valueChangeHandler = (field) => (value) => {
    switch (field) {
      case "State":
      case "CountryCode":
        return onChange({ [field]: value });
    }
  };
  return /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 1, children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        variant: "filled",
        fullWidth: true,
        label: "Address 1",
        size: "small",
        onChange: changeHandler("AddressLine1"),
        value: address.AddressLine1 ?? "",
        slotProps: {
          htmlInput: {
            readOnly,
            maxLength: 30,
            autoComplete: `${addressType} address-line1`
          }
        },
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      TextField,
      {
        variant: "filled",
        fullWidth: true,
        label: "Address 2",
        size: "small",
        onChange: changeHandler("AddressLine2"),
        value: address.AddressLine2 ?? "",
        slotProps: {
          htmlInput: {
            readOnly,
            maxLength: 30,
            autoComplete: `${addressType} address-line2`
          }
        }
      }
    ),
    /* @__PURE__ */ jsx(
      TextField,
      {
        variant: "filled",
        onChange: changeHandler("AddressLine3"),
        value: address.AddressLine3 ?? "",
        slotProps: {
          htmlInput: {
            readOnly,
            maxLength: 30,
            autoComplete: `${addressType} address-line3`
          }
        },
        size: "small",
        fullWidth: true,
        label: "Address 3"
      }
    ),
    /* @__PURE__ */ jsx(
      TextField,
      {
        variant: "filled",
        fullWidth: true,
        size: "small",
        label: "City",
        onChange: changeHandler("City"),
        value: address.City ?? "",
        slotProps: {
          htmlInput: {
            readOnly,
            maxLength: 30,
            autoComplete: `${addressType} address-level2`
          }
        },
        required: true
      }
    ),
    /* @__PURE__ */ jsxs(Stack, { direction: { xs: "column", md: "row" }, spacing: 1, children: [
      requiresStateCode && /* @__PURE__ */ jsx(
        StateSelect,
        {
          value: address.State ?? "",
          countryCode: address.CountryCode,
          required: true,
          slotProps: {
            htmlInput: {
              readOnly,
              disabled: readOnly,
              autoComplete: `${addressType} address-level1`
            }
          },
          variant: "filled",
          size: "small",
          onChange: valueChangeHandler("State")
        }
      ),
      !requiresStateCode && /* @__PURE__ */ jsx(
        TextField,
        {
          variant: "filled",
          onChange: changeHandler("State"),
          value: address.State ?? "",
          slotProps: {
            htmlInput: {
              readOnly,
              maxLength: 30,
              autoComplete: `${addressType} address-level1`
            }
          },
          size: "small",
          required: true,
          fullWidth: true,
          label: "State"
        }
      ),
      /* @__PURE__ */ jsx(
        TextField,
        {
          variant: "filled",
          fullWidth: true,
          label: "Postal Code",
          size: "small",
          onChange: changeHandler("ZipCode"),
          value: address.ZipCode ?? "",
          slotProps: {
            htmlInput: {
              readOnly,
              maxLength: 10,
              autoComplete: `${addressType} postal-code`
            }
          },
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        CountrySelect,
        {
          value: address.CountryCode ?? "",
          onChange: valueChangeHandler("CountryCode"),
          variant: "filled",
          size: "small",
          slotProps: {
            htmlInput: {
              autoComplete: `${addressType} country-code`,
              readOnly,
              disabled: readOnly
            }
          },
          required: true
        }
      )
    ] })
  ] });
};
const newCustomer = {
  email: "",
  name: "",
  hasAccount: true,
  account: "",
  accountName: "",
  telephone: "",
  address: null,
  agreeToPolicy: false
};
const newAddress = {
  CustomerName: "",
  AddressLine1: "",
  AddressLine2: "",
  AddressLine3: "",
  City: "",
  State: "",
  ZipCode: "",
  CountryCode: "USA"
};
const CustomerSignUp = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState(newCustomer);
  const status = useAppSelector(selectSignUpStatus);
  const error = useAppSelector(selectSignUpError);
  const submitHandler = (ev) => {
    ev.preventDefault();
    dispatch(signUpUser(user));
  };
  const changeHandler = (field) => (ev) => {
    const update = { ...user };
    switch (field) {
      case "hasAccount":
      case "agreeToPolicy":
        setUser({ ...update, [field]: ev.target.checked });
        return;
      case "address":
        return;
      default:
        setUser({ ...update, [field]: ev.target.value });
    }
  };
  const addressChangeHandler = (arg) => {
    const address = user.address ?? newAddress;
    setUser({ ...user, address: { ...address, ...arg } });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    status === "saving" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
    /* @__PURE__ */ jsx("form", { onSubmit: submitHandler, children: /* @__PURE__ */ jsxs(Stack, { spacing: 1, direction: "column", children: [
      /* @__PURE__ */ jsx(
        TextField,
        {
          variant: "filled",
          label: "Your Name",
          required: true,
          value: user.name,
          onChange: changeHandler("name"),
          autoComplete: "name"
        }
      ),
      /* @__PURE__ */ jsx(
        TextField,
        {
          variant: "filled",
          label: "Your Email Address",
          required: true,
          type: "email",
          value: user.email,
          onChange: changeHandler("email"),
          autoComplete: "email"
        }
      ),
      /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Your Company Name",
          variant: "filled",
          value: user.accountName,
          onChange: changeHandler("accountName"),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(FormGroup, { children: /* @__PURE__ */ jsx(
        FormControlLabel,
        {
          control: /* @__PURE__ */ jsx(Checkbox, { checked: user.hasAccount, onChange: changeHandler("hasAccount") }),
          label: "I have a CHUMS Account"
        }
      ) }),
      user.hasAccount && /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Your Account Number",
          variant: "filled",
          value: user.account,
          onChange: changeHandler("account"),
          helperText: /* @__PURE__ */ jsxs("div", { children: [
            "Your account number will be in the format ##-XX#### and can be found in a recent order or invoice.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("em", { children: "Example: 01-UT0000" })
          ] })
        }
      ),
      !user.hasAccount && /* @__PURE__ */ jsx(
        AddressFormFields,
        {
          onChange: addressChangeHandler,
          address: user.address ?? newAddress,
          addressType: "billing"
        }
      ),
      /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Your Telephone #",
          type: "tel",
          variant: "filled",
          autoComplete: "tel",
          required: !user.hasAccount,
          value: user.telephone,
          onChange: changeHandler("telephone")
        }
      ),
      /* @__PURE__ */ jsx(FormGroup, { children: /* @__PURE__ */ jsx(
        FormControlLabel,
        {
          control: /* @__PURE__ */ jsx(Checkbox, { checked: user.agreeToPolicy, onChange: changeHandler("agreeToPolicy") }),
          label: "I Agree to CHUMS Minimum Advertised Price and Site Usage Policies."
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", variant: "contained", disabled: !user.agreeToPolicy, children: "Request Account" })
    ] }) }),
    !!error && error === USER_EXISTS && /* @__PURE__ */ jsxs(Alert, { severity: "warning", variant: "filled", children: [
      "If you've recently signed up and have not received an email to validate your account",
      " ",
      " and set your password please contact CHUMS Customer Service (800-222-2486 or",
      " ",
      " ",
      /* @__PURE__ */ jsx(
        Link$2,
        {
          href: "mailto:cs@chums.com?subject=Problems%20signing%20up%20for%20CHUMS%20B2B",
          target: "_blank",
          children: "send an email"
        }
      ),
      ") or",
      " ",
      " go to the ",
      /* @__PURE__ */ jsx(Link$2, { component: Link$1, to: PATH_LOGIN, children: "Login Page" }),
      " to send a new link to set",
      " ",
      " your password;"
    ] })
  ] });
};
const replacements = [
  { find: /youtube\.com/g, replace: "youtube-nocookie.com" }
];
function HTMLContent({ html, ...rest }) {
  const allowsMarketing = useAppSelector(selectAllowsMarketing);
  const [htmlContent, setHtmlContent] = useState(html);
  useEffect(() => {
    if (!allowsMarketing) {
      let _html = html;
      replacements.forEach(({ find, replace }) => _html = _html.replace(find, replace));
      setHtmlContent(_html);
      return;
    }
    setHtmlContent(html);
  }, [html, allowsMarketing]);
  if (!html) {
    return null;
  }
  return /* @__PURE__ */ jsx(Box, { ...rest, dangerouslySetInnerHTML: { __html: htmlContent } });
}
const MAPPolicy = () => {
  const dispatch = useAppDispatch();
  const content = useAppSelector(selectPageContent);
  useEffect(() => {
    dispatch(loadPage("map-policy"));
  }, []);
  if (!content || content.keyword !== "map-policy") {
    return null;
  }
  return /* @__PURE__ */ jsx(Card, { variant: "outlined", children: /* @__PURE__ */ jsxs(CardContent, { children: [
    /* @__PURE__ */ jsx(Typography, { gutterBottom: true, variant: "h3", component: "h3", children: content.title }),
    /* @__PURE__ */ jsx(Typography, { variant: "body1", sx: { fontSize: "small" }, children: /* @__PURE__ */ jsx(HTMLContent, { html: content?.content ?? "" }) })
  ] }) });
};
const UsagePolicy = () => {
  return /* @__PURE__ */ jsx(Card, { variant: "outlined", children: /* @__PURE__ */ jsxs(CardContent, { children: [
    /* @__PURE__ */ jsx(Typography, { gutterBottom: true, variant: "h3", component: "h3", children: "Usage Policy" }),
    /* @__PURE__ */ jsxs(Typography, { variant: "body1", sx: { fontSize: "small" }, children: [
      /* @__PURE__ */ jsx("p", { children: "This system is for the use of authorized users only. Individuals using this computer system without authority, or in excess of their authority, are subject to having all of their activities on this system monitored and recorded by system personnel." }),
      /* @__PURE__ */ jsx("p", { children: "In the course of monitoring individuals improperly using this system, or in the course of system maintenance, the activities of authorized users may also be monitored." }),
      /* @__PURE__ */ jsx("p", { children: "Anyone using this system expressly consents to such monitoring and is advised that if such monitoring reveals possible evidence of criminal activity, system personnel may provide the evidence of such monitoring to law enforcement officials." })
    ] })
  ] }) });
};
const useIsSSR = () => {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  return isSSR;
};
const SignUp = () => {
  const isSSR = useIsSSR();
  const navigate = useNavigate();
  const loggedIn = useAppSelector(selectLoggedIn);
  useEffect(() => {
    if (loggedIn) {
      navigate("/profile", { replace: true });
    }
  }, [loggedIn]);
  useEffect(() => {
    if (isSSR) {
      return;
    }
    const params = new URLSearchParams(document?.location?.search);
    const hash = params.get("h") ?? "";
    const key = params.get("key") ?? "";
    if (!loggedIn && !!hash && !!key) {
      navigate(PATH_SET_PASSWORD + document?.location?.search, { replace: true });
    }
  }, [isSSR]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle: documentTitles.signUp }),
    /* @__PURE__ */ jsx(Typography, { variant: "h1", component: "h1", sx: { my: 3 }, children: "Chums B2B Portal" }),
    /* @__PURE__ */ jsx(Typography, { component: "h2", variant: "h2", gutterBottom: true, children: "Sign Up" }),
    /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 2, children: [
        /* @__PURE__ */ jsx(UsagePolicy, {}),
        /* @__PURE__ */ jsx(MAPPolicy, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsx(CustomerSignUp, {}) })
    ] })
  ] });
};
function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  }, [dispatch, navigate]);
  return /* @__PURE__ */ jsx("div", { children: "Logging out." });
}
const maxPasswordLength = 256;
const minPasswordLength = 8;
const PasswordForm = ({ email, disabled, isPasswordReset, onSubmit, onCancel }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const submitHandler = (ev) => {
    ev.preventDefault();
    return onSubmit({ oldPassword, newPassword: password1 });
  };
  return /* @__PURE__ */ jsxs(Box, { children: [
    /* @__PURE__ */ jsx(Typography, { component: "h3", variant: "h3", sx: { my: 3 }, children: isPasswordReset ? "Set your password" : "Update your password" }),
    /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 2, component: "form", onSubmit: submitHandler, name: "username", children: [
      /* @__PURE__ */ jsx(
        TextField,
        {
          variant: "filled",
          value: email ?? "",
          label: "Email",
          slotProps: {
            htmlInput: { readOnly: true, autoComplete: "username" }
          }
        }
      ),
      !isPasswordReset && /* @__PURE__ */ jsx(
        PasswordTextField,
        {
          type: "password",
          label: "Old Password",
          variant: "filled",
          value: oldPassword,
          onChange: (ev) => setOldPassword(ev.target.value),
          slotProps: {
            htmlInput: {
              maxLength: maxPasswordLength,
              minLength: minPasswordLength,
              autoComplete: "current-password"
            }
          },
          fullWidth: true,
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        PasswordTextField,
        {
          type: "password",
          label: "New Password",
          variant: "filled",
          fullWidth: true,
          required: true,
          value: password1,
          onChange: (ev) => setPassword1(ev.target.value),
          slotProps: {
            htmlInput: {
              maxLength: maxPasswordLength,
              minLength: minPasswordLength,
              autoComplete: "new-password"
            },
            formHelperText: { component: "div" }
          }
        }
      ),
      /* @__PURE__ */ jsx(
        PasswordTextField,
        {
          type: "password",
          label: "Confirm New Password",
          variant: "filled",
          fullWidth: true,
          required: true,
          value: password2,
          onChange: (ev) => setPassword2(ev.target.value),
          slotProps: {
            htmlInput: {
              maxLength: maxPasswordLength,
              minLength: minPasswordLength,
              autoComplete: "new-password"
            }
          },
          helperText: password2 !== password1 ? "Your new passwords do not match" : ""
        }
      ),
      /* @__PURE__ */ jsxs(Stack, { direction: "row", justifyContent: "flex-end", spacing: 2, children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "text", onClick: onCancel, children: "Cancel" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            variant: "contained",
            disabled: password1 !== password2 || disabled,
            children: "Update Password"
          }
        )
      ] })
    ] })
  ] });
};
const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectSignUpProfile);
  const loading = useAppSelector(selectSignUpStatus);
  const isSSR = useIsSSR();
  const params = useParams();
  const [alert, setAlert2] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isSSR) {
      let hash = params.hash ?? "";
      let key = params.key ?? "";
      if (!hash || !key) {
        const search = new URLSearchParams(document?.location?.search);
        hash = search.get("h") ?? "";
        key = search.get("key") ?? "";
      }
      dispatch(loadSignUpProfile({ hash, key })).then((res) => {
        const payload = res.payload;
        if (isErrorResponse(payload)) {
          setAlert2(payload.error ?? "An error occurred while loading the request.");
        }
      });
    }
  }, [isSSR, params]);
  const onSetPassword = useCallback(async (arg) => {
    if (!params || !params.key || !params.hash) {
      return;
    }
    const hash = params.hash;
    const key = params.key;
    const res = await dispatch(setNewPassword({ ...arg, hash, key }));
    const payload = res.payload;
    if (payload?.success) {
      navigate("/login", { state: { message: "Your password has been updated. Please log in again." } });
    } else if (payload?.error) {
      setAlert2(payload.error);
    }
  }, [params]);
  const cancelHandler = () => {
    navigate("/login");
  };
  return /* @__PURE__ */ jsxs(Container, { maxWidth: "sm", children: [
    /* @__PURE__ */ jsx(Typography, { component: "h1", variant: "h1", sx: { my: 3 }, children: "Chums B2B Portal" }),
    loading !== "idle" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
    profile && /* @__PURE__ */ jsxs(Typography, { component: "h2", variant: "h2", children: [
      "Welcome ",
      profile?.name
    ] }),
    /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 2, children: [
      !!alert && /* @__PURE__ */ jsx(Alert, { severity: "warning", title: "Reset password error:", children: alert }),
      /* @__PURE__ */ jsx(
        PasswordForm,
        {
          isPasswordReset: true,
          disabled: !profile,
          email: profile?.email,
          onSubmit: onSetPassword,
          onCancel: cancelHandler
        }
      )
    ] })
  ] });
};
const Content404Component = ({ children }) => /* @__PURE__ */ jsx(
  Grid,
  {
    size: { xs: 12, sm: 6 },
    sx: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
    children
  }
);
const StyledImg$1 = styled$1.img`
    max-width: 100%;
    width: 100%;
    height: auto;
    max-height: 50vh;
`;
const ContentPage404 = () => {
  return /* @__PURE__ */ jsx(Container, { maxWidth: "md", children: /* @__PURE__ */ jsxs(Grid, { container: true, children: [
    /* @__PURE__ */ jsxs(Content404Component, { children: [
      /* @__PURE__ */ jsx(Typography, { variant: "body1", sx: { fontSize: "2rem", textAlign: "center", mb: 2 }, children: "It looks like the page you were looking for can't be found." }),
      /* @__PURE__ */ jsxs(Typography, { variant: "body2", children: [
        "If you're looking for a product, browse our ",
        /* @__PURE__ */ jsx(Link$2, { component: Link$1, to: "/products/all", children: "products listing" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx(Content404Component, { children: /* @__PURE__ */ jsx(StyledImg$1, { src: "/images/chums/404-Booby.gif", alt: "Page not found" }) })
  ] }) });
};
function ContentPage() {
  const dispatch = useAppDispatch();
  const isLoggedIn2 = useAppSelector(selectLoggedIn);
  const content = useAppSelector(selectPageContent);
  const loading = useAppSelector(selectPageLoadingStatus);
  const loaded = useAppSelector(selectPageLoaded);
  const html = useAppSelector(selectPageHTML);
  const params = useParams();
  useEffect(() => {
    dispatch(loadPage(params.keyword));
  }, [params]);
  const onReload = () => {
    if (content?.keyword) {
      dispatch(loadPage(content.keyword));
    }
  };
  const documentTitle = `${loading === "loading" ? "Loading: " : ""}${content?.title ?? params.keyword}`;
  if (!content) {
    if (loading === "loading") {
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(DocumentTitle, { documentTitle }),
        /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" })
      ] });
    }
    if (loaded) {
      return /* @__PURE__ */ jsx(ContentPage404, {});
    }
  }
  if (!content?.status) {
    return /* @__PURE__ */ jsxs("div", { className: `page-${content?.keyword}`, children: [
      /* @__PURE__ */ jsx(DocumentTitle, { documentTitle }),
      /* @__PURE__ */ jsx(Typography, { component: "h1", variant: "h1", children: content?.title }),
      /* @__PURE__ */ jsx(Divider, { sx: { my: 3 } }),
      /* @__PURE__ */ jsx(ContentPage404, {})
    ] });
  }
  if (!isLoggedIn2 && content.requiresLogin) {
    return /* @__PURE__ */ jsxs("div", { className: `page-${content?.keyword}`, children: [
      /* @__PURE__ */ jsx(DocumentTitle, { documentTitle }),
      /* @__PURE__ */ jsx(Typography, { component: "h1", variant: "h1", children: content?.title }),
      /* @__PURE__ */ jsx(Divider, { sx: { my: 3 } }),
      /* @__PURE__ */ jsx(Alert, { severity: "warning", children: "Warning: This content requires login." })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: `page-${content?.keyword}`, children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle }),
    /* @__PURE__ */ jsx(Typography, { component: "h1", variant: "h1", onClick: onReload, children: content?.title }),
    /* @__PURE__ */ jsx(Divider, { sx: { my: 3 } }),
    loading === "loading" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
    !!html && /* @__PURE__ */ jsx(HTMLContent, { html, className: "has-bootstrap" })
  ] });
}
const noop = () => {
};
const ShippingMethods = {
  "1FEX_GROUND": {
    code: "1FEX_GROUND",
    description: "FedEX Ground",
    allowCustomerAccount: true,
    carrier: "fedex",
    enabled: true
  },
  "1UPS_GROUND": {
    code: "1UPS_GROUND",
    description: "UPS Ground",
    allowCustomerAccount: true,
    carrier: "ups",
    enabled: true
  },
  "APP_PRI_EXP ": { code: "APP_PRI_EXP", description: "USPS Priority", allowCustomerAccount: false, carrier: "usps", enabled: true },
  "USPS GND ADV": { code: "USPS GND ADV", description: "USPS Ground Advantage", allowCustomerAccount: false, carrier: "usps", enabled: true },
  "1FEX_1ST_ONIGHT": {
    code: "1FEX_1ST_ONIGHT",
    description: "FedEx 1st Overnight",
    allowCustomerAccount: true,
    carrier: "fedex"
  },
  "1FEX_DEFAIR": {
    code: "1FEX_DEFAIR",
    description: "FedEx Defered Air",
    allowCustomerAccount: true,
    carrier: "fedex"
  },
  "1FEX_ECN_2DAY": {
    code: "1FEX_ECN_2DAY",
    description: "FedEx Economy 2 Day",
    allowCustomerAccount: true,
    carrier: "fedex"
  },
  "1FEX_EXP_SAVER": {
    code: "1FEX_EXP_SAVER",
    description: "FedEx Express Saver",
    allowCustomerAccount: true,
    carrier: "fedex"
  },
  "1FEX_PRI_ONIGHT": {
    code: "1FEX_PRI_ONIGHT",
    description: "FedEx Priority Ovn",
    allowCustomerAccount: true,
    carrier: "fedex"
  },
  "1FEX_STD_ONIGHT": {
    code: "1FEX_STD_ONIGHT",
    description: "FedEx Std Overnight",
    allowCustomerAccount: true,
    carrier: "fedex"
  },
  "1UPS_2DAY": { code: "1UPS_2DAY", description: "UPS 2nd Day Air", allowCustomerAccount: true, carrier: "ups" },
  "1UPS_2DAY_AM": {
    code: "1UPS_2DAY_AM",
    description: "UPS 2nd Day Air AM",
    allowCustomerAccount: true,
    carrier: "ups"
  },
  "1UPS_3DAY": { code: "1UPS_3DAY", description: "UPS 3 Day Select", allowCustomerAccount: true, carrier: "ups" },
  "1UPS_NEXT_DAY": {
    code: "1UPS_NEXT_DAY",
    description: "UPS Next Day Air",
    allowCustomerAccount: true,
    carrier: "ups"
  },
  "1UPS_NEXT_DAY_S": {
    code: "1UPS_NEXT_DAY_S",
    description: "UPS Next Day SAVER",
    allowCustomerAccount: true,
    carrier: "ups"
  },
  "TO BE DECIDED": {
    code: "TO BE DECIDED",
    description: "To Be Decided",
    allowCustomerAccount: false,
    carrier: "",
    enabled: true
  }
};
const trackingURL = ({ trackingId, shipVia }) => {
  let carrier = SHIPPING_METHODS[shipVia]?.carrier;
  if (!carrier) {
    if (/fedex/i.test(shipVia)) {
      carrier = "fedex";
    } else if (/usps/i.test(shipVia)) {
      carrier = "usps";
    } else if (/ups/i.test(shipVia)) {
      carrier = "ups";
    }
  }
  switch (carrier) {
    case "ups":
      return `https://wwwapps.ups.com/WebTracking/processInputRequest?TypeOfInquiryNumber=T&InquiryNumber1=${trackingId}`;
    case "fedex":
      return `https://www.fedex.com/fedextrack/?tracknumbers=${trackingId}`;
    case "usps":
      return `https://tools.usps.com/go/TrackConfirmAction.action?tLabels=${trackingId}`;
    default:
      return null;
  }
};
const TrackingLinkBadge = ({ trackingId, shipVia, weight }) => {
  const url = trackingURL({ trackingId, shipVia });
  if (!url) {
    return null;
  }
  const label = `${trackingId}; ${weight} lb${weight === 1 ? "" : "s"}`;
  return /* @__PURE__ */ jsx(Chip, { component: Link$2, target: "_blank", href: url, icon: /* @__PURE__ */ jsx(LocalShippingIcon, {}), label, clickable: true });
};
function InvoiceTracking() {
  const tracking = useAppSelector(selectCurrentInvoiceTracking);
  if (!tracking.length) {
    return /* @__PURE__ */ jsx(Alert, { severity: "info", children: "Tracking is not available for this invoice." });
  }
  return /* @__PURE__ */ jsx("div", { children: tracking.map(
    (track) => /* @__PURE__ */ jsx(
      TrackingLinkBadge,
      {
        trackingId: track.TrackingID,
        shipVia: track.StarshipShipVia,
        weight: track.Weight
      },
      track.PackageNo
    )
  ) });
}
const InvoiceHeader = () => {
  const dispatch = useAppDispatch();
  const invoice = useAppSelector(selectCurrentInvoice);
  const permissions = useAppSelector(selectCustomerPermissions);
  const [confirmDuplicate, setConfirmDuplicate] = useState(false);
  const onCancelDuplicate = () => {
    setConfirmDuplicate(false);
  };
  const onReload = () => {
    if (!invoice) {
      return;
    }
    dispatch(loadInvoice(invoice));
  };
  if (!invoice) {
    return null;
  }
  const cancelHidden = !invoice.UDF_CANCEL_DATE || dayjs(invoice.UDF_CANCEL_DATE).valueOf() === 0;
  return /* @__PURE__ */ jsxs("div", { className: "mb-1", children: [
    /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "column", children: [
        /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: { xs: "column", lg: "row" }, children: [
          /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Sales Order",
              type: "text",
              fullWidth: true,
              variant: "filled",
              size: "small",
              value: invoice.SalesOrderNo ?? "Direct Invoice",
              placeholder: "",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          ),
          /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Purchase Order #",
              type: "text",
              fullWidth: true,
              variant: "filled",
              size: "small",
              value: invoice.CustomerPONo,
              placeholder: "",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: { xs: "column", lg: "row" }, children: [
          !!invoice.OrderDate && !!invoice.SalesOrderNo && /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Order Date",
              type: "date",
              fullWidth: true,
              variant: "filled",
              size: "small",
              value: dayjs(invoice.OrderDate).format("YYYY-MM-DD"),
              placeholder: "",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          ),
          !!invoice.ShipDate && /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Req. Ship Date",
              type: "date",
              fullWidth: true,
              variant: "filled",
              size: "small",
              value: dayjs(invoice.ShipDate).format("YYYY-MM-DD"),
              placeholder: "",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          ),
          !cancelHidden && /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Cancel Date",
              type: "date",
              fullWidth: true,
              variant: "filled",
              size: "small",
              value: dayjs(invoice.UDF_CANCEL_DATE).format("YYYY-MM-DD"),
              placeholder: "",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: { xs: "column", lg: "row" }, children: [
          /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Invoice Date",
              type: "date",
              fullWidth: true,
              variant: "filled",
              size: "small",
              value: dayjs(invoice.InvoiceDate).format("YYYY-MM-DD"),
              placeholder: "",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          ),
          !!invoice.InvoiceDueDate && /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Invoice Due Date",
              type: "date",
              fullWidth: true,
              variant: "filled",
              size: "small",
              value: dayjs(invoice.InvoiceDueDate).format("YYYY-MM-DD"),
              placeholder: "",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          ),
          permissions?.billTo && /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Balance Due",
              type: "text",
              fullWidth: true,
              variant: "filled",
              size: "small",
              value: numeral(new Decimal(invoice.Balance ?? "0")).format("$ 0,0.00"),
              placeholder: "",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Stack, { spacing: 2, direction: { xs: "column", lg: "row" }, children: !!invoice.UDF_PROMO_DEAL && /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Promo Code",
            type: "text",
            fullWidth: true,
            variant: "filled",
            size: "small",
            value: invoice.UDF_PROMO_DEAL,
            placeholder: "",
            slotProps: {
              htmlInput: { readOnly: true }
            }
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "column", children: [
        /* @__PURE__ */ jsx(ShipToSelect, { value: invoice.ShipToCode, onChange: () => {
        }, readOnly: true }),
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Delivery Address",
            type: "text",
            multiline: true,
            variant: "filled",
            size: "small",
            value: multiLineAddress(addressFromShipToAddress(invoice)).join("\n"),
            slotProps: {
              htmlInput: { readOnly: true }
            }
          }
        ),
        /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "row", useFlexGap: true, children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Ship Method",
              type: "text",
              fullWidth: true,
              variant: "filled",
              size: "small",
              value: ShippingMethods[invoice.ShipVia ?? "-"]?.description ?? "Unknown",
              placeholder: "",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          ) }),
          /* @__PURE__ */ jsx(InvoiceTracking, {})
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "row", sx: { justifyContent: "flex-end", mt: 2 }, children: [
      /* @__PURE__ */ jsx(Button, { variant: "outlined", disabled: !invoice.SalesOrderNo, onClick: () => setConfirmDuplicate(true), children: "Duplicate Order" }),
      /* @__PURE__ */ jsx(Button, { variant: "text", onClick: onReload, children: "Reload Invoice" })
    ] }),
    /* @__PURE__ */ jsx(
      DuplicateCartDialog,
      {
        open: confirmDuplicate,
        salesOrderNo: invoice.SalesOrderNo ?? "",
        shipToCode: invoice.ShipToCode,
        onClose: onCancelDuplicate
      }
    )
  ] });
};
const InvoiceDetailLine = ({ line, onAddToCart }) => {
  const {
    ItemType,
    ItemCode,
    ItemCodeDesc,
    UnitOfMeasure,
    QuantityOrdered,
    ProductType,
    ExplodedKitItem,
    PriceLevel,
    LineDiscountPercent,
    SuggestedRetailPrice,
    UDF_UPC,
    CommentText
  } = line;
  const isKitComponent = line.KitItem === "N" && line.ExplodedKitItem === "C";
  const rowClassName = {
    "item-comment": ItemType !== "4" && !!CommentText,
    "line-comment": ItemType === "4",
    "kit-item": ProductType === "K" && ExplodedKitItem === "Y"
  };
  const unitPrice = new Decimal(1).sub(new Decimal(line.LineDiscountPercent ?? 0).div(100)).times(new Decimal(line.UnitPrice ?? 0).div(line.UnitOfMeasureConvFactor ?? 1)).toString();
  const itemPrice = new Decimal(1).sub(new Decimal(line.LineDiscountPercent ?? 0).div(100)).times(line.UnitPrice ?? 0).toString();
  const showComment = ItemType !== "4" && !!CommentText;
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    !(ItemType === "4" && ItemCode === "/C") && !isKitComponent && /* @__PURE__ */ jsxs(TableRow, { sx: {
      '& > *:not([rowspan="2"])': { borderBottom: showComment ? "unset" : void 0 },
      verticalAlign: "top"
    }, children: [
      /* @__PURE__ */ jsxs(TableCell, { rowSpan: showComment ? 2 : 1, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "body1", sx: { fontWeight: 700 }, children: line.ItemCode }),
        ItemType === "1" && /* @__PURE__ */ jsx(OrderItemImage, { itemCode: ItemCode, itemCodeDesc: ItemCodeDesc, image: null })
      ] }),
      /* @__PURE__ */ jsxs(TableCell, { children: [
        /* @__PURE__ */ jsx("p", { children: ItemCodeDesc }),
        !!UDF_UPC && /* @__PURE__ */ jsx(FormattedUPC, { value: line.UDF_UPC })
      ] }),
      /* @__PURE__ */ jsx(TableCell, { children: UnitOfMeasure || null }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(line.QuantityOrdered).format("0,0") }),
      /* @__PURE__ */ jsxs(TableCell, { align: "right", children: [
        /* @__PURE__ */ jsx("div", { children: numeral(unitPrice).format("0,0.00") }),
        !!LineDiscountPercent && /* @__PURE__ */ jsxs("div", { className: "sale", children: [
          LineDiscountPercent,
          "% Off"
        ] }),
        !!PriceLevel && /* @__PURE__ */ jsx(PriceLevelNotice, { priceLevel: PriceLevel })
      ] }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", sx: {
        display: {
          xs: "none",
          md: "table-cell"
        }
      }, children: numeral(SuggestedRetailPrice).format("0,0.00") }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", sx: {
        display: {
          xs: "none",
          md: "table-cell"
        }
      }, children: numeral(itemPrice).format("0,0.00") }),
      /* @__PURE__ */ jsx(
        TableCell,
        {
          align: "right",
          children: numeral(new Decimal(line.QuantityOrdered ?? 0).times(itemPrice).toString()).format("0,0.00")
        }
      ),
      /* @__PURE__ */ jsx(TableCell, { rowSpan: showComment ? 2 : 1, children: /* @__PURE__ */ jsx(
        SalesOrderLineButtons,
        {
          onCopyToCart: () => onAddToCart(line),
          copyToCartDisabled: !line.ProductType || line.ProductType === "D" || line.InactiveItem === "Y" || line.ItemType !== "1"
        }
      ) })
    ] }),
    !(ItemType === "4" && ItemCode === "/C") && isKitComponent && /* @__PURE__ */ jsxs(TableRow, { sx: {
      verticalAlign: "top"
    }, children: [
      /* @__PURE__ */ jsx(TableCell, {}),
      /* @__PURE__ */ jsxs(TableCell, { children: [
        /* @__PURE__ */ jsx("p", { children: ItemCodeDesc }),
        !!UDF_UPC && /* @__PURE__ */ jsx("p", { children: UPCA.format(UDF_UPC) })
      ] }),
      /* @__PURE__ */ jsx(TableCell, { children: UnitOfMeasure || null }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(QuantityOrdered).format("0,0") }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: " " }),
      /* @__PURE__ */ jsx(
        TableCell,
        {
          sx: { display: { xs: "none", md: "table-cell" } },
          align: "right",
          children: numeral(SuggestedRetailPrice).format("0,0.00")
        }
      ),
      /* @__PURE__ */ jsx(TableCell, { sx: { display: { xs: "none", md: "table-cell" } }, align: "right", children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: /* @__PURE__ */ jsx(
        SalesOrderLineButtons,
        {
          onCopyToCart: () => onAddToCart(line),
          copyToCartDisabled: !line.ProductType || line.ProductType === "D" || line.InactiveItem === "Y" || line.ItemType !== "1"
        }
      ) })
    ] }),
    ProductType === "K" && ExplodedKitItem === "Y" && /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { children: " " }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 6, children: "Contains:" })
    ] }),
    (!!CommentText || ItemType === "4") && /* @__PURE__ */ jsxs(TableRow, { className: classNames("order-detail", rowClassName), children: [
      /* @__PURE__ */ jsx(TableCell, { children: " " }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 4, children: CommentText }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, sx: { display: { xs: "none", md: "table-cell" } }, children: " " }),
      /* @__PURE__ */ jsx(TableCell, { children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: " " })
    ] })
  ] });
};
const InvoiceFooterRow = ({ title, value }) => {
  return /* @__PURE__ */ jsxs(TableRow, { children: [
    /* @__PURE__ */ jsx(TableCell, { component: "th", scope: "row", colSpan: 6, align: "right", children: title }),
    /* @__PURE__ */ jsx(TableCell, { align: "right", colSpan: 2, children: value }),
    /* @__PURE__ */ jsx(TableCell, {})
  ] });
};
const InvoiceFooter = () => {
  const invoice = useAppSelector(selectCurrentInvoice);
  if (!invoice) {
    return null;
  }
  const subTotal = new Decimal(invoice.NonTaxableSalesAmt).add(invoice.TaxableSalesAmt);
  const salesTax = new Decimal(invoice.SalesTaxAmt);
  const freight = new Decimal(invoice.FreightAmt);
  const discountAmt = new Decimal(invoice.DiscountAmt);
  const total = subTotal.add(salesTax).add(freight).sub(discountAmt);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(InvoiceFooterRow, { title: "Sub Total", value: numeral(subTotal).format("$ 0,0.00") }),
    /* @__PURE__ */ jsx(
      InvoiceFooterRow,
      {
        title: `Sales Tax ${salesTax.eq(0) ? "" : invoice.TaxSchedule}`,
        value: numeral(salesTax).format("$ 0,0.00")
      }
    ),
    /* @__PURE__ */ jsx(InvoiceFooterRow, { title: "Freight", value: numeral(freight).format("$ 0,0.00") }),
    !discountAmt.eq(0) && /* @__PURE__ */ jsx(InvoiceFooterRow, { title: "Discount", value: numeral(discountAmt).format("$ 0,0.00") }),
    /* @__PURE__ */ jsx(InvoiceFooterRow, { title: "Total", value: numeral(total).format("$ 0,0.00") })
  ] });
};
const InvoicePageDetail = () => {
  const detail = useAppSelector(selectSortedInvoiceDetail);
  const [cartItem, setCartItem2] = useState(null);
  const [unitOfMeasure, setUnitOfMeasure] = useState("EA");
  const addToCartHandler = (line) => {
    setUnitOfMeasure(line.UnitOfMeasure);
    const item = {
      itemCode: line.ItemCode,
      quantity: Math.abs(+line.QuantityOrdered),
      comment: line.CommentText,
      name: line.ItemCodeDesc,
      productId: 0,
      image: ""
    };
    setCartItem2(item);
  };
  const quantityChangeHandler = (quantity) => {
    if (!cartItem) {
      return;
    }
    setCartItem2({ ...cartItem, quantity });
  };
  if (!detail.length) {
    return null;
  }
  const open = !!cartItem;
  return /* @__PURE__ */ jsxs(TableContainer, { sx: { mt: 3 }, children: [
    /* @__PURE__ */ jsxs(Table, { size: "small", children: [
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(TableRow, { className: "order-detail", children: [
        /* @__PURE__ */ jsx(TableCell, { children: "Item" }),
        /* @__PURE__ */ jsx(TableCell, { children: "Description" }),
        /* @__PURE__ */ jsx(TableCell, { children: "U/M" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "Ordered" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "Unit Price" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", sx: { display: { xs: "none", md: "table-cell" } }, children: "MSRP" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", sx: { display: { xs: "none", md: "table-cell" } }, children: "Item Price" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "Ext Price" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: detail.map((line) => /* @__PURE__ */ jsx(
        InvoiceDetailLine,
        {
          line,
          onAddToCart: addToCartHandler
        },
        line.DetailSeqNo
      )) }),
      /* @__PURE__ */ jsx(TableFooter, { children: /* @__PURE__ */ jsx(InvoiceFooter, {}) })
    ] }),
    /* @__PURE__ */ jsxs(Dialog, { open, onClose: () => setCartItem2(null), children: [
      /* @__PURE__ */ jsxs(DialogTitle, { children: [
        "Add '",
        cartItem?.itemCode,
        "' To Cart"
      ] }),
      /* @__PURE__ */ jsx(DialogContent, { children: !!cartItem && /* @__PURE__ */ jsx(
        AddToCartForm,
        {
          cartItem,
          unitOfMeasure,
          quantity: cartItem?.quantity ?? 1,
          onChangeQuantity: quantityChangeHandler,
          onDone: () => setCartItem2(null)
        }
      ) }),
      /* @__PURE__ */ jsx(DialogActions, { children: /* @__PURE__ */ jsx(Button, { autoFocus: true, onClick: () => setCartItem2(null), children: "Cancel" }) })
    ] })
  ] });
};
const invoiceTypeDescription = (invoiceType) => {
  switch (invoiceType) {
    case "CM":
      return "Credit Memo";
    case "DM":
      return "Debit Memo";
    case "AD":
      return "Adjustment";
    case "FC":
      return "Finance Charge";
    case "CA":
      return "Cash Invoice";
    case "XD":
      return "Deleted Invoice";
  }
  return "Invoice";
};
const InvoicePage = () => {
  const dispatch = useAppDispatch();
  const match = useMatch("/account/:customerSlug/invoices/:invoiceType/:invoiceNo");
  const invoice = useAppSelector(selectCurrentInvoice);
  const status = useAppSelector(selectCurrentInvoiceStatus);
  const customer = useAppSelector(selectCustomerKey);
  useEffect(() => {
    if (customer && billToCustomerSlug(customer) !== match?.params?.customerSlug) {
      redirect("/profile");
      return;
    }
    if (status === "idle" && !!match?.params.invoiceNo && !!match.params.invoiceType && (!invoice || match.params?.invoiceNo !== invoice.InvoiceNo)) {
      const arg = {
        InvoiceNo: match.params.invoiceNo,
        InvoiceType: match.params.invoiceType
      };
      dispatch(loadInvoice(arg));
    }
  }, [match, invoice, status, customer]);
  const documentTitle = `Invoice: ${match?.params?.invoiceNo ?? ""}-${match?.params?.invoiceType ?? ""}`;
  return /* @__PURE__ */ jsxs("div", { className: "sales-order-page", children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle }),
    /* @__PURE__ */ jsx(Typography, { component: "h2", variant: "h2", children: documentTitle }),
    !!invoice && invoice.InvoiceType !== "IN" && /* @__PURE__ */ jsx(Typography, { component: "h3", variant: "h3", children: invoiceTypeDescription(invoice.InvoiceType) }),
    status === "loading" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
    /* @__PURE__ */ jsx(InvoiceHeader, {}),
    /* @__PURE__ */ jsx(InvoicePageDetail, {})
  ] });
};
function ErrorFallback({ error }) {
  return /* @__PURE__ */ jsxs(Alert, { severity: "error", children: [
    /* @__PURE__ */ jsx("strong", { children: "Sorry! Something went wrong." }),
    /* @__PURE__ */ jsx("div", { style: { whiteSpace: "pre-wrap" }, children: error.message })
  ] });
}
function ErrorBoundary({ reportErrors, children }) {
  const userProfile = useAppSelector(selectUserProfile);
  const logError = (error, info) => {
    if (reportErrors === false) {
      return;
    }
    postErrors({
      message: error.message,
      userId: userProfile?.id,
      componentStack: info.componentStack ?? ""
    }).catch((err) => console.log(err.message));
  };
  return /* @__PURE__ */ jsx(ErrorBoundary$1, { onError: logError, FallbackComponent: ErrorFallback, children });
}
const AccountListCustomerFilter = () => {
  const isSSR = useIsSSR();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectCustomersSearchFilter);
  const timer = useRef(0);
  const [debouncedSearch, setDebouncedSearch] = useState(filter);
  const [value, setValue] = useState(filter);
  useEffect(() => {
    dispatch(setCustomersFilter(debouncedSearch));
  }, [debouncedSearch]);
  useEffect(() => {
    setValue(filter);
    setDebouncedSearch(filter);
  }, [filter]);
  useEffect(() => {
    timer.current = window.setTimeout(() => setDebouncedSearch(value), 500);
    return () => {
      if (!isSSR) {
        window.clearTimeout(timer.current);
      }
    };
  }, [isSSR, value]);
  const filterChangeHandler = (ev) => {
    setValue(ev.target.value);
  };
  return /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "flex-end" }, children: [
    /* @__PURE__ */ jsx(SearchIcon, { sx: { color: "action.active", mr: 1, my: 0.5 } }),
    /* @__PURE__ */ jsx(
      TextField,
      {
        variant: "standard",
        type: "search",
        slotProps: {
          htmlInput: { maxLength: 50 }
        },
        value,
        onChange: filterChangeHandler,
        label: "Filter Customers",
        fullWidth: true
      }
    )
  ] });
};
const RepSelect = ({ value = "", onChange }) => {
  const dispatch = useAppDispatch();
  const reps = useAppSelector(selectRepsList);
  const labelId = useId();
  const inputId = useId();
  useEffect(() => {
    dispatch(loadRepList());
  }, []);
  const options = reps.filter((rep) => !!rep.active).sort((a, b) => {
    const aa = longRepNo(a);
    const bb = longRepNo(b);
    return aa === bb ? 0 : aa > bb ? 1 : -1;
  }).map((rep) => ({ value: longRepNo(rep), text: `${longRepNo(rep)} - ${rep.SalespersonName}` }));
  const changeHandler = (ev) => {
    return onChange(ev.target.value ?? null);
  };
  return /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, children: [
    /* @__PURE__ */ jsx(InputLabel, { id: labelId, htmlFor: inputId, children: "Sales Rep" }),
    /* @__PURE__ */ jsxs(
      Select,
      {
        labelId,
        label: "Sales Rep",
        variant: "standard",
        inputProps: { id: inputId },
        onChange: changeHandler,
        value: value ?? "",
        children: [
          /* @__PURE__ */ jsx(MenuItem, { value: "", children: "All Available Reps" }),
          options.map((option) => /* @__PURE__ */ jsx(MenuItem, { value: option.value, children: option.text }, option.value))
        ]
      }
    )
  ] });
};
const AccountListRepFilter = () => {
  const dispatch = useAppDispatch();
  const repFilter = useAppSelector(selectCustomersRepFilter);
  const allowSelectReps = useAppSelector(selectCanFilterReps);
  const repChangeHandler = (value) => {
    dispatch(setCustomersRepFilter(value ?? ""));
  };
  if (!allowSelectReps) {
    return null;
  }
  return /* @__PURE__ */ jsx(RepSelect, { value: repFilter, onChange: repChangeHandler });
};
const AccountListStateFilter = () => {
  const dispatch = useAppDispatch();
  const states = useAppSelector(selectCustomerStates);
  const stateFilter = useAppSelector(selectCustomersStateFilter);
  const id = useId();
  const [list, setList] = useState([]);
  useEffect(() => {
    if (stateFilter && !states.includes(stateFilter)) {
      setList([...states, stateFilter]);
    } else {
      setList(states);
    }
  }, [states, stateFilter]);
  const changeHandler = (state) => {
    dispatch(setCustomersStateFilter(state));
  };
  if (states.length < 2) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    StateSelect,
    {
      countryCode: "USA",
      value: stateFilter,
      filterList: list,
      allowAllStates: true,
      id,
      variant: "standard",
      onChange: changeHandler
    }
  );
};
const AccountListFilters = () => {
  const dispatch = useAppDispatch();
  const userAccount = useAppSelector(selectCurrentAccess);
  const allowSelectReps = useAppSelector(selectCanFilterReps);
  const statesList = useAppSelector(selectCustomerStates);
  const reloadHandler = () => {
    dispatch(loadCustomerList(userAccount));
  };
  return /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, alignContent: "center", sx: { mt: 5, mb: 1 }, justifyContent: "space-between", children: [
    /* @__PURE__ */ jsx(Grid, { sx: { flex: "1 1 auto" }, children: /* @__PURE__ */ jsx(AccountListCustomerFilter, {}) }),
    allowSelectReps && /* @__PURE__ */ jsx(Grid, { sx: { flex: "1 1 auto" }, children: /* @__PURE__ */ jsx(AccountListRepFilter, {}) }),
    statesList.length > 1 && /* @__PURE__ */ jsx(Grid, { sx: { flex: "1 1 auto" }, children: /* @__PURE__ */ jsx(AccountListStateFilter, {}) }),
    /* @__PURE__ */ jsx(Grid, { size: "auto", children: /* @__PURE__ */ jsx(Button, { variant: "contained", onClick: reloadHandler, children: "Refresh List" }) })
  ] });
};
const CustomerLink = ({ customer, selected = false }) => {
  const slug = customerSlug(customer);
  if (!slug) {
    return null;
  }
  let path2;
  if (customer.ShipToCode) {
    path2 = generatePath(PATH_CUSTOMER_DELIVERY, {
      customerSlug: encodeURIComponent(billToCustomerSlug(customer)),
      code: encodeURIComponent(customer.ShipToCode)
    });
  } else {
    path2 = generatePath(PATH_CUSTOMER_ACCOUNT, { customerSlug: encodeURIComponent(slug) });
  }
  return /* @__PURE__ */ jsx(Link$2, { component: Link$1, to: path2, sx: { whiteSpace: "nowrap" }, color: selected ? "chumsRed" : void 0, "aria-label": `Select '${customer.CustomerName}'`, children: longCustomerNo(customer) });
};
const CustomerNameField = ({ customer }) => {
  if (!customer.ShipToCode) {
    return customer.CustomerName;
  }
  return /* @__PURE__ */ jsxs(Stack, { direction: "column", children: [
    /* @__PURE__ */ jsx("div", { children: customer.BillToName }),
    /* @__PURE__ */ jsx("div", { children: customer.CustomerName })
  ] });
};
const TelephoneLink = ({ telephoneNo }) => {
  if (!telephoneNo) {
    return null;
  }
  return /* @__PURE__ */ jsx(Link$2, { href: `tel:${telephoneNo}`, color: "inherit", children: telephoneNo });
};
const hiddenXS = { display: { xs: "none", sm: "table-cell" } };
const accountListColumns = [
  { field: "CustomerNo", title: "Account", width: 50, render: (row) => /* @__PURE__ */ jsx(CustomerLink, { customer: row }), sortable: true },
  {
    field: "CustomerName",
    title: "Name",
    width: 80,
    sortable: true,
    render: (row) => /* @__PURE__ */ jsx(CustomerNameField, { customer: row })
  },
  { field: "AddressLine1", title: "Address", width: 80, sortable: true, sx: hiddenXS },
  { field: "City", title: "City", width: 80, sortable: true },
  { field: "State", title: "State", width: 40, sortable: true, render: (row) => stateCountry(row) },
  { field: "ZipCode", title: "ZIP", width: 40, sortable: true, sx: hiddenXS },
  {
    field: "TelephoneNo",
    title: "Phone",
    width: 40,
    sortable: true,
    sx: hiddenXS,
    render: (row) => /* @__PURE__ */ jsx(TelephoneLink, { telephoneNo: row.TelephoneNo })
  }
];
const VirtuosoTableComponents = {
  Scroller: forwardRef(function VirtualTableScroller(props, ref) {
    return /* @__PURE__ */ jsx(TableContainer, { component: Paper, ...props, ref, elevation: 0 });
  }),
  Table: (props) => /* @__PURE__ */ jsx(Table, { ...props, sx: { borderCollapse: "separate", tableLayout: "fixed" } }),
  // eslint-disable-next-line react/prop-types,@typescript-eslint/no-unused-vars
  TableRow: ({ item, ...props }) => /* @__PURE__ */ jsx(TableRow, { ...props }),
  TableBody: forwardRef(function VirtualTableBody(props, ref) {
    return /* @__PURE__ */ jsx(TableBody, { ...props, ref });
  })
};
function AccountListTable() {
  const customers = useAppSelector(selectFilteredCustomerList);
  return /* @__PURE__ */ jsx(Box, { sx: { height: 600, maxHeight: "75vh", width: "100%", mb: 3 }, children: /* @__PURE__ */ jsx(
    TableVirtuoso,
    {
      data: customers,
      components: VirtuosoTableComponents,
      fixedHeaderContent,
      itemContent: rowContent
    }
  ) });
}
function fixedHeaderContent() {
  const dispatch = useAppDispatch();
  const sort = useAppSelector(selectCustomersSort);
  const sortDirection = sort.ascending ? "asc" : "desc";
  const sortHandler = (field) => () => {
    if (field === sort.field) {
      dispatch(setCustomersSort({ field, ascending: !sort.ascending }));
      return;
    }
    dispatch(setCustomersSort({ field, ascending: true }));
  };
  return /* @__PURE__ */ jsx(TableRow, { children: accountListColumns.map((col) => /* @__PURE__ */ jsx(
    TableCell,
    {
      variant: "head",
      component: "th",
      sortDirection: col.field === sort.field ? sortDirection : false,
      align: col.align,
      style: { width: col.width },
      sx: { backgroundColor: "background.paper", ...col.sx },
      children: /* @__PURE__ */ jsx(
        TableSortLabel,
        {
          active: sort.field === col.field,
          direction: sort.field === col.field ? sortDirection : "asc",
          onClick: sortHandler(col.field),
          children: col.title
        }
      )
    },
    col.id ?? col.field
  )) });
}
function rowContent(_index, row) {
  return /* @__PURE__ */ jsx(Fragment, { children: accountListColumns.map((column) => /* @__PURE__ */ jsx(TableCell, { align: column.align, sx: column.sx, children: column.render ? column.render(row) : row[column.field] }, column.id ?? column.field)) });
}
const AccountList = () => {
  const dispatch = useAppDispatch();
  const match = useMatch("/profile/:id");
  const location = useLocation();
  const userAccount = useAppSelector(selectCurrentAccess);
  const loading = useAppSelector(selectCustomersStatus);
  useEffect(() => {
    const profileId = +(match?.params.id ?? 0);
    if (loading === "idle" && profileId === userAccount?.id) {
      dispatch(loadCustomerList(userAccount));
    }
  }, [loading, match, userAccount, dispatch]);
  if (!userAccount) {
    return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Alert, { severity: "info", children: "Please select a valid profile." }) });
  }
  const documentTitle = documentTitles.accountList.replace(":name", userAccount.SalespersonName || "");
  const paths = [
    { title: "Profile", pathname: PATH_PROFILE },
    { title: repAccessCode(userAccount), pathname: PATH_PROFILE },
    { title: "Account List", pathname: location.pathname }
  ];
  return /* @__PURE__ */ jsxs(ErrorBoundary, { children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle }),
    /* @__PURE__ */ jsx(Breadcrumb, { paths }),
    /* @__PURE__ */ jsx(Typography, { variant: "h1", component: "h1", children: "Account List" }),
    /* @__PURE__ */ jsxs(Typography, { variant: "h2", component: "h2", children: [
      userAccount?.SalespersonName ?? "",
      " ",
      /* @__PURE__ */ jsxs("small", { className: "ms-3", children: [
        "(",
        longAccountNumber(userAccount),
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsx(AccountListFilters, {}),
    loading === "loading" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate", sx: { my: 1 } }),
    /* @__PURE__ */ jsx(AccountListTable, {})
  ] });
};
const AccountListContainer = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const access = useAppSelector(selectCurrentAccess);
  const accessList = useAppSelector(selectAccessList);
  const accessStatus = useAppSelector(selectAccessStatus);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.returnTo) {
      dispatch(setReturnToPath(location.state.returnTo));
    }
  }, []);
  useEffect(() => {
    if (accessStatus !== "idle") {
      return;
    }
    const id = Number(params.id ?? 0);
    const [nextAccess] = accessList.filter((ca) => ca.id === id);
    if (!nextAccess) {
      redirect(PATH_PROFILE);
      return;
    }
    if (nextAccess.id !== access?.id) {
      dispatch(setUserAccess(nextAccess));
    }
  }, [params, access, accessList, accessStatus]);
  return /* @__PURE__ */ jsx(AccountList, {});
};
const oneMinute = 60 * 1e3;
const fiveMinutes = 5 * oneMinute;
function useExpiresIn(expiry) {
  const [expiresIn, setExpiresIn] = useState(0);
  const timer = useRef(0);
  useEffect(() => {
    timer.current = window.setInterval(() => {
      const expiresIn2 = expiry * 1e3 - (/* @__PURE__ */ new Date()).valueOf();
      setExpiresIn(expiresIn2);
    }, oneMinute);
    return () => {
      window.clearInterval(timer.current);
    };
  }, [expiry]);
  return expiresIn;
}
const AppUpdateLocalLogin = () => {
  const dispatch = useAppDispatch();
  const isSSR = useIsSSR();
  const isLoggedIn2 = useAppSelector(selectLoggedIn);
  const expires = useAppSelector(selectLoginExpiry);
  const expiresIn = useExpiresIn(expires);
  useEffect(() => {
    if (isSSR || !isLoggedIn2) {
      return;
    }
    if (isLoggedIn2 && expiresIn < fiveMinutes && expiresIn > 0) {
      console.log("dispatching updateLocalAuth()");
      dispatch(updateLocalAuth());
    }
  }, [dispatch, isSSR, isLoggedIn2, expiresIn]);
  if (!isLoggedIn2) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "login-container", style: { display: "none" }, "data-expires-in": expiresIn });
};
function AppAlertCloseButton({ canClose, onClick }) {
  if (!canClose) {
    return null;
  }
  return /* @__PURE__ */ jsx(IconButton, { onClick, children: /* @__PURE__ */ jsx(CloseIcon, {}) });
}
const AppAlert = ({
  alertId,
  severity,
  message,
  alertTitle,
  context,
  count,
  onDismiss,
  onDismissContext,
  children
}) => {
  const dismissHandler = () => {
    if (!!context && !!onDismissContext) {
      onDismissContext(context);
      return;
    }
    if (onDismiss && !!alertId) {
      onDismiss(alertId);
    }
  };
  return /* @__PURE__ */ jsxs(Alert, { severity, onClose: dismissHandler, action: /* @__PURE__ */ jsx(AppAlertCloseButton, { canClose: !!onDismissContext || !!onDismiss, onClick: dismissHandler }), children: [
    (!!context || !!alertTitle) && /* @__PURE__ */ jsx(AlertTitle, { sx: { display: "inline-block", mr: 3 }, children: /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, children: [
      !!context && /* @__PURE__ */ jsxs(Typography, { sx: { fontWeight: 700 }, children: [
        "[",
        context,
        "]"
      ] }),
      !!alertTitle && /* @__PURE__ */ jsx(Typography, { sx: { fontWeight: 700 }, children: alertTitle }),
      (count ?? 0) > 1 && /* @__PURE__ */ jsxs(Typography, { variant: "caption", children: [
        "(",
        count,
        ")"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      Typography,
      {
        sx: { display: "inline-block" },
        variant: "body1",
        children: message ?? children ?? "Undefined alert"
      }
    )
  ] });
};
const AlertList = ({ context }) => {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector((state) => selectContextAlerts(state, context));
  const dismissHandler = (id) => {
    dispatch(dismissAlert(id));
  };
  const contextDismissHandler = (context2) => {
    dispatch(dismissContextAlert(context2));
  };
  return /* @__PURE__ */ jsx(Fragment, { children: alerts.map((alert) => /* @__PURE__ */ jsx(
    AppAlert,
    {
      alertId: alert.alertId,
      severity: alert.severity,
      count: alert.count,
      context: alert.context,
      title: alert.title,
      message: alert.message,
      onDismiss: dismissHandler,
      onDismissContext: contextDismissHandler
    },
    alert.alertId
  )) });
};
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return /* @__PURE__ */ jsx(Slide, { appear: false, direction: "down", in: !trigger, children });
}
const drawerWidth = 240;
const NavDrawer = ({ children }) => {
  const isSSR = useIsSSR();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsDrawerOpen);
  const closeHandler = () => {
    dispatch(toggleMenuDrawer());
  };
  if (isSSR) {
    return null;
  }
  return /* @__PURE__ */ jsx(Box, { component: "nav", "aria-label": "mobile app menu", children: /* @__PURE__ */ jsx(
    Drawer,
    {
      container: window?.document?.body,
      variant: "temporary",
      open: isOpen,
      anchor: "top",
      onClose: closeHandler,
      ModalProps: {
        keepMounted: true
      },
      sx: {
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, maxWidth: "75vw" }
      },
      children
    }
  ) });
};
function RoutedLink(props) {
  return /* @__PURE__ */ jsx(Link$2, { underline: "hover", ...props, component: Link$1 });
}
const LogoImg = styled$1.img`
    width: 100%;
    height: auto;
`;
function ChumsLogo({ sx }) {
  return /* @__PURE__ */ jsx(Box, { sx: { maxWidth: { xs: "33vw", sm: "15vw" }, width: "150px", margin: { xs: "1rem", sm: "0", md: "0 1.5rem" }, ...sx }, children: /* @__PURE__ */ jsx(LogoImg, { src: "/images/logos/Chums-Logo-Badge-Red-RGB.png", alt: "Chums", width: "1920", height: "1080", loading: "eager" }) });
}
function HomeLink({ sx }) {
  return /* @__PURE__ */ jsx(Typography, { variant: "h6", component: "div", sx: { flexGrow: 0, display: { xs: "none", sm: "block" }, ...sx }, children: /* @__PURE__ */ jsx(RoutedLink, { to: "/", className: "nav-link home-link", children: /* @__PURE__ */ jsx(ChumsLogo, {}) }) });
}
function MenuItemRouterLink({ to, replace, children, ...props }) {
  return /* @__PURE__ */ jsx(MenuItem, { component: Link$1, to, replace, underline: "hover", ...props, children });
}
function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = hash >> i * 8 & 255;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
function stringAvatar(name) {
  const initials = name.split(" ").filter((name2) => name2.length > 1).filter((name2, index) => index < 2).map((name2) => name2[0]).join("");
  return {
    sx: {
      bgColor: stringToColor(name)
    },
    children: `${initials}`
  };
}
const UserAvatar = (props) => {
  const isLoggedIn2 = useAppSelector(selectLoggedIn);
  const profile = useAppSelector(selectUserProfile);
  const profilePic = useAppSelector(selectProfilePicture);
  return /* @__PURE__ */ jsxs(Box, { ...props, children: [
    (!isLoggedIn2 || !profile) && /* @__PURE__ */ jsx(Avatar, { "aria-label": "Please log in", children: /* @__PURE__ */ jsx(AccountCircle, { "aria-hidden": "true" }) }),
    isLoggedIn2 && profile && profilePic && /* @__PURE__ */ jsx(Avatar, { alt: profile.name, src: profilePic, slotProps: { img: { referrerPolicy: "no-referrer" } } }),
    isLoggedIn2 && profile && !profilePic && /* @__PURE__ */ jsx(Avatar, { ...stringAvatar(profile.name) })
  ] });
};
const UserMenu = () => {
  const isLoggedIn2 = useAppSelector(selectLoggedIn);
  const currentAccess = useAppSelector(selectCurrentAccess);
  const buttonId = useId();
  const menuId = useId();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (open && !isLoggedIn2) {
      setAnchorEl(null);
    }
  }, [isLoggedIn2]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!isLoggedIn2) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(IconButton, { onClick: handleClick, children: /* @__PURE__ */ jsx(UserAvatar, {}) }),
      /* @__PURE__ */ jsx(
        Menu,
        {
          id: menuId,
          open,
          onClose: handleClose,
          anchorEl,
          slotProps: { list: { "aria-labelledby": buttonId } },
          children: /* @__PURE__ */ jsx(MenuItemRouterLink, { to: "/login", children: "Login" })
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(IconButton, { onClick: handleClick, children: /* @__PURE__ */ jsx(UserAvatar, {}) }),
    /* @__PURE__ */ jsxs(
      Menu,
      {
        id: menuId,
        open,
        onClose: handleClose,
        anchorEl,
        slotProps: { list: { "aria-labelledby": buttonId } },
        children: [
          /* @__PURE__ */ jsx(MenuItemRouterLink, { to: "/profile", children: "Profile" }),
          currentAccess && /* @__PURE__ */ jsx(MenuItemRouterLink, { to: generatePath("/profile/:id", { id: `${currentAccess.id}` }), children: "Accounts" }),
          /* @__PURE__ */ jsx(MenuItemRouterLink, { to: "/logout", children: "Logout" })
        ]
      }
    )
  ] });
};
const NavItemButtonLink = ({ to, replace, children, sx, ...props }) => {
  const theme2 = useTheme();
  return /* @__PURE__ */ jsx(
    Button,
    {
      component: Link$1,
      size: "large",
      disabled: !to,
      to,
      replace,
      sx: { color: theme2.palette.grey["900"], ...sx },
      ...props,
      children
    }
  );
};
function CustomerIndicator() {
  const dispatch = useAppDispatch();
  const customer = useAppSelector(selectCustomerAccount);
  const currentShipTo = useAppSelector(selectCustomerShipTo);
  const params = useParams();
  const loadStatus = useAppSelector(selectCustomerLoadStatus);
  const loaded = useAppSelector(selectCustomerLoaded);
  useEffect(() => {
    const nextCustomer = billToCustomerSlug(params.customerSlug ?? "");
    if (!nextCustomer && !loaded && !!customer && loadStatus === "idle") {
      dispatch(loadCustomer(customer));
      return;
    }
    if (!nextCustomer) {
      return;
    }
    if (!customer || customerSlug(customer) !== nextCustomer) {
      if (loadStatus !== "idle") {
        return;
      }
      dispatch(loadCustomer(parseCustomerSlug(nextCustomer)));
      return;
    }
    if (loadStatus === "idle" && !loaded) {
      dispatch(loadCustomer(customer));
    }
  }, [params, customer, loadStatus, loaded]);
  if (!customer) {
    return null;
  }
  return /* @__PURE__ */ jsx(Tooltip, { title: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Typography, { color: "inherit", component: "div", children: customer.CustomerName }),
    currentShipTo && /* @__PURE__ */ jsx(Typography, { color: "inherit", sx: { fontSize: "small" }, children: currentShipTo.ShipToName })
  ] }), arrow: true, children: /* @__PURE__ */ jsxs(Box, { sx: { mx: 1, whiteSpace: "pre" }, children: [
    customerNo(customer),
    !!currentShipTo && /* @__PURE__ */ jsxs("span", { children: [
      "/",
      currentShipTo.ShipToCode
    ] })
  ] }) });
}
function CartIcon() {
  const cartId = useAppSelector(selectActiveCartId);
  const cartQty = useAppSelector((state) => selectCartQtyByCartId(state, cartId));
  const cartTotal = useAppSelector((state) => selectCartTotalById(state, cartId));
  const cartStatus = useAppSelector((state) => selectCartStatusById(state, cartId ?? 0));
  if (!cartId) {
    return /* @__PURE__ */ jsx(ShoppingCartOutlinedIcon, { fontSize: "medium" });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Tooltip, { title: `Cart #${cartId}`, children: /* @__PURE__ */ jsxs(Box, { sx: { m: 1, position: "relative" }, children: [
      /* @__PURE__ */ jsx(
        Badge,
        {
          badgeContent: cartQty,
          color: "primary",
          max: 99999,
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
          children: /* @__PURE__ */ jsx(ShoppingCartIcon, { fontSize: "medium" })
        }
      ),
      cartStatus !== "idle" && /* @__PURE__ */ jsx(CircularProgress, { size: 36, sx: { position: "absolute", top: -6, left: -6, zIndex: 1 } })
    ] }) }),
    /* @__PURE__ */ jsx(Box, { sx: { ml: 2 }, children: numeral(cartTotal).format("$0,0") })
  ] });
}
const CartMenu = () => {
  const isLoggedIn2 = useAppSelector(selectLoggedIn);
  const currentCustomer = useAppSelector(selectCustomerAccount);
  const currentCart = useAppSelector(selectActiveCartId);
  if (!isLoggedIn2) {
    return null;
  }
  if (!currentCustomer) {
    return /* @__PURE__ */ jsxs(NavItemButtonLink, { to: "/profile", children: [
      /* @__PURE__ */ jsx(CustomerIndicator, {}),
      /* @__PURE__ */ jsx(ShoppingCartOutlinedIcon, { fontSize: "medium" })
    ] });
  }
  if (!currentCart || currentCart === 0) {
    return /* @__PURE__ */ jsxs(NavItemButtonLink, { to: customerCartURL(currentCustomer), children: [
      /* @__PURE__ */ jsx(CustomerIndicator, {}),
      /* @__PURE__ */ jsx(CartIcon, {})
    ] });
  }
  return /* @__PURE__ */ jsxs(NavItemButtonLink, { to: customerCartURL(currentCustomer, currentCart), children: [
    /* @__PURE__ */ jsx(CustomerIndicator, {}),
    /* @__PURE__ */ jsx(CartIcon, {})
  ] });
};
function simpleIsEqual(a, b) {
  return a === b;
}
function useDebounceValue(initialValue, delay = 0, options) {
  const timerHandle = useRef(0);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const isEqual = useCallback(simpleIsEqual, [options]);
  const setValue = useCallback((value) => {
    window.clearInterval(timerHandle.current);
    timerHandle.current = window.setTimeout(() => {
      if (!isEqual(value, debouncedValue)) {
        setDebouncedValue(value);
      }
    }, delay);
  }, [delay, isEqual]);
  useEffect(() => {
    return () => {
      window.clearInterval(timerHandle.current);
    };
  }, [delay]);
  return [debouncedValue, setValue];
}
const searchItemLink = (result) => {
  switch (result.pagetype) {
    case "category":
      return generatePath(PATH_CATEGORY, { category: result.keyword });
    case "page":
      return generatePath(PATH_PAGE, { keyword: result.keyword });
    default:
      if (result.parent) {
        return generatePath(PATH_PRODUCT, { category: result.parent, product: result.keyword });
      }
      return generatePath(PATH_PRODUCT_WITHOUT_PARENT, { product: result.keyword });
  }
};
const SearchResultType = styled("div")`
    flex: 0 0 25%;
    text-align: center;
`;
const SearchImage = styled("img")`
    flex: 0 0 25%;
    display: block;
    max-width: 100%;
    height: auto;
`;
function SearchResultIcon({ option }) {
  const src = CONTENT_PATH_SEARCH_IMAGE.replace(":image", encodeURIComponent(option.image ?? "missing.png"));
  switch (option.pagetype) {
    case "category":
      return /* @__PURE__ */ jsx(SearchResultType, { children: /* @__PURE__ */ jsx(FolderIcon, { "aria-label": "Product Category" }) });
    case "page":
      return /* @__PURE__ */ jsx(SearchResultType, { children: /* @__PURE__ */ jsx(DescriptionIcon, { "aria-label": "Information Page" }) });
    case "product":
      return /* @__PURE__ */ jsx(SearchImage, { src, alt: option.keyword });
    default:
      return null;
  }
}
const SearchResultTitleContainer = styled("div")`
    flex: 1 1 100%;
    padding-left: 0.25rem;
    text-align: center;
`;
function SearchResultTitle({ option }) {
  return /* @__PURE__ */ jsxs(SearchResultTitleContainer, { children: [
    /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Typography, { variant: "button", children: option.title }) }),
    !!option.additional_data?.subtitle && /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Typography, { variant: "caption", children: option.additional_data.subtitle }) })
  ] });
}
function SearchBarResult({ option, ...props }) {
  const link = searchItemLink(option);
  return /* @__PURE__ */ createElement(Box, { component: "li", ...props, key: option.keyword }, /* @__PURE__ */ jsx(Link$2, { component: NavLink, to: link, sx: { width: "100%" }, children: /* @__PURE__ */ jsxs(Stack, { direction: "row", sx: { width: "100%" }, alignItems: "center", children: [
    /* @__PURE__ */ jsx(SearchResultIcon, { option }),
    /* @__PURE__ */ jsx(SearchResultTitle, { option })
  ] }) }));
}
function SearchBar() {
  const dispatch = useAppDispatch();
  const results = useAppSelector(selectSearchResults);
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm2] = useDebounceValue(inputValue, 500);
  useEffect(() => {
    setSearchTerm2(inputValue);
  }, [inputValue]);
  const [options, setOptions] = useState(results ?? []);
  useEffect(() => {
    setOptions(results ?? []);
  }, [results]);
  useEffect(() => {
    dispatch(getSearchResults(searchTerm));
  }, [searchTerm]);
  const changeHandler = (ev, newValue) => {
    setValue(null);
    setInputValue("");
    if (newValue) {
      const path2 = searchItemLink(newValue);
      navigate(path2);
    }
  };
  const inputChangeHandler = (ev, value2) => {
    setInputValue(value2);
  };
  return /* @__PURE__ */ jsx(
    Autocomplete,
    {
      sx: { width: 300, display: "inline-block" },
      renderInput: ({ inputProps, ...params }) => /* @__PURE__ */ jsx(
        TextField,
        {
          ...params,
          slotProps: {
            htmlInput: { ...inputProps, maxLength: 30 }
          },
          variant: "outlined",
          size: "small",
          label: "Search",
          fullWidth: true
        }
      ),
      inputValue,
      onInputChange: inputChangeHandler,
      options,
      noOptionsText: "No results found.",
      blurOnSelect: true,
      getOptionLabel: (option) => option.title,
      filterOptions: (x) => x,
      onChange: changeHandler,
      renderOption: (props, option) => {
        return /* @__PURE__ */ jsx(SearchBarResult, { option, ...props });
      },
      value
    }
  );
}
function Link({ ref, ...itemProps }) {
  return /* @__PURE__ */ jsx(Link$1, { ref, ...itemProps, role: void 0 });
}
function ListItemLink(props) {
  const { icon, primary, to, ...rest } = props;
  return /* @__PURE__ */ jsxs(ListItem, { component: Link, to, sx: { color: "theme.palette.common.black" }, ...rest, children: [
    icon ? /* @__PURE__ */ jsx(ListItemIcon, { children: icon }) : null,
    /* @__PURE__ */ jsx(ListItemText, { primary })
  ] });
}
function DrawerMenu({ title, to, items }) {
  const [show, setShow] = useState(false);
  const clickHandler = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    setShow(!show);
  };
  if (!items?.length && !!to) {
    return /* @__PURE__ */ jsx(ListItemLink, { primary: title, to });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(ListItemButton, { onClick: clickHandler, children: [
      /* @__PURE__ */ jsx(ListItemText, { primary: title }),
      show ? /* @__PURE__ */ jsx(ExpandLess, {}) : /* @__PURE__ */ jsx(ExpandMore, {})
    ] }),
    /* @__PURE__ */ jsx(Collapse, { in: show, children: /* @__PURE__ */ jsx(List, { component: "div", disablePadding: true, children: items?.map((item) => /* @__PURE__ */ jsx(ListItemLink, { sx: { pl: 4 }, primary: item.title, to: item.url }, item.id)) }) }),
    show && /* @__PURE__ */ jsx(Divider, { sx: { my: "0.5rem" } })
  ] });
}
DrawerMenu.displayName = "DrawerMenu";
const StyledNavButton = styled(Button)(({ theme: theme2 }) => ({
  color: theme2.palette.grey["900"]
}));
const NavItemButton = ({ children, sx, ...props }) => {
  return /* @__PURE__ */ jsx(StyledNavButton, { size: "large", sx, ...props, children });
};
const itemStyle = {
  textTransform: "uppercase",
  fontWeight: 700
};
function CompoundMenu({
  title,
  items,
  slotProps,
  mediaQuery,
  urlFormat,
  requiresLogin
}) {
  const location = useLocation();
  const buttonId = slotProps?.anchorButton?.id ?? useId();
  const popoverId = useId();
  const anchorRef = useRef(null);
  const mediaLg = useMediaQuery(mediaQuery ?? "(min-width: 1200px)");
  const isLoggedIn2 = useAppSelector(selectLoggedIn);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [location]);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      NavItemButton,
      {
        id: buttonId,
        ref: anchorRef,
        disabled: slotProps?.anchorButton?.disabled || !items.length || requiresLogin && !isLoggedIn2,
        sx: { height: "100%" },
        "aria-controls": open ? popoverId : void 0,
        "aria-expanded": open ? "true" : void 0,
        "aria-haspopup": "true",
        onClick: handleClick,
        children: title
      }
    ),
    /* @__PURE__ */ jsx(
      Popover,
      {
        open: !!anchorRef.current && open,
        id: popoverId,
        anchorEl: anchorRef.current,
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
        onClick: handleClose,
        onClose: handleClose,
        children: /* @__PURE__ */ jsx(Box, { sx: {
          p: 1,
          maxHeight: "75vh",
          width: mediaLg ? "fit-content" : "75vw",
          maxWidth: "100vw",
          overflow: "auto"
        }, "aria-describedby": buttonId, children: /* @__PURE__ */ jsx(Stack, { direction: "row", spacing: 2, children: items.map((item) => /* @__PURE__ */ jsxs(MenuList, { children: [
          /* @__PURE__ */ jsx(MenuItemRouterLink, { to: urlFormat(item.url), sx: itemStyle, children: item.title }),
          item.menu?.items?.map((item2) => /* @__PURE__ */ jsx(
            MenuItemRouterLink,
            {
              disabled: item2.requireLogin && !isLoggedIn2,
              onClick: handleClick,
              to: urlFormat(item2.url),
              children: item2.title
            },
            item2.id
          ))
        ] }, item.id)) }) })
      }
    )
  ] });
}
const productUrl = (url) => `/products${url}`;
function NavProductsLink({ inDrawer }) {
  const dispatch = useAppDispatch();
  const shouldLoad = useAppSelector(selectShouldLoadProductMenu);
  const productMenu = useAppSelector(selectProductMenu);
  const [items, setItems] = useState(productMenu?.items ?? []);
  useEffect(() => {
    if (shouldLoad) {
      dispatch(loadProductMenu());
    }
  }, [dispatch, shouldLoad]);
  useEffect(() => {
    setItems(productMenu?.items ?? []);
  }, [productMenu]);
  if (inDrawer) {
    return /* @__PURE__ */ jsx(DrawerMenu, { title: "Products", items: items.map((item) => ({ ...item, url: `/products${item.url}` })) });
  }
  return /* @__PURE__ */ jsx(CompoundMenu, { title: "Products", items, urlFormat: productUrl, mediaQuery: "(min-width: 1000px)" });
}
function NavLoginLink({ inDrawer }) {
  const isLoggedIn2 = useAppSelector(selectLoggedIn);
  if (isLoggedIn2) {
    return null;
  }
  if (inDrawer) {
    return /* @__PURE__ */ jsx(ListItemLink, { to: PATH_LOGIN, primary: "Login" });
  }
  return /* @__PURE__ */ jsx(NavItemButtonLink, { to: PATH_LOGIN, children: "Login" });
}
function NavSignupLink({ inDrawer }) {
  const isLoggedIn2 = useAppSelector(selectLoggedIn);
  if (isLoggedIn2) {
    return null;
  }
  if (inDrawer) {
    return /* @__PURE__ */ jsx(ListItemLink, { to: PATH_SIGNUP, primary: "Sign Up" });
  }
  return /* @__PURE__ */ jsx(NavItemButtonLink, { to: PATH_SIGNUP, children: "Sign Up" });
}
function MenuLinkProfile({ linkCode, linkName }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    linkCode,
    /* @__PURE__ */ jsx(
      Typography,
      {
        sx: { marginLeft: "1rem", maxWidth: "12rem", fontWeight: "bold" },
        variant: "inherit",
        noWrap: true,
        children: linkName
      }
    )
  ] });
}
const defaultItems = [
  {
    id: "profile",
    title: "Profile",
    url: "/profile",
    menu: {
      items: [{ id: "avatar", title: /* @__PURE__ */ jsx(UserAvatar, {}), url: "/profile" }]
    }
  },
  {
    id: "access-list",
    title: "Customer List",
    url: "/profile"
  },
  {
    id: "recent-customers",
    title: "Recent Customers",
    url: "/profile"
  }
];
function NavAccountsLink({ inDrawer }) {
  const isLoggedIn2 = useAppSelector(selectLoggedIn);
  const accessList = useAppSelector(selectRepAccessList);
  const access = useAppSelector(selectCurrentAccess);
  const recentCustomers2 = useAppSelector(selectRecentCustomers);
  const drawerItems = [
    { id: "profile", title: "Profile", url: "/profile" },
    ...accessList.map((access2) => ({
      id: access2.id,
      title: access2.SalespersonName ?? repAccessCode(access2),
      url: accessListURL(access2)
    }))
  ];
  const items = [
    defaultItems[0],
    {
      ...defaultItems[1],
      url: access ? accessListURL(access) : "/profile",
      menu: {
        items: accessList.map((access2) => ({
          id: access2.id,
          title: /* @__PURE__ */ jsx(
            MenuLinkProfile,
            {
              linkCode: repAccessCode(access2),
              linkName: access2.SalespersonName ?? ""
            }
          ),
          url: accessListURL(access2)
        }))
      }
    },
    {
      ...defaultItems[2],
      url: access ? accessListURL(access) : "/profile",
      menu: {
        items: recentCustomers2.map((customer) => ({
          id: shortCustomerKey(customer),
          title: /* @__PURE__ */ jsx(
            MenuLinkProfile,
            {
              linkCode: customerNo(customer),
              linkName: customer.CustomerName ?? ""
            }
          ),
          url: customerURL(customer)
        }))
      }
    }
  ];
  if (!isLoggedIn2) {
    return null;
  }
  if (inDrawer) {
    return /* @__PURE__ */ jsx(DrawerMenu, { title: "Accounts", items: drawerItems });
  }
  return /* @__PURE__ */ jsx(CompoundMenu, { title: "Accounts", items, urlFormat: (url) => url });
}
function BasicMenu({ title, items, sx, urlFormat, mediaQuery, requiresLogin, ...rest }) {
  const location = useLocation();
  const isLoggedIn2 = useAppSelector(selectLoggedIn);
  const mediaLg = useMediaQuery(mediaQuery ?? "(min-width: 1200px)");
  const buttonId = useId();
  const menuId = useId();
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    setAnchorEl(null);
  }, [location]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      NavItemButton,
      {
        id: buttonId,
        disabled: !items.length || requiresLogin && !isLoggedIn2,
        sx: { height: "100%" },
        "aria-controls": open ? menuId : void 0,
        "aria-expanded": open ? "true" : void 0,
        "aria-haspopup": "true",
        onClick: handleClick,
        children: title
      }
    ),
    /* @__PURE__ */ jsx(
      Menu,
      {
        id: menuId,
        ...rest,
        open,
        onClose: handleClose,
        anchorEl,
        sx: deepmerge({
          "& .MuiMenu-list": {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            color: "#000000"
          }
        }, sx),
        slotProps: {
          list: { "aria-labelledby": buttonId },
          paper: {
            style: {
              maxHeight: "75vh",
              width: mediaLg ? "fit-content" : "75vw",
              maxWidth: "100vw"
            }
          }
        },
        children: items.map((item) => /* @__PURE__ */ jsx(MenuItemRouterLink, { to: urlFormat ? urlFormat(item.url) : item.url, children: item.title }, item.id))
      }
    )
  ] });
}
function NavCustomerLink({ inDrawer }) {
  const isLoggedIn2 = useAppSelector(selectLoggedIn);
  const account = useAppSelector(selectCustomerAccount);
  const [items, setItems] = React.useState([]);
  useEffect(() => {
    if (!account || !isLoggedIn2) {
      setItems([]);
      return;
    }
    setItems(buildCustomerMenuItems(account));
  }, [account, isLoggedIn2]);
  if (!isLoggedIn2) {
    return null;
  }
  if (inDrawer) {
    return /* @__PURE__ */ jsx(DrawerMenu, { title: "Customer", items });
  }
  return /* @__PURE__ */ jsx(
    BasicMenu,
    {
      title: "Customer",
      sx: {
        "& .MuiMenu-list": {
          flexDirection: "column"
        }
      },
      items
    }
  );
}
function NavResourcesLink({ inDrawer }) {
  const dispatch = useAppDispatch();
  const shouldLoad = useAppSelector(selectShouldLoadResourcesMenu);
  const menu = useAppSelector(selectResourcesMenu);
  useEffect(() => {
    if (shouldLoad) {
      dispatch(loadResourcesMenu());
    }
  }, [dispatch, shouldLoad]);
  if (inDrawer) {
    return /* @__PURE__ */ jsx(DrawerMenu, { title: "Resources", to: "/resources", items: menu?.items ?? [] });
  }
  return /* @__PURE__ */ jsx(
    BasicMenu,
    {
      title: "Resources",
      items: menu?.items ?? [],
      sx: {
        "& .MuiMenu-list": {
          flexDirection: "column"
        }
      }
    }
  );
}
function NavMenuList({ inDrawer }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(NavProductsLink, { inDrawer }),
    /* @__PURE__ */ jsx(NavLoginLink, { inDrawer }),
    /* @__PURE__ */ jsx(NavSignupLink, { inDrawer }),
    /* @__PURE__ */ jsx(NavAccountsLink, { inDrawer }),
    /* @__PURE__ */ jsx(NavCustomerLink, { inDrawer }),
    /* @__PURE__ */ jsx(NavResourcesLink, { inDrawer })
  ] });
}
const NavBarUI = () => {
  const dispatch = useAppDispatch();
  const handleDrawerToggle = () => {
    dispatch(toggleMenuDrawer());
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(HideOnScroll, { children: /* @__PURE__ */ jsx(AppBar, { component: "nav", color: "default", children: /* @__PURE__ */ jsx(Container, { maxWidth: "xl", children: /* @__PURE__ */ jsxs(Toolbar, { disableGutters: true, children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          color: "inherit",
          "aria-label": "open drawer",
          edge: "start",
          onClick: handleDrawerToggle,
          sx: { mr: 2, display: { md: "none" } },
          children: /* @__PURE__ */ jsx(MenuIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(HomeLink, {}),
      /* @__PURE__ */ jsx(Box, { sx: {
        display: { xs: "none", md: "flex" },
        flex: "1 1 auto",
        flexDirection: "row",
        alignItems: "center"
      }, children: /* @__PURE__ */ jsx(NavMenuList, {}) }),
      /* @__PURE__ */ jsx(Box, { sx: { display: { xs: "none", md: "flex" }, flex: "1 1 auto" }, children: /* @__PURE__ */ jsx(SearchBar, {}) }),
      /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "row", useFlexGap: true, children: [
        /* @__PURE__ */ jsx(CartMenu, {}),
        /* @__PURE__ */ jsx(UserMenu, {})
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(Toolbar, {}),
    /* @__PURE__ */ jsx(NavDrawer, { children: /* @__PURE__ */ jsxs(Box, { onClick: handleDrawerToggle, sx: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx(HomeLink, { sx: { display: { xs: "block", md: "none" } } }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(List, { children: /* @__PURE__ */ jsx(NavMenuList, { inDrawer: true }) })
    ] }) })
  ] });
};
function Header() {
  return /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx(NavBarUI, {}) });
}
function AppVersion() {
  const isSSR = useIsSSR();
  const dispatch = useAppDispatch();
  const version = useAppSelector(selectVersion);
  const shouldAlert = useAppSelector(selectShouldAlertVersion);
  const intervalRef = useRef(0);
  useEffect(() => {
    if (isSSR) {
      return;
    }
    if (!version) {
      onUpdateVersion();
    }
    intervalRef.current = window.setInterval(onUpdateVersion, minCheckInterval);
    return () => {
      if (isSSR) {
        return;
      }
      window.clearInterval(intervalRef.current);
      window.removeEventListener("visibilityChange", visibilityChangeHandler);
    };
  }, [isSSR, version]);
  const onUpdateVersion = (force = false) => {
    dispatch(loadVersion(force));
  };
  const visibilityChangeHandler = () => {
    onUpdateVersion();
  };
  const onDismissUpdate = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    dispatch(ignoreVersion());
  };
  const onUpdate = () => {
    window.location.reload();
  };
  if (isSSR) {
    return;
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("span", { onClick: () => onUpdateVersion(true), className: "app__version", children: [
      "Version: ",
      version
    ] }),
    /* @__PURE__ */ jsx(Snackbar, { open: shouldAlert, autoHideDuration: 1e4, children: /* @__PURE__ */ jsx(Alert, { severity: "info", sx: { width: "100%" }, onClose: onDismissUpdate, onClick: onUpdate, children: /* @__PURE__ */ jsx("strong", { children: "Update Available! Click here to refresh" }) }) })
  ] });
}
const imagePathLandscape = "/images/chums/homepage/2024/06/B2BPopUpImage-landscape.jpg";
const imagePathPortrait = "/images/chums/homepage/2024/06/B2BPopUpImage-portrait.jpg";
function Transition$1({ children, ref, ...rest }) {
  return /* @__PURE__ */ jsx(Slide, { direction: "up", ref, ...rest, children });
}
const excludedPaths = /^\/(login|signup|set-password|reset-password)/;
const StyledImage = styled$1.img`
    width: 100%;
    height: auto;
`;
const SignUpModal = () => {
  const id = useId();
  const isSSR = useIsSSR();
  const location = useLocation();
  const timer = useRef(0);
  const delay = useRef(10 * 1e3);
  const isLoggedIn2 = useAppSelector(selectLoggedIn);
  const [showModal, setShowModal] = useState(false);
  const [enabled, setEnabled] = React.useState(LocalStore.getItem(STORE_SHOW_SIGNUP_POPUP, !isLoggedIn2));
  useEffect(() => {
    if (isSSR) {
      return;
    }
    if (isLoggedIn2 || excludedPaths.test(location.pathname)) {
      window.clearTimeout(timer.current);
      handleClose();
      return;
    }
    if (!enabled) {
      window.clearTimeout(timer.current);
      return;
    }
    delayShowPopup();
    return () => {
      if (!isSSR) {
        window.clearTimeout(timer.current);
      }
    };
  }, [isLoggedIn2, isSSR, enabled, delay.current, location.pathname]);
  const delayShowPopup = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setShowModal(true);
    }, delay.current);
  };
  const handleClose = () => {
    setShowModal(false);
    setEnabled(false);
    LocalStore.setItem(STORE_SHOW_SIGNUP_POPUP, false);
  };
  if (isSSR || isLoggedIn2 || !enabled) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      open: showModal,
      slots: { transition: Transition$1 },
      keepMounted: true,
      onClose: handleClose,
      "aria-describedby": id,
      maxWidth: "sm",
      children: [
        /* @__PURE__ */ jsx(DialogTitle, { id, children: /* @__PURE__ */ jsx(Typography, { sx: { textTransform: "uppercase" }, children: "Are you a member?" }) }),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            "aria-label": "close",
            onClick: handleClose,
            sx: {
              position: "absolute",
              right: 8,
              top: 8
            },
            children: /* @__PURE__ */ jsx(CloseIcon, {})
          }
        ),
        /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
          /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsxs(
            Stack,
            {
              direction: "column",
              spacing: 2,
              sx: { alignItems: "center", justifyContent: "center", height: "100%" },
              children: [
                /* @__PURE__ */ jsx(ChumsLogo, { sx: { maxWidth: "75%" } }),
                /* @__PURE__ */ jsx(Typography, { sx: { textAlign: "center" }, children: "Open your B2B account today for easy ordering and world-class customer service." })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(Grid, { size: { xs: 12, sm: 6 }, children: [
            /* @__PURE__ */ jsx(Box, { sx: { display: { xs: "inline", sm: "none" } }, children: /* @__PURE__ */ jsx(
              StyledImage,
              {
                src: imagePathPortrait,
                width: "361",
                height: "542",
                loading: "lazy",
                alt: "",
                role: "presentation"
              }
            ) }),
            /* @__PURE__ */ jsx(Box, { sx: { display: { xs: "none", sm: "inline" } }, children: /* @__PURE__ */ jsx(
              StyledImage,
              {
                src: imagePathLandscape,
                width: "722",
                height: "542",
                loading: "lazy",
                alt: "",
                role: "presentation"
              }
            ) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(DialogActions, { children: [
          /* @__PURE__ */ jsx(Button, { variant: "text", onClick: handleClose, children: "No Thanks" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "contained",
              component: NavLink,
              to: "/signup",
              children: "Open an Account"
            }
          )
        ] })
      ]
    }
  ) });
};
const BottomLink = styled(Link$2)(({ theme: theme2 }) => ({
  color: theme2.palette.primary.contrastText,
  padding: "0 0.5rem"
}));
function FooterLink({ href, target, rel, children, ...rest }) {
  return /* @__PURE__ */ jsx(BottomLink, { underline: "hover", href, target, rel, ...rest, children });
}
function CookieConsentItem({ consentSection, checked, onChange, ...rest }) {
  const detail = useAppSelector(selectCookieConsentDetails);
  const [section, setSection] = useState(detail?.[consentSection] ?? null);
  const [expanded, setExpanded] = useState(false);
  const labelId = useId();
  const checkboxId = useId();
  useEffect(() => {
    setSection(detail?.[consentSection] ?? null);
  }, [detail, consentSection]);
  if (!section) {
    return null;
  }
  return /* @__PURE__ */ jsxs(ListItem, { alignItems: "flex-start", ...rest, disablePadding: true, children: [
    /* @__PURE__ */ jsx(ListItemButton, { role: "checkbox", onClick: () => onChange(!checked), disabled: section.required, children: /* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx(
      Checkbox,
      {
        edge: "start",
        checked,
        tabIndex: -1,
        disableRipple: true,
        role: "presentation",
        disabled: section.required,
        onChange: () => onChange(!checked),
        id: checkboxId,
        slotProps: { input: { "aria-labelledby": labelId } }
      }
    ) }) }),
    /* @__PURE__ */ jsx(
      ListItemText,
      {
        id: labelId,
        slots: { primary: "div", secondary: "div" },
        primary: /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 1, justifyContent: "space-between", alignItems: "center", children: [
          /* @__PURE__ */ jsx(Typography, { component: "label", htmlFor: checkboxId, variant: "body1", children: section.title }),
          /* @__PURE__ */ jsxs(IconButton, { onClick: () => setExpanded(!expanded), "aria-expanded": expanded, "aria-label": "show more", children: [
            expanded && /* @__PURE__ */ jsx(ExpandLess, {}),
            !expanded && /* @__PURE__ */ jsx(ExpandMore, {})
          ] })
        ] }),
        secondary: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Typography, { component: "div", variant: "body2", color: "text.primary", sx: { mb: 1 }, children: section.description }),
          /* @__PURE__ */ jsx(Collapse, { in: expanded, children: section.cookies?.map((cookie, index) => /* @__PURE__ */ jsx(Typography, { component: "div", variant: "caption", color: "text.secondary", sx: { mb: 1 }, children: cookie }, index)) })
        ] })
      }
    )
  ] });
}
function Transition({ ref, ...props }) {
  return /* @__PURE__ */ jsx(Slide, { direction: "up", ref, ...props });
}
const defaultSettings = {
  functional: true,
  preferences: true,
  analytics: false,
  marketing: false
};
function CookieConsentDialog({ open, onClose, ...rest }) {
  const dispatch = useAppDispatch();
  const consent = useAppSelector(selectCookieConsentRecord);
  const status = useAppSelector(selectCookieConsentStatus);
  const [preferences, setPreferences] = useState(consent?.preferences ?? defaultSettings);
  const formId = useId();
  useEffect(() => {
    if (open) {
      dispatch(loadCookieConsentInfo());
    }
  }, [dispatch, open]);
  useEffect(() => {
    setPreferences(consent?.preferences ?? defaultSettings);
  }, [consent]);
  const saveHandler = async (settings) => {
    const body = {
      accepted: ["functional"],
      rejected: []
    };
    if (settings.preferences) {
      body.accepted.push("preferences");
    } else {
      body.rejected.push("preferences");
    }
    if (settings.analytics) {
      body.accepted.push("analytics");
    } else {
      body.rejected.push("analytics");
    }
    if (settings.marketing) {
      body.accepted.push("marketing");
    } else {
      body.rejected.push("marketing");
    }
    await dispatch(saveCookieConsent(body));
    onClose();
  };
  const submitHandler = async (ev) => {
    ev.preventDefault();
    await saveHandler(preferences);
  };
  const changeHandler = (section) => (checked) => {
    if (section === "functional") {
      return;
    }
    setPreferences({ ...preferences, [section]: checked });
  };
  const acceptAllHandler = async () => {
    await saveHandler({ preferences: true, analytics: true, marketing: true });
  };
  const denyAllHandler = async () => {
    await saveHandler({ preferences: false, analytics: false, marketing: false });
  };
  return /* @__PURE__ */ jsxs(
    Dialog,
    {
      open,
      onClose,
      ...rest,
      slots: { transition: Transition },
      "aria-describedby": "Cookie consent form for B2B.chums.com",
      children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Cookie and Privacy Preferences" }),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            "aria-label": "close",
            onClick: () => onClose(),
            sx: (theme2) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme2.palette.grey[500]
            }),
            children: /* @__PURE__ */ jsx(CloseIcon, {})
          }
        ),
        /* @__PURE__ */ jsxs(DialogContent, { children: [
          status !== "idle" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
          /* @__PURE__ */ jsx(DialogContentText, { sx: { mb: 2 }, children: /* @__PURE__ */ jsx("strong", { children: "You value your privacy" }) }),
          /* @__PURE__ */ jsx(DialogContentText, { sx: { mb: 2 }, children: "This website uses cookies and similar technologies to enable site functionality as well as for analytics, personalization and targeted advertising." }),
          consent?.gpc && /* @__PURE__ */ jsxs(DialogContentText, { sx: { mb: 2 }, children: [
            "We have detected a ",
            /* @__PURE__ */ jsx("strong", { children: "Global Privacy Control" }),
            " signal from your browser and have automatically opted you out of our marketing and analytics cookies. You can opt back in to the analytics and marketing cookies at any time by changing your privacy settings."
          ] }),
          !!consent?.uuid && /* @__PURE__ */ jsxs(DialogContentText, { sx: { mb: 2 }, children: [
            "Your cookie ID: ",
            consent.uuid
          ] }),
          /* @__PURE__ */ jsx("form", { id: formId, onSubmit: submitHandler, children: /* @__PURE__ */ jsxs(List, { children: [
            /* @__PURE__ */ jsx(
              CookieConsentItem,
              {
                consentSection: "functional",
                checked: true,
                onChange: changeHandler("functional")
              }
            ),
            /* @__PURE__ */ jsx(
              CookieConsentItem,
              {
                consentSection: "preferences",
                checked: preferences.preferences,
                onChange: changeHandler("preferences")
              }
            ),
            /* @__PURE__ */ jsx(
              CookieConsentItem,
              {
                consentSection: "analytics",
                checked: preferences.analytics,
                onChange: changeHandler("analytics")
              }
            ),
            /* @__PURE__ */ jsx(
              CookieConsentItem,
              {
                consentSection: "marketing",
                checked: preferences.marketing,
                onChange: changeHandler("marketing")
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(DialogActions, { children: [
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: onClose, disabled: status !== "idle", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outlined", onClick: denyAllHandler, disabled: status !== "idle", children: "Deny All" }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outlined", onClick: acceptAllHandler, disabled: status !== "idle", children: "Accept All" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", form: formId, variant: "contained", color: "primary", disabled: status !== "idle", children: "Save Settings" })
        ] })
      ]
    }
  );
}
function CookiePolicyLink() {
  const consent = useAppSelector(selectCookieConsentRecord);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (consent) {
      LocalStore.setItem(STORE_COOKIE_CONSENT, consent.preferences);
    }
  }, [consent]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(FooterLink, { sx: { cursor: "pointer" }, onClick: () => setShow(true), children: "Cookie Policy" }),
    /* @__PURE__ */ jsx(CookieConsentDialog, { open: show, onClose: () => setShow(false) })
  ] });
}
const BottomLinksContainer = styled(Box)(({ theme: theme2 }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  backgroundColor: "#262626",
  color: "#EEEEEE",
  fontSize: "12px",
  textTransform: "uppercase",
  padding: "calc(var(--footer-contacts-padding) / 2)",
  alignItems: "center",
  [theme2.breakpoints.up("md")]: {
    flexDirection: "row"
  }
}));
const BottomLinks = styled(Stack)(({ theme: theme2 }) => ({
  margin: "0 7px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  "* a": {
    padding: "0 calc(var(--footer-contacts-padding) / 3)",
    color: "#EEEEEE !important",
    whiteSpace: "nowrap",
    "&:hover": {
      color: theme2.palette.primary.light
    }
  }
}));
function FooterLinks() {
  const [year] = useState((/* @__PURE__ */ new Date()).getFullYear());
  return /* @__PURE__ */ jsxs(BottomLinksContainer, { children: [
    /* @__PURE__ */ jsx(Box, { sx: { ml: { xs: "1rem" } }, children: /* @__PURE__ */ jsx(AppVersion, {}) }),
    /* @__PURE__ */ jsx(Box, { sx: { ml: { xs: "1rem" } }, children: /* @__PURE__ */ jsx(SignUpModal, {}) }),
    /* @__PURE__ */ jsxs(BottomLinks, { direction: "row", useFlexGap: true, flexWrap: "wrap", children: [
      /* @__PURE__ */ jsx(
        FooterLink,
        {
          underline: "hover",
          href: "//intranet.chums.com/apps/current-openings",
          target: "_blank",
          rel: "noreferrer",
          children: "CAREERS"
        }
      ),
      /* @__PURE__ */ jsx(
        FooterLink,
        {
          underline: "hover",
          href: "//chums.com/page/customization",
          target: "_blank",
          rel: "noreferrer",
          children: "CUSTOMIZE"
        }
      ),
      /* @__PURE__ */ jsx(
        FooterLink,
        {
          underline: "hover",
          href: "//chums.com/page/contact-us",
          target: "_blank",
          rel: "noreferrer",
          children: "CONTACT"
        }
      ),
      /* @__PURE__ */ jsx(CookiePolicyLink, {}),
      /* @__PURE__ */ jsx(
        Link$2,
        {
          component: Link$1,
          to: "/pages/privacy-policy",
          sx: { color: "primary.contrastText" },
          children: "Privacy Policy"
        }
      ),
      /* @__PURE__ */ jsx(
        FooterLink,
        {
          underline: "hover",
          href: "https://chums.com",
          target: "_blank",
          rel: "noreferrer",
          children: "CHUMS.COM"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Box, { sx: { mr: 1 }, children: [
      "© ",
      year,
      " Chums. All rights reserved"
    ] })
  ] });
}
const SocialIconStack = styled(Stack)`
    padding: var(--footer-contacts-padding);
`;
function SocialIcons() {
  return /* @__PURE__ */ jsxs(SocialIconStack, { sx: { mr: 1 }, direction: "row", spacing: 1, children: [
    /* @__PURE__ */ jsxs(FooterLink, { href: "https://www.linkedin.com/company/chums-inc-", target: "_blank", rel: "noreferrer", children: [
      /* @__PURE__ */ jsx(LinkedInIcon, {}),
      /* @__PURE__ */ jsx(Box, { component: "span", sx: visuallyHidden, children: "Follow Chums on LinkedIn" })
    ] }),
    /* @__PURE__ */ jsxs(FooterLink, { href: "https://www.facebook.com/Chumsusa", target: "_blank", rel: "noreferrer", children: [
      /* @__PURE__ */ jsx(FacebookIcon, {}),
      /* @__PURE__ */ jsx(Box, { sx: visuallyHidden, children: "Like Chums on Facebook" })
    ] }),
    /* @__PURE__ */ jsxs(FooterLink, { href: "https://instagram.com/chumsusa", target: "_blank", rel: "noreferrer", children: [
      /* @__PURE__ */ jsx(InstagramIcon, {}),
      /* @__PURE__ */ jsx(Box, { sx: visuallyHidden, children: "Like Chums on Instagram" })
    ] })
  ] });
}
const AddressBox = styled(Box)(({ theme: theme2 }) => ({
  padding: "var(--footer-contacts-padding)",
  textAlign: "center",
  [theme2.breakpoints.up("sm")]: {
    textAlign: "left"
  }
}));
function ContactUs() {
  return /* @__PURE__ */ jsxs(AddressBox, { children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("strong", { children: "CONTACT US" }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Typography, { component: "address", variant: "body1", children: [
      /* @__PURE__ */ jsx("div", { children: "2424 SOUTH 2570 WEST" }),
      /* @__PURE__ */ jsx("div", { children: "SALT LAKE CITY, UT 84119" }),
      /* @__PURE__ */ jsx("div", { children: "(800) 222-2486" })
    ] }) })
  ] });
}
const ContactsContainer = styled(Stack)(() => ({
  backgroundColor: "#000000",
  color: "#FFFFFF",
  justifyContent: "space-between",
  alignItems: "center"
}));
const Footer = () => {
  return /* @__PURE__ */ jsxs(Box, { component: "footer", sx: { width: "100%", maxWidth: "100%" }, children: [
    /* @__PURE__ */ jsxs(ContactsContainer, { spacing: 1, direction: { xs: "column", sm: "row" }, children: [
      /* @__PURE__ */ jsx(ContactUs, {}),
      /* @__PURE__ */ jsx(SocialIcons, {})
    ] }),
    /* @__PURE__ */ jsx(FooterLinks, {})
  ] });
};
const messagesMaxAge = 1e3 * 60 * 30;
const SiteMessages = () => {
  const dispatch = useAppDispatch();
  const isSSR = useIsSSR();
  const messages = useAppSelector(selectActiveMessages);
  const loaded = useAppSelector(selectMessagesLoaded);
  const timerRef = useRef(0);
  useEffect(() => {
    if (isSSR) {
      return;
    }
    timerRef.current = window.setInterval(() => {
      dispatch(loadMessages());
    }, messagesMaxAge);
    return () => {
      if (isSSR) {
        return;
      }
      window.clearInterval(timerRef.current);
    };
  }, [isSSR, messages, loaded]);
  const refreshHandler = () => {
    dispatch(loadMessages());
  };
  if (!messages.length) {
    return null;
  }
  const alertProps = (message) => {
    switch (message.type) {
      case "shipping":
        return { severity: "info", icon: /* @__PURE__ */ jsx(LocalShippingIcon, { onClick: refreshHandler }) };
      case "site":
        return { severity: "warning", icon: /* @__PURE__ */ jsx(WebIcon, { onClick: refreshHandler }) };
    }
    return {};
  };
  return /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Stack, { spacing: 1, sx: { mb: 5 }, children: messages.map((message) => /* @__PURE__ */ jsx(Alert, { ...alertProps(message), children: /* @__PURE__ */ jsx(Typography, { children: message.message }) }, message.id)) }) });
};
function GoogleSignInOneTap({ onDone }) {
  const dispatch = useAppDispatch();
  const successHandler = (credentialResponse) => {
    if (credentialResponse?.credential) {
      dispatch(signInWithGoogle(credentialResponse.credential));
    }
    if (onDone) {
      onDone();
    }
  };
  const errorHandler = () => {
    if (onDone) {
      onDone();
    }
  };
  useGoogleOneTapLogin({
    onSuccess: successHandler,
    onError: errorHandler,
    use_fedcm_for_prompt: true
  });
  return /* @__PURE__ */ jsx("span", { "data-logged-in": false });
}
function CartMessageSnackbar() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectCartMessages);
  const [open, setOpen] = useState(false);
  const [snacks, setSnacks] = useState(messages);
  const [message, setMessage] = useState(snacks[0] ?? null);
  useEffect(() => {
    setSnacks(messages);
  }, [messages]);
  useEffect(() => {
    if (snacks.length && !message) {
      setMessage(snacks[0] ?? null);
      setSnacks((messages2) => messages2.slice(1));
      setOpen(true);
    } else if (snacks.length && message && open) {
      setOpen(false);
    }
  }, [snacks, message, open]);
  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    dispatch(clearCartMessages());
  };
  const handleExited = () => {
    setOpen(false);
    setMessage(null);
  };
  return /* @__PURE__ */ jsx(
    Snackbar,
    {
      open,
      autoHideDuration: 5e3,
      onClose: handleClose,
      slotProps: { transition: { onExited: handleExited } },
      message: message?.message ?? null,
      action: /* @__PURE__ */ jsx(IconButton, { "aria-label": "close", color: "inherit", sx: { p: 0.5 }, onClick: handleClose, children: /* @__PURE__ */ jsx(CloseIcon, {}) })
    }
  );
}
function CookieConsentDrawer() {
  const dispatch = useAppDispatch();
  const gpc = useAppSelector(selectHasGPCFlag);
  const hasCookieConsent = useAppSelector(selectHasCookieConsent);
  const dismissed = useAppSelector(selectCookieConsentDismissed);
  const [showDialog, setShowDialog] = useState(false);
  const acceptHandler = () => {
    const body = {
      accepted: gpc ? ["functional", "preferences"] : ["functional", "preferences", "analytics", "marketing"],
      rejected: gpc ? ["analytics", "marketing"] : []
    };
    dispatch(saveCookieConsent(body));
  };
  const onDismiss = () => {
    dispatch(dismissCookieConsent());
  };
  if (dismissed || hasCookieConsent) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Drawer, { open: true, anchor: "bottom", variant: "permanent", children: [
    /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, sx: { padding: 2, alignItems: "center" }, children: [
      /* @__PURE__ */ jsxs(Grid, { size: { xs: 12, lg: "grow" }, children: [
        /* @__PURE__ */ jsx(Typography, { sx: { mb: 1 }, children: "This website uses cookies and similar technologies to enable site functionality as well as for analytics, personalization and targeted advertising." }),
        gpc && /* @__PURE__ */ jsxs(Typography, { sx: { mb: 1 }, component: "p", children: [
          "We have detected a",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "Global Privacy Control" }),
          " ",
          "signal from your browser and have automatically opted you out of our marketing and analytics cookies."
        ] }),
        /* @__PURE__ */ jsxs(Typography, { sx: { fontWeight: 700 }, color: "chumsRed", children: [
          "Chums does not sell or rent personal information to third parties. See ",
          /* @__PURE__ */ jsx(Link$2, { component: Link$1, to: "/pages/privacy-policy", children: "Privacy Policy" }),
          " for more information."
        ] })
      ] }),
      /* @__PURE__ */ jsx(Grid, { size: { xs: 5, lg: "auto" }, children: /* @__PURE__ */ jsx(Button, { onClick: () => setShowDialog(true), children: "Cookie Settings" }) }),
      /* @__PURE__ */ jsx(Grid, { size: { xs: 5, lg: "auto" }, children: /* @__PURE__ */ jsx(Button, { variant: "contained", color: "chumsGrey", onClick: acceptHandler, children: "Accept Cookies" }) }),
      /* @__PURE__ */ jsx(Grid, { size: { xs: 2, lg: "auto" }, children: /* @__PURE__ */ jsx(IconButton, { onClick: onDismiss, children: /* @__PURE__ */ jsx(CloseIcon, {}) }) })
    ] }),
    /* @__PURE__ */ jsx(CookieConsentDialog, { open: showDialog, onClose: () => setShowDialog(false) })
  ] });
}
const MainOutlet = () => {
  const loggedIn = useAppSelector(selectLoggedIn);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs(Box, { component: "main", sx: { marginTop: "100px", marginBottom: "3rem" }, children: [
      /* @__PURE__ */ jsx(SiteMessages, {}),
      /* @__PURE__ */ jsxs(Container, { maxWidth: "xl", children: [
        loggedIn && /* @__PURE__ */ jsx(AppUpdateLocalLogin, {}),
        !loggedIn && /* @__PURE__ */ jsx(GoogleSignInOneTap, {}),
        /* @__PURE__ */ jsx(AlertList, {}),
        /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(Outlet, {}) })
      ] }),
      /* @__PURE__ */ jsx(CartMessageSnackbar, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(CookieConsentDrawer, {})
  ] });
};
const CategoryGridItem = ({ className, children }) => {
  return /* @__PURE__ */ jsx(Grid, { size: { xs: 6, sm: 4, md: 3 }, className, sx: { marginBottom: 5, textAlign: "center" }, children });
};
const imageSizes$1 = [80, 250, 400, 800, 2048];
const ResponsiveImage = styled("img")`
    max-width: 100%;
    width: 100%;
    height: auto;

`;
const ResponsiveProductImage = ({
  filename,
  preferredSize,
  src,
  alt,
  srcSet,
  sizes,
  ...rest
}) => {
  filename = filename?.replace(/\s/g, "%20");
  if (!src) {
    src = `/images/products/${rest.width ?? 800}/${filename}`;
  }
  if (!srcSet) {
    const [nextSize = 2048] = imageSizes$1.filter((size) => size >= (preferredSize ?? 2048));
    srcSet = imageSizes$1.filter((size) => size <= nextSize).map((size) => `/images/products/${size}/${filename} ${size}w`).join(",");
  }
  return /* @__PURE__ */ jsx(ResponsiveImage, { src, alt, srcSet, sizes, ...rest });
};
const CategoryLink = ({ title, keyword, description, imageUrl, className = "" }) => {
  return /* @__PURE__ */ jsxs(CategoryGridItem, { className, children: [
    /* @__PURE__ */ jsxs(Link$2, { component: Link$1, to: `/products/${keyword}`, underline: "hover", children: [
      /* @__PURE__ */ jsx(
        ResponsiveProductImage,
        {
          filename: imageUrl,
          title,
          alt: title,
          preferredSize: 400
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "product-title", children: title })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "description", children: /* @__PURE__ */ jsx(HTMLContent, { html: description }) })
  ] });
};
const StyledChip = styled(Chip)(() => ({
  width: "auto",
  borderRadius: 0,
  height: "16px",
  lineHeight: "16px",
  fontWeight: 700,
  "& .MuiChip-label": {
    fontSize: "75%"
  }
}));
const attributeColor = (attr) => {
  switch (attr) {
    case "best-seller":
      return { backgroundColor: "#f89d67", color: "#000000" };
    case "upcycled":
      return { backgroundColor: "#7bb291", color: "#000000" };
    case "rfid-blocking":
      return { backgroundColor: "#1f4c7a", color: "#FFFFFF" };
    case "dome":
      return { backgroundColor: "#574e1f", color: "#FFFFFF" };
    case "sublimation":
      return { backgroundColor: "#101b42", color: "#FFFFFF" };
    case "heat-transfer":
      return { backgroundColor: "#b75931", color: "#FFFFFF" };
    case "screen-printing":
      return { backgroundColor: "#dbb687", color: "#000000" };
    case "new-colors":
      return { backgroundColor: "var(--chums-red)", color: "#FFFFFF" };
    case "new":
      return { backgroundColor: "var(--chums-red)", color: "#FFFFFF" };
  }
  return {};
};
const attributeText = (attr) => {
  switch (attr) {
    case "best-seller":
      return "BEST SELLER";
    case "upcycled":
      return "UPCYCLED";
    case "rfid-blocking":
      return "RFID-BLOCKING";
    case "dome":
      return "3D DOME";
    case "sublimation":
      return "SUBLIMATION";
    case "heat-transfer":
      return "HEAT TRANSFER";
    case "screen-printing":
      return "SCREEN PRINTING";
    case "new-colors":
      return "NEW COLORS";
    case "new":
      return "NEW";
  }
  return attr;
};
function ProductAttributeChip({ feature, label, sx, ...rest }) {
  if (!sx) {
    sx = {};
  }
  const colors = attributeColor(feature);
  if (!label) {
    label = attributeText(feature);
  }
  return /* @__PURE__ */ jsx(StyledChip, { label, ...rest, size: "small", sx: { ...colors, ...sx } });
}
const SeasonTeaser = ({ season_teaser, season_active, ...rest }) => {
  const show = !!season_active && !!season_teaser;
  if (!show) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, alignItems: "center", justifyContent: "center", ...rest, children: [
    /* @__PURE__ */ jsx(ProductAttributeChip, { feature: "new" }),
    /* @__PURE__ */ jsx("span", { children: season_teaser })
  ] });
};
const sizeName = {
  sm: "SMALL",
  md: "MEDIUM",
  lg: "LARGE"
};
const SizeIcon = styled$1.div`
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    &.size--sm {
        background-image: url('/css/size-icon-sm.svg');
    }

    &.size--md {
        background-image: url('/css/size-icon-md.svg');
    }

    &.size--lg {
        background-image: url('/css/size-icon-lg.svg');
    }
`;
const SizeIconDescription = ({ size }) => {
  if (!sizeName[size]) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Box, { sx: visuallyHidden, children: [
    "Fits size: ",
    sizeName[size]
  ] });
};
const SizeIconContainer = ({ size }) => {
  return /* @__PURE__ */ jsxs(Box, { style: { height: "32px", display: "flex", alignItems: "center" }, children: [
    /* @__PURE__ */ jsx(SizeIcon, { className: `size--${size}` }),
    /* @__PURE__ */ jsx(SizeIconDescription, { size })
  ] });
};
const SizeIconList = ({ size, spacing }) => {
  const sizes = size.split(",").map((s) => s.trim()).map((s) => s.toLowerCase());
  if (!size || !sizes.length) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: spacing ?? 2, children: [
    (sizes.includes("s") || sizes.includes("sm")) && /* @__PURE__ */ jsx(SizeIconContainer, { size: "sm" }),
    (sizes.includes("m") || sizes.includes("md")) && /* @__PURE__ */ jsx(SizeIconContainer, { size: "md" }),
    (sizes.includes("l") || sizes.includes("lg")) && /* @__PURE__ */ jsx(SizeIconContainer, { size: "lg" })
  ] });
};
function ProductAttributeStack({
  product,
  spacing,
  direction,
  flexWrap,
  justifyContent,
  alignItems,
  isNew,
  ...rest
}) {
  return /* @__PURE__ */ jsxs(
    Stack,
    {
      spacing: spacing ?? 1,
      useFlexGap: true,
      direction: direction ?? "row",
      flexWrap: flexWrap ?? "wrap",
      justifyContent: justifyContent ?? "center",
      alignItems: alignItems ?? "center",
      ...rest,
      children: [
        !!product.additionalData?.size && /* @__PURE__ */ jsx(SizeIconList, { size: product.additionalData.size, spacing: 1 }),
        isNew && /* @__PURE__ */ jsx(ProductAttributeChip, { feature: "new" }),
        product.additionalData?.best_seller && /* @__PURE__ */ jsx(ProductAttributeChip, { feature: "best-seller" }),
        product.canScreenPrint && /* @__PURE__ */ jsx(ProductAttributeChip, { feature: "screen-printing" }),
        product.canDome && /* @__PURE__ */ jsx(ProductAttributeChip, { feature: "dome" }),
        !!product.additionalData?.upcycled && /* @__PURE__ */ jsx(ProductAttributeChip, { feature: "upcycled" }),
        !!product.additionalData?.heatTransfer && /* @__PURE__ */ jsx(ProductAttributeChip, { feature: "heat-transfer" }),
        !!product.additionalData?.sublimation && /* @__PURE__ */ jsx(ProductAttributeChip, { feature: "sublimation" }),
        !!product.additionalData?.rfidBlocking && /* @__PURE__ */ jsx(ProductAttributeChip, { feature: "rfid-blocking" }),
        !!product.additionalData?.newColors && /* @__PURE__ */ jsx(ProductAttributeChip, { feature: "new-colors" })
      ]
    }
  );
}
function ProductLink({ categoryKeyword, productKeyword, children, ...props }) {
  if (!productKeyword) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  const link = categoryKeyword ? `/products/${categoryKeyword}/${productKeyword}` : `/products/${productKeyword}`;
  return /* @__PURE__ */ jsx(Link$2, { component: Link$1, to: link, underline: "hover", ...props, children });
}
const CategoryProductLink = ({ title, description, product, imageUrl, className = "" }) => {
  const _image = !imageUrl ? parseImageFilename(product.image, product.defaultColor) : imageUrl;
  return /* @__PURE__ */ jsxs(CategoryGridItem, { className, children: [
    /* @__PURE__ */ jsxs(ProductLink, { categoryKeyword: product.defaultCategoryKeyword, productKeyword: product.keyword, children: [
      /* @__PURE__ */ jsx(
        ResponsiveProductImage,
        {
          filename: _image,
          title,
          alt: title,
          preferredSize: 400
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "product-title", children: title }),
      /* @__PURE__ */ jsx(ProductAttributeStack, { product }),
      /* @__PURE__ */ jsx(
        SeasonTeaser,
        {
          season_teaser: product.season_teaser,
          season_active: product.season_active,
          sx: { justifyContent: "center" }
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "description", children: /* @__PURE__ */ jsx(HTMLContent, { html: description }) })
  ] });
};
const imageSizes = "(max-width: 600px) 168px, (max-width: 900px) 268px, 354px";
function CategoryPageElement({ item }) {
  if (isCategoryChildCategory(item)) {
    return /* @__PURE__ */ jsx(
      CategoryLink,
      {
        title: item.title,
        description: item.description,
        keyword: item.category.keyword,
        imageUrl: item.imageUrl
      }
    );
  }
  if (isCategoryChildProduct(item)) {
    return /* @__PURE__ */ jsx(
      CategoryProductLink,
      {
        title: item.title,
        description: item.description,
        product: item.product,
        imageUrl: item.imageUrl
      }
    );
  }
  if (isCategoryChildLink(item) && item.urlOverride) {
    return /* @__PURE__ */ jsxs(CategoryGridItem, { className: item.className, children: [
      /* @__PURE__ */ jsxs(Link$2, { component: Link$1, to: item.urlOverride, children: [
        !!item.imageUrl && /* @__PURE__ */ jsx(
          ResponsiveProductImage,
          {
            filename: item.imageUrl,
            alt: item.title,
            loading: "lazy",
            sizes: imageSizes,
            width: 400,
            height: 400
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "product-title", children: item.title })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "description", children: /* @__PURE__ */ jsx(HTMLContent, { html: item.description }) })
    ] });
  }
  if (isCategoryChildLink(item)) {
    return /* @__PURE__ */ jsxs(CategoryGridItem, { className: item.className, children: [
      !!item.imageUrl && /* @__PURE__ */ jsx(
        ResponsiveProductImage,
        {
          filename: item.imageUrl,
          alt: item.title,
          loading: "lazy",
          sizes: imageSizes,
          width: 400,
          height: 400
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "product-title", children: item.title }),
      /* @__PURE__ */ jsx("div", { className: "description", children: /* @__PURE__ */ jsx(HTMLContent, { html: item.description }) })
    ] });
  }
  if (isCategoryChildSection(item)) {
    return /* @__PURE__ */ jsxs(Grid, { size: 12, className: item.className, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h3", component: "h3", sx: { textAlign: "center" }, children: item.sectionTitle }),
      !!item.sectionDescription && /* @__PURE__ */ jsx(Typography, { variant: "subtitle1", sx: { textAlign: "center" }, children: item.sectionDescription })
    ] });
  }
  return null;
}
function CategoryPage({ keyword }) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCategoryLoading);
  const category = useAppSelector(selectCategory);
  useEffect(() => {
    dispatch(loadCategory(keyword));
  }, [keyword]);
  useEffect(() => {
    if (category) {
      ga4ViewItemList(category);
    }
  }, [category]);
  if (!category) {
    return /* @__PURE__ */ jsx(Box, { children: loading && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }) });
  }
  const { title, lifestyle, pageText } = category;
  const children = category.children.filter((cat) => !!cat.status).sort((a, b) => a.priority - b.priority);
  return /* @__PURE__ */ jsxs(Box, { children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle: title }),
    !!lifestyle && /* @__PURE__ */ jsx("img", { src: lifestyle, alt: "lifestyle image", "aria-hidden": "true", style: { width: "100%" } }),
    /* @__PURE__ */ jsx(Typography, { component: "h1", variant: "h1", sx: { textAlign: "center", mb: 3 }, children: title }),
    loading && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
    !!pageText && /* @__PURE__ */ jsx(HTMLContent, { html: pageText }),
    /* @__PURE__ */ jsx(Grid, { container: true, spacing: 3, justifyContent: children.length < 4 ? "center" : "start", sx: { mt: 3 }, children: children.filter((child) => !!child.status).sort((a, b) => a.priority - b.priority).map((child) => /* @__PURE__ */ jsx(CategoryPageElement, { item: child }, child.id)) })
  ] });
}
const BaseMiniChip = styled(Chip)`
    height: 1rem;
    font-size: 0.625rem;
    border-radius: 6px;
`;
const MiniChip = ({ bgColor, textColor, color, label, sx, ...props }) => {
  if (!!bgColor && !textColor) {
    textColor = getContrastRatio(bgColor, "#FFF") > 4.5 ? "#FFF" : "#000";
  }
  return /* @__PURE__ */ jsx(
    BaseMiniChip,
    {
      label,
      color,
      sx: { ...sx, color: textColor, backgroundColor: bgColor, mr: "2px" },
      ...props,
      size: "small"
    }
  );
};
const SwatchButton = styled(Button)`
    width: 48px;
    min-width: 48px;
    padding: 3px;
    margin: 3px;
`;
const NewColorChip = styled(MiniChip)`
    background-color: var(--chums-red);
    color: #FFF;
    margin-top: 1px;
    border-radius: 0;
    width: 100%;
    height: 0.75rem;
`;
const SwatchImage = styled(Box)`
    width: 42px;
    height: 42px;
    display: block;
    background-size: contain;
`;
const Swatch = ({ color, itemQuantity, swatchFormat = "?", active = false, newColor, onClick }) => {
  const swatchClassname = parseColor(`color-swatch color-swatch--${swatchFormat}`, color?.swatchCode || color?.code);
  const clickHandler = () => {
    onClick(color?.code ?? null);
  };
  return /* @__PURE__ */ jsx(
    SwatchButton,
    {
      variant: active ? "outlined" : "text",
      className: "swatch",
      onClick: clickHandler,
      children: /* @__PURE__ */ jsxs(Stack, { direction: "column", children: [
        /* @__PURE__ */ jsx(Box, { className: "color-code", children: color?.code }),
        !!itemQuantity && /* @__PURE__ */ jsxs(Box, { className: "color-qty", children: [
          "x",
          itemQuantity
        ] }),
        /* @__PURE__ */ jsx(SwatchImage, { className: swatchClassname }),
        newColor && /* @__PURE__ */ jsx(NewColorChip, { label: "New" })
      ] })
    }
  );
};
const SwatchContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
`;
const SwatchSet = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const cartItem = useAppSelector(selectProductCartItem);
  const colorCode = useAppSelector(selectProductColorCode);
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [swatchFormat, setSwatchFormat] = useState(selectedProduct?.additionalData?.swatch_format || "?");
  useEffect(() => {
    const sku = params.get("sku");
    if (sku && isSellAsColors(selectedProduct) && cartItem?.itemCode !== sku) {
      if (cartItem && sku !== cartItem.itemCode) {
        setParams((prev) => {
          prev.set("sku", cartItem.itemCode);
          return prev;
        }, { replace: true });
      }
    }
  }, [params, selectedProduct, cartItem]);
  useEffect(() => {
    if (!selectedProduct) {
      return;
    }
    setSwatchFormat(selectedProduct?.additionalData?.swatch_format || "?");
    if (isSellAsMix(selectedProduct)) {
      setItems(selectedProduct.mix.items);
    } else if (isSellAsColors(selectedProduct)) {
      setItems(selectedProduct.items.filter((item) => item.status));
    } else {
      setItems([]);
    }
  }, [selectedProduct]);
  useEffect(() => {
    ga4SelectColorItem(selectedProduct, cartItem);
  }, [selectedProduct, cartItem]);
  const clickHandler = (colorCode2) => {
    if (colorCode2) {
      dispatch(setColorCode(colorCode2));
    }
  };
  if (!selectedProduct || !items.length) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsxs(Typography, { variant: "body1", sx: { mr: 3, display: "inline-block" }, children: [
        selectedProduct.sellAs === SELL_AS_MIX && /* @__PURE__ */ jsx("span", { children: "Selected Color:" }),
        selectedProduct.sellAs === SELL_AS_COLORS && /* @__PURE__ */ jsx("span", { children: "Color:" })
      ] }),
      /* @__PURE__ */ jsx(
        Typography,
        {
          variant: "body1",
          sx: { fontWeight: 700, display: "inline-block" },
          children: cartItem?.colorName
        }
      )
    ] }),
    /* @__PURE__ */ jsx(SwatchContainer, { children: items.map((item) => /* @__PURE__ */ jsx(
      Swatch,
      {
        color: item.color ?? null,
        itemQuantity: item.itemQuantity,
        swatchFormat: item?.additionalData?.swatch_code || swatchFormat,
        active: colorCode === item.color?.code,
        newColor: item.additionalData?.season?.active,
        onClick: clickHandler
      },
      item.id
    )) })
  ] });
};
const CustomerPricingNotice = styled("span")`
    margin-left: 5px;
    font-size: 12px;
    font-weight: 600;
`;
const CartItemPriceDescription = ({ priceCodeRecord = null, priceLevel = "" }) => {
  if (!priceCodeRecord?.ItemCode && !priceLevel) {
    return null;
  }
  if (priceCodeRecord?.ItemCode) {
    switch (priceCodeRecord?.PricingMethod) {
      case "P":
        return /* @__PURE__ */ jsxs(CustomerPricingNotice, { children: [
          "(Negotiated Discount: ",
          numeral(priceCodeRecord.DiscountMarkup1).format("$0.00"),
          ")"
        ] });
      case "D":
        return /* @__PURE__ */ jsxs(CustomerPricingNotice, { children: [
          "(Negotiated Discount: ",
          numeral(priceCodeRecord.DiscountMarkup1 / 100).format("0%"),
          ")"
        ] });
      case "O":
        return /* @__PURE__ */ jsxs(CustomerPricingNotice, { children: [
          "(Negotiated Price: ",
          numeral(priceCodeRecord.DiscountMarkup1).format("$0.00"),
          ")"
        ] });
      default:
        return null;
    }
  }
  if (PRICE_LEVELS$1[priceLevel]) {
    return /* @__PURE__ */ jsxs(CustomerPricingNotice, { children: [
      "(",
      PRICE_LEVELS$1[priceLevel],
      " pricing)"
    ] });
  }
  return null;
};
const CartItemDetailTableTHCell = styled(TableCell)`
    font-weight: 400;
    font-size: 16px;
    color: 'inherit';
`;
const CartItemDetailTableTDCell = styled(TableCell)`
    font-weight: 600;
    font-size: 16px;
    color: 'inherit';
`;
const CartItemDetail = ({ cartItem, msrp }) => {
  const canViewAvailable = useAppSelector(selectCanViewAvailable);
  const theme2 = useTheme();
  if (!cartItem || !cartItem.itemCode) {
    return null;
  }
  const roi = new Decimal(cartItem.quantity ?? 1).times(cartItem.salesUMFactor ?? 1).times(
    new Decimal(cartItem.msrp ?? 0).sub(new Decimal(cartItem.price ?? 0).div(cartItem.salesUMFactor ?? 1))
  );
  const availableToday = new Decimal(cartItem.quantityAvailable ?? 0).div(cartItem.salesUMFactor ?? 1);
  return /* @__PURE__ */ jsxs(Box, { sx: { mt: 3 }, children: [
    /* @__PURE__ */ jsx(Collapse, { in: !!cartItem.message, children: /* @__PURE__ */ jsx(Alert, { severity: "info", children: cartItem.message }) }),
    /* @__PURE__ */ jsx(Table, { size: "small", children: /* @__PURE__ */ jsxs(TableBody, { children: [
      (!msrp || msrp.length > 1 || (cartItem.salesUMFactor ?? 1) > 1) && new Decimal(cartItem.msrp ?? 0).gt(0) && /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(
          CartItemDetailTableTHCell,
          {
            component: "th",
            scope: "row",
            align: "left",
            children: "MSRP"
          }
        ),
        /* @__PURE__ */ jsxs(
          CartItemDetailTableTDCell,
          {
            align: "right",
            children: [
              "$ ",
              numeral(cartItem.msrp ?? 0).format("0,0.00"),
              " (",
              cartItem.stdUM,
              ")"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxs(CartItemDetailTableTHCell, { component: "th", scope: "row", align: "left", children: [
          "Your Price",
          /* @__PURE__ */ jsx(
            CartItemPriceDescription,
            {
              priceCodeRecord: cartItem.priceCodeRecord ?? null,
              priceLevel: cartItem.priceLevel
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          CartItemDetailTableTDCell,
          {
            align: "right",
            children: [
              "$ ",
              numeral(cartItem.price).format("0,0.00"),
              " (",
              cartItem.salesUM,
              ")"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(CartItemDetailTableTHCell, { component: "th", scope: "row", align: "left", children: "Ext Price" }),
        /* @__PURE__ */ jsxs(
          CartItemDetailTableTDCell,
          {
            align: "right",
            children: [
              "$ ",
              numeral(new Decimal(cartItem.price ?? 0).times(cartItem.quantity)).format("0,0.00")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(
          CartItemDetailTableTHCell,
          {
            component: "th",
            scope: "row",
            align: "left",
            children: "ROI"
          }
        ),
        /* @__PURE__ */ jsxs(
          CartItemDetailTableTDCell,
          {
            align: "right",
            children: [
              "$ ",
              numeral(roi.toString()).format("0,0.00")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { className: "item-code", children: [
        /* @__PURE__ */ jsx(
          CartItemDetailTableTHCell,
          {
            component: "th",
            scope: "row",
            align: "left",
            children: "SKU"
          }
        ),
        /* @__PURE__ */ jsx(CartItemDetailTableTDCell, { align: "right", children: cartItem.itemCode })
      ] }),
      canViewAvailable && /* @__PURE__ */ jsxs(
        TableRow,
        {
          sx: { color: (cartItem.quantityAvailable ?? 0) <= 0 ? theme2.palette.error.main : void 0 },
          children: [
            /* @__PURE__ */ jsx(CartItemDetailTableTHCell, { component: "th", scope: "row", align: "left", sx: { color: "inherit" }, children: "Available Today" }),
            /* @__PURE__ */ jsxs(
              CartItemDetailTableTDCell,
              {
                align: "right",
                sx: { color: "inherit" },
                children: [
                  numeral(availableToday.toString()).format("0,0"),
                  " (",
                  cartItem.salesUM,
                  ")"
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    new Decimal(cartItem.quantity ?? 1).gt(availableToday) && /* @__PURE__ */ jsx(Alert, { severity: "warning", children: "Product is not available for immediate delivery." })
  ] });
};
const MissingTaxScheduleAlert = () => {
  const customer = useAppSelector(selectCustomerAccount);
  const loading = useAppSelector(selectCustomerLoadStatus);
  const loaded = useAppSelector(selectCustomerLoaded);
  const loggedIn = useAppSelector(selectLoggedIn);
  if (!customer) {
    return null;
  }
  if (!loggedIn || !loaded || loading === "loading" || !!customer?.TaxSchedule) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Alert, { severity: "error", children: [
    /* @__PURE__ */ jsx("strong", { className: "me-1", children: "Warning:" }),
    "Missing Tax Schedule. Please contact",
    /* @__PURE__ */ jsx(
      "a",
      {
        href: `mailto:cs@chums.com?subject=${customer.ARDivisionNo}-${customer.CustomerNo}${encodeURIComponent(" Missing Tax Schedule (B2B)")}`,
        rel: "noreferrer",
        target: "_blank",
        children: "customer service."
      }
    )
  ] });
};
const RequireLogin = ({ fallback, children }) => {
  const loggedIn = useAppSelector(selectLoggedIn);
  if (!loggedIn || !children) {
    return fallback ?? null;
  }
  return /* @__PURE__ */ jsx(ErrorBoundary, { children });
};
const sizesQuery = `(max-width: 600px) 456px, (max-width: 900px) 755px, (max-width: 1200px) 559px, (max-width: 1536px) 755px, 800px`;
function ProductCurrentImage({ image }) {
  const [filename, setFilename] = useState(image.image.replace(/\s/g, "%20"));
  useLayoutEffect(() => {
    setFilename(image.image.replace(/\s/g, "%20"));
  }, [image]);
  return /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(
    ResponsiveProductImage,
    {
      filename,
      alt: image.altText,
      loading: "eager",
      sizes: sizesQuery,
      width: 800,
      height: 800
    }
  ) });
}
function ProductAlternateImageList({ currentImage, images, onSelectImage }) {
  return /* @__PURE__ */ jsx(Stack, { direction: "column", useFlexGap: true, flexWrap: "wrap", spacing: 2, sx: { justifyContent: "center" }, children: images.sort((a, b) => a.priority - b.priority).map((img) => /* @__PURE__ */ jsx(Paper, { elevation: currentImage.image === img.image ? 1 : 0, children: /* @__PURE__ */ jsx(Box, { sx: { width: "80px" }, onClick: () => onSelectImage(img), children: /* @__PURE__ */ jsx(
    ResponsiveProductImage,
    {
      filename: img.image,
      preferredSize: 80,
      alt: img.altText,
      width: 80,
      height: 80,
      loading: "lazy"
    }
  ) }) }, img.id)) });
}
function toMainImage({ image, colorCode, altText }) {
  return {
    id: 0,
    productId: 0,
    image: parseImageFilename(image, colorCode),
    altText: altText ?? "",
    status: true,
    priority: -1
  };
}
function filterCurrentImages({ selectedItem, altImages }) {
  if (!altImages || !altImages.length || !selectedItem) {
    return [];
  }
  const selectedItemHash = `#${selectedItem}`;
  const filter = /^#[A-Z0-9]+/i;
  return altImages.filter((img) => !!img.status).filter((img) => {
    return !filter.test(img.altText) || img.altText.includes(selectedItemHash);
  });
}
function ProductImageCarousel(props) {
  const [currentImage, setCurrentImage] = useState(toMainImage(props));
  const [carouselImages, setCarouselImages] = useState([toMainImage(props), ...filterCurrentImages(props)]);
  const onSelectImage = useCallback((image) => {
    if (image.image !== currentImage.image) {
      setCurrentImage(image);
    }
  }, [currentImage]);
  useEffect(() => {
    const mainImage = toMainImage(props);
    setCurrentImage(mainImage);
    setCarouselImages([mainImage, ...filterCurrentImages(props)]);
  }, [props]);
  if (carouselImages.length < 2) {
    return /* @__PURE__ */ jsx(
      ResponsiveProductImage,
      {
        filename: currentImage.image.replace(/\s/g, "%20"),
        alt: currentImage.altText,
        loading: "eager",
        sizes: sizesQuery,
        width: 800,
        height: 800
      }
    );
  }
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, children: [
    /* @__PURE__ */ jsx(ProductCurrentImage, { image: currentImage }),
    /* @__PURE__ */ jsx(
      ProductAlternateImageList,
      {
        images: carouselImages,
        currentImage,
        onSelectImage
      }
    )
  ] });
}
const ProductPageImage = () => {
  const cartItem = useAppSelector(selectProductCartItem);
  const loading = useAppSelector(selectProductLoading);
  const product = useAppSelector(selectCurrentProduct);
  const image = useAppSelector(selectProductImage);
  const altImages = useAppSelector(selectProductAltImages);
  if (!cartItem || !image || !image.filename) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ProductImageCarousel,
      {
        image: image.filename,
        selectedItem: image.itemCode ?? "",
        loading,
        altImages,
        altText: product?.name
      }
    ),
    /* @__PURE__ */ jsx(
      "link",
      {
        rel: "preload",
        as: "image",
        imageSrcSet: altImages.map((img) => `/images/products/800/${img.image} 800w`).join(", ")
      }
    )
  ] });
};
const ProductPageTitle = () => {
  const product = useAppSelector(selectCurrentProduct);
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const isNew = !!product?.season?.product_teaser && product?.season?.active || !!selectedProduct?.season?.product_teaser && selectedProduct?.season?.active;
  if (!product) {
    return null;
  }
  const documentTitle = product?.name + (product?.additionalData?.subtitle ? ` - ${product.additionalData.subtitle}` : "");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle }),
    /* @__PURE__ */ jsxs("div", { className: "product-title", children: [
      /* @__PURE__ */ jsx(Typography, { component: "h1", variant: "h1", children: product.name }),
      !!product.additionalData?.subtitle && /* @__PURE__ */ jsx(Typography, { component: "h2", variant: "h2", sx: { fontSize: 24 }, children: product.additionalData.subtitle || "" }),
      /* @__PURE__ */ jsx(ProductAttributeStack, { product, isNew, justifyContent: "flex-start", sx: { mb: 2 } })
    ] })
  ] });
};
const ProductPageInfo = () => {
  const msrp = useAppSelector(selectProductMSRP);
  const salesUM = useAppSelector(selectProductSalesUM);
  const cartItem = useAppSelector(selectProductCartItem);
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const itemCode = cartItem?.itemCode ?? selectedProduct?.itemCode ?? null;
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsx(Typography, { variant: "caption", sx: { mr: 2 }, component: "span", children: "SKU" }),
      /* @__PURE__ */ jsx(Typography, { variant: "body1", component: "span", sx: { fontWeight: "600" }, children: itemCode })
    ] }),
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsx(Typography, { variant: "caption", sx: { mr: 2 }, component: "span", children: "MSRP" }),
      /* @__PURE__ */ jsxs(Typography, { variant: "body1", component: "span", sx: { fontWeight: "600" }, children: [
        "$ ",
        msrp.map((price) => numeral(price).format("0.00")).join(" - "),
        " ",
        "(",
        salesUM,
        ")"
      ] })
    ] })
  ] });
};
const ProductPreSeasonAlert = () => {
  const cartItem = useAppSelector(selectProductCartItem);
  const show = isCartProduct(cartItem) && cartItem.season?.active && !(cartItem.season?.product_available || cartItem.seasonAvailable);
  return /* @__PURE__ */ jsx(Collapse, { in: show, children: /* @__PURE__ */ jsxs(Alert, { severity: "info", sx: { mb: 2 }, children: [
    /* @__PURE__ */ jsx(Box, { component: "strong", sx: { mr: 2 }, children: "Pre-Season Order:" }),
    " ",
    cartItem?.season?.preSeasonMessage
  ] }) });
};
const SelectCustomerAlert = () => {
  const loading = useAppSelector(selectCustomerLoadStatus);
  const currentCustomer = useAppSelector(selectCustomerKey);
  const currentAccess = useAppSelector(selectCurrentAccess);
  const theme2 = useTheme();
  const location = useLocation();
  if (currentCustomer || loading !== "loading") {
    return null;
  }
  const path2 = currentAccess ? `/profile/${currentAccess.id}` : "/profile";
  return /* @__PURE__ */ jsx(Alert, { severity: "warning", children: /* @__PURE__ */ jsx(
    Link$2,
    {
      component: Link$1,
      to: path2,
      state: { returnTo: location.pathname },
      sx: { color: theme2.palette.warning.main },
      children: "Please select a customer."
    }
  ) });
};
const VariantButtonBase = styled(Button)(() => ({
  width: "100%"
}));
const VariantButton = ({ variant, selected, direction, spacing, onClick }) => {
  const priceCodes = useAppSelector(selectCustomerPricing);
  const loggedIn = useAppSelector(selectLoggedIn);
  const prices = loggedIn ? getPrices(variant.product, priceCodes) : getMSRP(variant.product);
  const salesUM = getSalesUM(variant.product);
  return /* @__PURE__ */ jsx(
    VariantButtonBase,
    {
      variant: selected ? "contained" : "outlined",
      onClick: () => onClick(variant),
      children: /* @__PURE__ */ jsxs(
        Stack,
        {
          direction: direction ?? { xs: "row", sm: "column" },
          spacing: spacing ?? { xs: 2, sm: 0 },
          alignItems: "center",
          children: [
            /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Typography, { variant: "variantButtonText", children: variant.title }) }),
            /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(Typography, { variant: "variantButtonPrice", children: [
              "$ ",
              prices.map((price) => numeral(price).format("0.00")).join(" - "),
              " ",
              "(",
              salesUM || "EA",
              ")"
            ] }) })
          ]
        }
      )
    }
  );
};
const activeVariants = (variants) => {
  return variants.filter((v) => v.product?.status).sort((a, b) => a.priority - b.priority);
};
function VariantButtons() {
  const dispatch = useAppDispatch();
  const selectedVariantId = useAppSelector(selectProductVariantId);
  const product = useAppSelector(selectCurrentVariantProduct);
  const [variants, setVariants] = useState(activeVariants(product?.variants ?? []));
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    const sku = params.get("sku");
    if (!!sku && product && product.itemCode !== sku) {
      let variant;
      const matching = variants.filter(
        (v) => v.product?.itemCode === sku || v.product && isSellAsColors(v.product) && v.product.items.filter((i) => i.itemCode === sku).length > 0
      );
      if (matching.length > 1) {
        [variant] = matching.filter((v) => v.id === selectedVariantId);
      } else {
        variant = matching[0];
      }
      if (variant) {
        dispatch(setCurrentVariant({ ...variant, preferredItem: sku }));
        return;
      }
    }
  }, [params, product, variants]);
  const selectHandler = useCallback((variant) => {
    if (!variant || !variant.id || !product) {
      return;
    }
    if (variant.product && isSellAsMix(variant.product)) {
      ga4SelectMixItem(product, variant.product);
    } else {
      ga4SelectVariantItem(variant.product?.itemCode ?? variant.id.toString());
    }
    const _params = new URLSearchParams(params);
    if (variant.product?.itemCode) {
      _params.set("sku", variant.product?.itemCode);
    } else {
      _params.delete("sku");
    }
    setParams(_params, { replace: true });
    dispatch(setCurrentVariant(variant));
  }, [product]);
  useEffect(() => {
    setVariants(activeVariants(product?.variants ?? []));
  }, [product]);
  if (variants.length <= 1) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Grid,
    {
      container: true,
      spacing: 1,
      className: "variant-buttons-container",
      direction: { xs: variants.length > 2 ? "row" : "column", sm: "row" },
      justifyContent: variants.length === 2 ? "center" : "flex-start",
      children: variants.map((variant) => /* @__PURE__ */ jsx(Grid, { size: { xs: variants.length > 2 ? 4 : 12, sm: 3, md: 4 }, children: /* @__PURE__ */ jsx(
        VariantButton,
        {
          onClick: selectHandler,
          variant,
          direction: { xs: variants.length > 2 ? "column" : "row", sm: "column" },
          spacing: { xs: variants.length <= 2 ? 2 : 0, sm: 0 },
          selected: variant.id === selectedVariantId
        }
      ) }, variant.id))
    }
  );
}
const ProductPanel = styled$1.div`
    iframe {
        border: none;
        max-width: 100%;
        width: 100%;
        aspect-ratio: 16/9;
        height: auto;
    }
`;
const ProductPage = ({ keyword }) => {
  const isSSR = useIsSSR();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectCurrentProduct);
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const loading = useAppSelector(selectProductLoading);
  const cartItem = useAppSelector(selectProductCartItem);
  const customerAccount = useAppSelector(selectCustomerAccount);
  const location = useLocation();
  const [cartMessage, setCartMessage] = useState(null);
  const timerHandle = useRef(0);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    dispatch(loadProduct(keyword));
  }, [keyword]);
  useEffect(() => {
    setQuantity(1);
    ga4ViewItem(product);
  }, [product]);
  useEffect(() => {
    setQuantity(1);
  }, [selectedProduct?.salesUM]);
  useEffect(() => {
    setCartMessage(null);
  }, [cartItem]);
  useEffect(() => {
    if (isSSR) {
      return;
    }
    if (cartMessage) {
      timerHandle.current = window.setTimeout(() => {
        setCartMessage(null);
      }, 5e3);
    }
    return () => {
      window.clearTimeout(timerHandle.current);
    };
  }, [isSSR, cartMessage]);
  useEffect(() => {
    if (location?.state?.variant && product && isSellAsVariants(product) && selectedProduct?.keyword !== location.state.variant) {
      const [_variant] = product.variants.filter((v) => v.product?.keyword === location.state.variant);
      console.debug(location.state.variant, _variant.product?.keyword);
      if (_variant) {
        dispatch(setCurrentVariant(_variant));
      }
      delete location.state.variant;
      redirect(location.pathname);
    }
  }, [location, selectedProduct, product]);
  return /* @__PURE__ */ jsx(Box, { className: classNames("product-page", { loading }), children: /* @__PURE__ */ jsx(ProductPanel, { children: /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 5, children: [
    /* @__PURE__ */ jsx(Grid, { size: 12, sx: { display: { xs: "block", md: "none" } }, children: /* @__PURE__ */ jsx(ProductPageTitle, {}) }),
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, md: 6, lg: 7 }, children: /* @__PURE__ */ jsx(ProductPageImage, {}) }),
    /* @__PURE__ */ jsxs(Grid, { size: { xs: 12, md: 6, lg: 5 }, children: [
      /* @__PURE__ */ jsx(Box, { sx: { display: { xs: "none", md: "block" } }, children: /* @__PURE__ */ jsx(ProductPageTitle, {}) }),
      /* @__PURE__ */ jsx(ProductPageInfo, {}),
      isSellAsVariants(product) && /* @__PURE__ */ jsx(VariantButtons, {}),
      /* @__PURE__ */ jsx(SwatchSet, {}),
      (!isCartProduct(cartItem) || !cartItem.itemCode) && !loading && /* @__PURE__ */ jsx(Alert, { severity: "info", children: "Please select a color" }),
      !!selectedProduct && !selectedProduct?.availableForSale && /* @__PURE__ */ jsx(Alert, { severity: "warning", children: /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("strong", { children: selectedProduct?.name }),
        " is not available for sale."
      ] }) }),
      !selectedProduct?.season && !!selectedProduct?.dateAvailable && /* @__PURE__ */ jsx(Alert, { severity: "warning", children: selectedProduct.dateAvailable }),
      /* @__PURE__ */ jsx(
        RequireLogin,
        {
          fallback: /* @__PURE__ */ jsx(Alert, { severity: "warning", title: "", children: "Please log in to see prices and availability" }),
          children: /* @__PURE__ */ jsx(SelectCustomerAlert, {})
        }
      ),
      /* @__PURE__ */ jsx(ProductPreSeasonAlert, {}),
      /* @__PURE__ */ jsxs(RequireLogin, { children: [
        /* @__PURE__ */ jsx(MissingTaxScheduleAlert, {}),
        isProduct(selectedProduct) && isCartProduct(cartItem) && isBillToCustomer(customerAccount) && selectedProduct.availableForSale && /* @__PURE__ */ jsx(
          AddToCartForm,
          {
            quantity,
            cartItem,
            setActiveCart: true,
            unitOfMeasure: cartItem.salesUM ?? "EA",
            disabled: !customerAccount?.TaxSchedule,
            onChangeQuantity: setQuantity,
            comment: "",
            afterAddToCart: setCartMessage
          }
        ),
        /* @__PURE__ */ jsx(Collapse, { in: !!cartMessage, children: /* @__PURE__ */ jsx(Alert, { severity: "info", onClose: () => setCartMessage(null), children: cartMessage }) }),
        /* @__PURE__ */ jsx(CartItemDetail, { cartItem, msrp: [selectedProduct?.msrp] })
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      isProduct(product) && !!product.description && /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(HTMLContent, { html: product.description }) }),
      isProduct(product) && !!product.details && /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
        /* @__PURE__ */ jsx("h3", { children: "Features" }),
        /* @__PURE__ */ jsx(HTMLContent, { html: product.details })
      ] })
    ] })
  ] }) }) });
};
const ProductRouter = () => {
  const dispatch = useAppDispatch();
  const keywords = useAppSelector(selectKeywordsList);
  const keywordsLoading = useAppSelector(selectKeywordsLoading);
  const { category, product } = useParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(null);
  useEffect(() => {
    if (!keywords.length && !keywordsLoading) {
      dispatch(loadKeywords());
    }
  }, []);
  useEffect(() => {
    let keyword2 = null;
    if (!!category && !product) {
      const [kw] = keywords.filter((kw2) => kw2.keyword === category);
      if (kw) {
        keyword2 = { ...kw };
      }
    } else if (product) {
      const [kw] = keywords.filter((kw2) => kw2.keyword === product);
      if (kw) {
        keyword2 = { ...kw };
      }
    }
    if (!keyword2) {
      navigate("/products/all", { replace: true });
      return;
    }
    if (keyword2.redirect_to_parent > 0) {
      const [kw] = keywords.filter((kw2) => kw2.pagetype === "product").filter((kw2) => kw2.id === keyword2.redirect_to_parent);
      console.debug(keyword2, kw);
      if (kw) {
        const path2 = generatePath(PATH_PRODUCT, {
          category: kw.parent ? kw.parent : kw.keyword,
          product: kw.parent ? kw.keyword : ""
        });
        const state = { variant: keyword2.keyword };
        navigate(path2, { state, replace: true });
        return;
      }
    }
    setKeyword(keyword2);
  }, [category, product, keywords]);
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs(Box, { children: [
    keywordsLoading && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate", title: "Loading Keywords" }),
    keyword?.pagetype === "category" && /* @__PURE__ */ jsx(CategoryPage, { keyword: keyword.keyword }),
    keyword?.pagetype === "product" && /* @__PURE__ */ jsx(ProductPage, { keyword: keyword.keyword })
  ] }) });
};
const StoreMapToggle = ({ checked, onChange, readOnly }) => {
  return /* @__PURE__ */ jsx(FormGroup, { children: /* @__PURE__ */ jsx(
    FormControlLabel,
    {
      control: /* @__PURE__ */ jsx(Checkbox, { checked: checked ?? false, onChange, slotProps: { input: { readOnly } } }),
      label: "Show on CHUMS.COM Store Map?"
    }
  ) });
};
const Address = ({ address, className }) => {
  return /* @__PURE__ */ jsxs("address", { className: classNames(className), children: [
    /* @__PURE__ */ jsx("div", { children: address.CustomerName ?? "" }),
    !!address.AddressLine1 && /* @__PURE__ */ jsx("div", { children: address.AddressLine1 }),
    !!address.AddressLine2 && /* @__PURE__ */ jsx("div", { children: address.AddressLine2 }),
    !!address.AddressLine3 && /* @__PURE__ */ jsx("div", { children: address.AddressLine3 }),
    /* @__PURE__ */ jsxs("div", { children: [
      address.City ?? "",
      ",",
      " ",
      address.State ?? "",
      " ",
      address.ZipCode ?? ""
    ] }),
    !["USA", "US"].includes((address.CountryCode ?? "").toUpperCase()) && /* @__PURE__ */ jsx("div", { children: address.CountryCode ?? "" })
  ] });
};
const ReloadCustomerButton = ({ type, onClick, disabled, ...rest }) => {
  const dispatch = useAppDispatch();
  const currentCustomer = useAppSelector(selectCustomerAccount);
  const clickHandler = () => {
    dispatch(loadCustomer(currentCustomer));
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      type: type ?? "button",
      variant: "text",
      onClick: onClick ?? clickHandler,
      disabled: disabled ?? !currentCustomer,
      ...rest,
      children: "Reload"
    }
  );
};
const TelephoneFormFields = ({ account, readOnly, onChange }) => {
  const changeHandler = (field) => (ev) => {
    onChange({ [field]: ev.target.value });
  };
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        label: "Telephone",
        variant: "filled",
        fullWidth: true,
        size: "small",
        type: "telephone",
        onChange: changeHandler("TelephoneNo"),
        value: account.TelephoneNo ?? "",
        slotProps: {
          htmlInput: { maxLength: 17, autoComplete: "tel", readOnly }
        }
      }
    ),
    /* @__PURE__ */ jsx(
      TextField,
      {
        label: "Extension",
        variant: "filled",
        fullWidth: true,
        size: "small",
        type: "telephone",
        onChange: changeHandler("TelephoneExt"),
        value: account.TelephoneExt ?? "",
        slotProps: {
          htmlInput: { maxLength: 17, autoComplete: "tel-extension", readOnly }
        }
      }
    )
  ] });
};
const BillToForm = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectCustomerAccount);
  const loading = useAppSelector(selectCustomerLoadStatus);
  const canEdit = useAppSelector(selectCanEdit);
  const permissions = useAppSelector(selectCustomerPermissions);
  const [customer, setCustomer] = useState(current ?? null);
  const [emailAddresses, setEmailAddresses] = useState(current?.EmailAddress?.split(";")?.map((email) => email.trim()) ?? [""]);
  useEffect(() => {
    if (isBillToCustomer(current)) {
      setCustomer({ ...current });
      setEmailAddresses(current?.EmailAddress?.split(";")?.map((email) => email.trim()) ?? [""]);
    } else {
      setCustomer(null);
    }
  }, [current]);
  const changeHandler = (arg) => {
    if (customer) {
      setCustomer({ ...customer, ...arg, changed: true });
    }
  };
  const fieldChangeHandler = (field) => (ev) => {
    switch (field) {
      case "Reseller":
        return changeHandler({ [field]: ev.target.checked ? "Y" : "N" });
      default:
        changeHandler({ [field]: ev.target.value });
    }
  };
  const emailChangeHandler = (index) => (ev) => {
    if (!customer) {
      return;
    }
    const email = [...emailAddresses];
    if (email[index] !== void 0) {
      email[index] = ev.target.value;
    }
    setEmailAddresses(email);
    setCustomer({ ...customer, EmailAddress: email.join(";") });
  };
  const addEmailAddressHandler = (after) => {
    if (!customer) {
      return;
    }
    const email = emailAddresses.toSpliced(after + 1, 0, "");
    setEmailAddresses(email);
    setCustomer({ ...customer, EmailAddress: email.join(";") });
  };
  const removeEmailAddressHandler = (index) => {
    if (!customer) {
      return;
    }
    if (emailAddresses[index] !== void 0) {
      const email = emailAddresses.filter((_, _index) => _index !== index);
      if (email.length === 0) {
        email.push("");
      }
      setEmailAddresses(email);
      setCustomer({ ...customer, EmailAddress: email.join(";") });
    }
  };
  const submitHandler = (ev) => {
    ev.preventDefault();
    if (!customer) {
      return;
    }
    dispatch(saveBillingAddress(customer));
  };
  if (!current || !customer) {
    return null;
  }
  if (!permissions?.billTo) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { children: "Billing Address" }),
      /* @__PURE__ */ jsx(Address, { address: current })
    ] });
  }
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { children: [
    loading === "loading" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
    /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsx(
        TextField,
        {
          variant: "filled",
          label: "Account Number",
          fullWidth: true,
          size: "small",
          type: "text",
          value: longCustomerNo(customer) || "",
          slotProps: {
            htmlInput: { readOnly: true }
          }
        }
      ) }),
      /* @__PURE__ */ jsxs(Grid, { size: { xs: 12, sm: 6 }, children: [
        customer.ParentCustomerNo && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Typography, { variant: "subtitle1", component: "h3", children: "Billing Customer" }),
          /* @__PURE__ */ jsxs(Box, { sx: { mb: 1 }, children: [
            /* @__PURE__ */ jsxs(Typography, { variant: "h5", sx: {
              display: "inline",
              mr: 3
            }, children: [
              customer.ParentDivisionNo,
              "-",
              customer.ParentCustomerNo
            ] }),
            /* @__PURE__ */ jsx(Typography, { variant: "h5", sx: {
              display: "inline",
              fontWeight: 300
            }, children: customer.ParentCustomerName })
          ] }),
          /* @__PURE__ */ jsx(Address, { address: {
            CustomerName: "",
            AddressLine1: customer.ParentAddressLine1 ?? "",
            AddressLine2: customer.ParentAddressLine2 ?? "",
            AddressLine3: customer.ParentAddressLine3 ?? "",
            City: customer.ParentCity ?? "",
            State: customer.ParentState ?? "",
            ZipCode: customer.ParentZipCode ?? "",
            CountryCode: customer.ParentCountryCode ?? ""
          } })
        ] }),
        !customer.ParentCustomerNo && /* @__PURE__ */ jsx(
          TextField,
          {
            variant: "filled",
            label: "Payment Terms",
            fullWidth: true,
            size: "small",
            type: "text",
            value: filteredTermsCode(customer.TermsCode)?.description ?? "",
            slotProps: {
              htmlInput: { readOnly: true }
            }
          }
        )
      ] })
    ] }),
    !customer.TaxSchedule && /* @__PURE__ */ jsx(MissingTaxScheduleAlert, {}),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsxs(Typography, { variant: "h3", component: "h3", children: [
      customer.ParentCustomerNo && /* @__PURE__ */ jsx("span", { children: "Sold-To Contact & Address" }),
      !customer.ParentCustomerNo && /* @__PURE__ */ jsx("span", { children: "Billing Contact & Address" })
    ] }),
    /* @__PURE__ */ jsx("form", { onSubmit: submitHandler, children: /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsx(
        AddressFormFields,
        {
          address: customer,
          addressType: "billing",
          readOnly: !canEdit,
          onChange: changeHandler
        }
      ) }),
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 1, children: [
        /* @__PURE__ */ jsx(
          StoreMapToggle,
          {
            checked: customer.Reseller === "Y",
            onChange: fieldChangeHandler("Reseller"),
            readOnly: !canEdit
          }
        ),
        emailAddresses.map((email, index) => /* @__PURE__ */ jsx(
          TextField,
          {
            variant: "filled",
            label: "Email Address",
            fullWidth: true,
            size: "small",
            type: "email",
            value: email,
            onChange: emailChangeHandler(index),
            slotProps: {
              htmlInput: {
                readOnly: !canEdit,
                maxLength: 250 - emailAddresses.join(";").length
              },
              input: {
                endAdornment: /* @__PURE__ */ jsxs(InputAdornment, { position: "end", children: [
                  /* @__PURE__ */ jsx(
                    IconButton,
                    {
                      "aria-label": "Add a new email address",
                      disabled: !email || emailAddresses.join(";").length > 240,
                      onClick: () => addEmailAddressHandler(index),
                      children: /* @__PURE__ */ jsx(AddIcon, {})
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    IconButton,
                    {
                      "aria-label": "Add a new email address",
                      onClick: () => removeEmailAddressHandler(index),
                      disabled: index === 0,
                      children: /* @__PURE__ */ jsx(RemoveIcon, {})
                    }
                  )
                ] })
              }
            }
          },
          index
        )),
        /* @__PURE__ */ jsx(TelephoneFormFields, { account: customer, onChange: changeHandler, readOnly: !canEdit }),
        customer.changed && /* @__PURE__ */ jsx(Alert, { severity: "warning", title: "Hey!", children: "Don't forget to save your changes." }),
        /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, sx: { my: 3 }, justifyContent: "flex-end", children: [
          /* @__PURE__ */ jsx(ReloadCustomerButton, {}),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "contained", disabled: !canEdit || loading !== "idle", children: "Save" })
        ] })
      ] }) })
    ] }) })
  ] }) });
};
const fieldReMapper = {
  CustomerName: "ShipToName",
  AddressLine1: "ShipToAddress1",
  AddressLine2: "ShipToAddress2",
  AddressLine3: "ShipToAddress3",
  City: "ShipToCity",
  State: "ShipToState",
  CountryCode: "ShipToCountryCode",
  ZipCode: "ShipToZipCode"
};
const toCustomerAddress = (shipTo) => {
  return {
    CustomerName: shipTo.ShipToName ?? "",
    AddressLine1: shipTo.ShipToAddress1,
    AddressLine2: shipTo.ShipToAddress2,
    AddressLine3: shipTo.ShipToAddress3,
    City: shipTo.ShipToCity,
    State: shipTo.ShipToState,
    CountryCode: shipTo.ShipToCountryCode,
    ZipCode: shipTo.ShipToZipCode
  };
};
const getShipToField = (field) => {
  return fieldReMapper[field];
};
const ShipToAddressFormFields = ({ address, onChange, readOnly }) => {
  const changeHandler = (arg) => {
    const change = {};
    Object.keys(arg).forEach((key) => {
      change[getShipToField(key)] = arg[key] ?? "";
    });
    onChange(change);
  };
  return /* @__PURE__ */ jsx(
    AddressFormFields,
    {
      address: toCustomerAddress(address),
      addressType: "shipping",
      onChange: changeHandler,
      readOnly
    }
  );
};
const convertToAddress = (address) => {
  const {
    ShipToName,
    ShipToAddress1,
    ShipToAddress2,
    ShipToAddress3,
    ShipToCity,
    ShipToState,
    ShipToCountryCode,
    ShipToZipCode
  } = address;
  return {
    CustomerName: ShipToName ?? "",
    AddressLine1: ShipToAddress1,
    AddressLine2: ShipToAddress2,
    AddressLine3: ShipToAddress3,
    City: ShipToCity,
    State: ShipToState,
    ZipCode: ShipToZipCode,
    CountryCode: ShipToCountryCode
  };
};
const DeliveryAddress = ({ address, className }) => {
  return /* @__PURE__ */ jsx(Address, { address: convertToAddress(address), className });
};
const EmailAddressTextField = ({
  value,
  onChange,
  label = "",
  inputProps
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    TextField,
    {
      label,
      variant: "filled",
      fullWidth: true,
      size: "small",
      type: "email",
      value,
      onChange,
      slotProps: {
        input: {
          startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(AlternateEmailIcon, {}) })
        },
        htmlInput: { ...inputProps }
      }
    }
  ) });
};
const splitEmailAddresses = (emailAddress, separator = ";") => {
  if (!emailAddress) {
    return [];
  }
  return emailAddress.split(separator).map((addr) => addr.trim()).filter((addr) => addr !== "");
};
const joinEmailAddresses = (emailAddresses) => {
  return emailAddresses.map((addr) => addr.trim()).filter((addr) => addr !== "").join("; ");
};
const EmailAddressEditor = ({
  value = "",
  allowMultiple,
  maxEmailLength = 50,
  maxMultipleLength = 225,
  label = "Email address",
  required,
  readOnly,
  onChange
}) => {
  const [emailAddresses, setEmailAddresses] = useState(splitEmailAddresses(value));
  useEffect(() => {
    if (allowMultiple) {
      setEmailAddresses([...splitEmailAddresses(value), ""]);
      return;
    }
    setEmailAddresses(splitEmailAddresses(value));
  }, [value]);
  const changeHandler = (index) => (ev) => {
    if (!allowMultiple) {
      return onChange({ EmailAddress: ev.target.value });
    }
    if (emailAddresses[index] === void 0) {
      return;
    }
    const addresses = [...emailAddresses];
    addresses[index] = ev.target.value;
    onChange({ EmailAddress: joinEmailAddresses(addresses) });
  };
  if (allowMultiple) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      emailAddresses.map((addr, index) => {
        const otherLength = emailAddresses.filter((a) => a !== addr).reduce((acc, val) => acc + val.length, 0);
        const maxLength = Math.min(maxEmailLength, Math.max(maxMultipleLength - otherLength, addr.length));
        return /* @__PURE__ */ jsx(
          EmailAddressTextField,
          {
            label,
            value: addr,
            inputProps: {
              readOnly,
              maxLength,
              required: required && index === 0
            },
            onChange: changeHandler(index)
          },
          index
        );
      }),
      /* @__PURE__ */ jsxs(FormHelperText, { children: [
        "Characters remaining: ",
        maxMultipleLength - value.length
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx(
    EmailAddressTextField,
    {
      label,
      inputProps: {
        readOnly,
        maxLength: maxEmailLength,
        required
      },
      value: value ?? "",
      onChange: changeHandler(0)
    }
  );
};
const PrimaryShipToIcon = ({ shipToCode }) => {
  const primaryShipTo = useAppSelector(selectPrimaryShipTo);
  if (shipToCode !== primaryShipTo?.ShipToCode) {
    return null;
  }
  return /* @__PURE__ */ jsx(Tooltip, { title: "Default Ship-To Location", children: /* @__PURE__ */ jsx(LocalShippingIcon, {}) });
};
const PrimaryShipToButton = ({ shipTo, disabled }) => {
  const dispatch = useAppDispatch();
  const primaryShipTo = useAppSelector(selectPrimaryShipTo);
  const permissions = useAppSelector(selectCustomerPermissions);
  const onSetDefaultShipTo = async () => {
    if (permissions?.canSetDefaultShipTo && shipTo && shipTo.ShipToCode !== primaryShipTo?.ShipToCode) {
      await dispatch(setDefaultShipTo(shipTo.ShipToCode));
      dispatch(loadCustomer(shipTo));
    }
  };
  if (!shipTo) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    primaryShipTo?.ShipToCode !== shipTo.ShipToCode && /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        variant: "outlined",
        startIcon: /* @__PURE__ */ jsx(LocalShippingIcon, {}),
        disabled: !permissions?.canSetDefaultShipTo || shipTo.changed || disabled || shipTo.ShipToCode === primaryShipTo?.ShipToCode || !permissions?.billTo,
        onClick: onSetDefaultShipTo,
        children: "Set as default delivery location"
      }
    ),
    primaryShipTo?.ShipToCode === shipTo.ShipToCode && /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsx(PrimaryShipToIcon, { shipToCode: shipTo.ShipToCode }),
      /* @__PURE__ */ jsx(Typography, { variant: "body1", children: "Default delivery location" })
    ] })
  ] });
};
const ShipToForm = () => {
  const dispatch = useAppDispatch();
  const shipToAddresses = useAppSelector(selectPermittedShipToAddresses);
  const loading = useAppSelector(selectCustomerLoadStatus);
  const canEdit = useAppSelector(selectCanEdit);
  const billTo = useAppSelector(selectPermittedBillToAddress);
  const params = useParams();
  const [shipTo, setShipTo] = useState(null);
  const navigate = useNavigate();
  const readOnly = !canEdit;
  useEffect(() => {
    if (loading === "idle") {
      const [shipTo2] = shipToAddresses.filter((row) => row.ShipToCode === params.shipToCode);
      setShipTo(shipTo2 ?? null);
      if (!billTo) {
        dispatch(setShipToCode(shipTo2?.ShipToCode ?? null));
      }
    }
  }, [shipToAddresses, params, loading, billTo]);
  const submitHandler = (ev) => {
    ev.preventDefault();
    if (!shipTo || !canEdit) {
      return;
    }
    dispatch(saveShipToAddress(shipTo));
  };
  const changeHandler = (arg) => {
    if (shipTo) {
      setShipTo({ ...shipTo, ...arg, changed: true });
    }
  };
  const fieldChangeHandler = (field) => (ev) => {
    switch (field) {
      case "Reseller":
        return changeHandler({ [field]: ev.target.checked ? "Y" : "N" });
      default:
        changeHandler({ [field]: ev.target.value });
    }
  };
  const cancelHandler = () => {
    navigate(generatePath("/account/:customerSlug/delivery", { customerSlug: billToCustomerSlug(shipTo) }));
  };
  if (!canEdit) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { children: "Delivery Address" }),
      loading === "loading" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
      shipTo && /* @__PURE__ */ jsx(DeliveryAddress, { address: shipTo })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    loading && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
    shipTo && /* @__PURE__ */ jsxs("form", { onSubmit: submitHandler, children: [
      /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, alignItems: "center", children: [
        /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsx(
          TextField,
          {
            variant: "filled",
            label: "Location Name",
            fullWidth: true,
            size: "small",
            type: "text",
            value: shipTo.ShipToName ?? "",
            onChange: fieldChangeHandler("ShipToName"),
            slotProps: {
              htmlInput: { readOnly }
            }
          }
        ) }),
        /* @__PURE__ */ jsxs(
          Grid,
          {
            size: { xs: 12, sm: 6 },
            style: { display: "flex", alignItems: "center", justifyContent: "space-between" },
            children: [
              /* @__PURE__ */ jsx(
                TextField,
                {
                  variant: "filled",
                  label: "Location Code",
                  size: "small",
                  type: "text",
                  value: shipTo.ShipToCode ?? "",
                  onChange: fieldChangeHandler("ShipToCode"),
                  slotProps: {
                    htmlInput: { readOnly: true }
                  }
                }
              ),
              /* @__PURE__ */ jsx(PrimaryShipToButton, { shipTo, disabled: readOnly || !billTo })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
        /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsx(ShipToAddressFormFields, { address: shipTo, readOnly, onChange: changeHandler }) }),
        /* @__PURE__ */ jsxs(Grid, { size: { xs: 12, sm: 6 }, children: [
          /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 2, children: [
            /* @__PURE__ */ jsx(
              StoreMapToggle,
              {
                checked: shipTo.Reseller === "Y",
                onChange: fieldChangeHandler("Reseller"),
                readOnly
              }
            ),
            /* @__PURE__ */ jsx(
              EmailAddressEditor,
              {
                label: "Email Address",
                readOnly: !canEdit,
                value: shipTo.EmailAddress,
                onChange: changeHandler
              }
            ),
            /* @__PURE__ */ jsx(TelephoneFormFields, { account: shipTo, onChange: changeHandler, readOnly: !canEdit }),
            shipTo.changed && /* @__PURE__ */ jsx(Alert, { severity: "warning", title: "Hey!", children: "Don't forget to save your changes." })
          ] }),
          /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, sx: { my: 3 }, justifyContent: "flex-end", children: [
            /* @__PURE__ */ jsx(Button, { type: "button", onClick: cancelHandler, children: "Cancel" }),
            /* @__PURE__ */ jsx(ReloadCustomerButton, {}),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                variant: "contained",
                disabled: readOnly || loading !== "idle",
                children: "Save"
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
};
const UserIcon = ({ accountType }) => {
  switch (accountType) {
    case 1:
      return /* @__PURE__ */ jsx(PersonIcon, { fontSize: "small" });
    case 2:
      return /* @__PURE__ */ jsx(GroupIcon, { fontSize: "small" });
    case 4:
      return /* @__PURE__ */ jsx(StoreIcon, { fontSize: "small" });
  }
  return /* @__PURE__ */ jsx(ErrorOutlineIcon, { fontSize: "small" });
};
const CustomerPermissionsIcon = ({
  billTo,
  shipToCode,
  accountType
}) => {
  if (billTo) {
    return /* @__PURE__ */ jsx(Tooltip, { title: "Complete Account", children: /* @__PURE__ */ jsx(BusinessIcon, { fontSize: "small", "aria-label": "billing location" }) });
  }
  if (!shipToCode || !shipToCode.length) {
    return /* @__PURE__ */ jsx(Chip, { label: "N/A", color: "warning" });
  }
  const label = shipToCode.length === 1 ? shipToCode[0] : `x ${shipToCode.length}`;
  const colorProp = (accountType2) => {
    switch (accountType2) {
      case 1:
        return { color: "primary" };
      case 2:
        return { color: "info" };
      default:
        return { color: "success" };
    }
  };
  return /* @__PURE__ */ jsx(Tooltip, { title: `Locations: ${shipToCode.length}`, children: /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, children: [
    /* @__PURE__ */ jsx(StoreIcon, { fontSize: "small", "aria-label": "delivery location" }),
    /* @__PURE__ */ jsx(
      Chip,
      {
        label,
        ...colorProp(accountType),
        variant: shipToCode.length === 1 ? "filled" : "outlined",
        size: "small"
      }
    )
  ] }) });
};
const CustomerUserRow = ({
  user,
  selected,
  onClick
}) => {
  return /* @__PURE__ */ jsxs(TableRow, { onClick, selected, children: [
    /* @__PURE__ */ jsx(TableCell, { "aria-label": "user type", children: /* @__PURE__ */ jsx(UserIcon, { accountType: user.accountType }) }),
    /* @__PURE__ */ jsx(TableCell, { children: user.name }),
    /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Link$2, { href: `mailto:${user.email}`, target: "_blank", children: user.email }) }),
    /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
      CustomerPermissionsIcon,
      {
        shipToCode: user.shipToCode,
        billTo: user.billTo,
        accountType: user.accountType
      }
    ) })
  ] }, user.id);
};
const CustomerUserTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectPermittedCustomerUsers);
  const [page, setPage] = useState(0);
  const isEmployee = useAppSelector(selectIsEmployee);
  const match = useMatch(customerUserPath);
  const navigate = useNavigate();
  const sort = useAppSelector(selectCustomerUsersSort);
  const userSelectHandler = (user) => {
    if (match?.params?.customerSlug) {
      navigate(generatePath(customerUserPath, {
        customerSlug: match?.params?.customerSlug,
        id: user.id.toString()
      }));
    }
  };
  const sortChangeHandler = (field) => {
    dispatch(setCustomerUsersSort({ field, ascending: field === sort.field ? !sort.ascending : true }));
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(Table, { size: "small", children: [
      isEmployee && /* @__PURE__ */ jsx("caption", { children: "Only users with explicitly assigned access are shown here." }),
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: "Type" }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
          TableSortLabel,
          {
            active: sort.field === "name",
            direction: sort.ascending ? "asc" : "desc",
            onClick: () => sortChangeHandler("name"),
            children: "Name"
          }
        ) }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
          TableSortLabel,
          {
            active: sort.field === "email",
            direction: sort.ascending ? "asc" : "desc",
            onClick: () => sortChangeHandler("email"),
            children: "Email Address"
          }
        ) }),
        /* @__PURE__ */ jsx(TableCell, { children: "Permissions" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: users.filter((u) => u.id !== 0).slice(page * 10, page * 10 + 10).map((user) => /* @__PURE__ */ jsx(
        CustomerUserRow,
        {
          user,
          onClick: () => userSelectHandler(user),
          selected: user.id.toString() === match?.params.id
        },
        user.id
      )) })
    ] }),
    /* @__PURE__ */ jsx(
      TablePagination,
      {
        component: "div",
        count: users.length,
        onPageChange: (_, page2) => setPage(page2),
        page,
        rowsPerPage: 10
      }
    )
  ] });
};
const AccountUserPermissions = () => {
  const users = useAppSelector(selectCustomerUsers);
  const shipToAddresses = useAppSelector(selectPermittedShipToAddresses);
  const match = useMatch(customerUserPath);
  const [user] = users.filter((u) => u.id.toString() === match?.params?.id);
  if (!user) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h4", component: "h4", children: "Access Permissions" }),
    /* @__PURE__ */ jsxs(Table, { className: "table table-sm", size: "small", children: [
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: "Type" }),
        /* @__PURE__ */ jsx(TableCell, { align: "center", children: "Ship To Code" }),
        /* @__PURE__ */ jsx(TableCell, { children: "Name" }),
        /* @__PURE__ */ jsx(TableCell, { children: "Location" })
      ] }) }),
      /* @__PURE__ */ jsxs(TableBody, { children: [
        user.shipToCode?.length === 0 && /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(BusinessIcon, { "aria-label": "billing locatoin" }) }),
          /* @__PURE__ */ jsx(TableCell, { colSpan: 3, children: "All Locations" })
        ] }),
        shipToAddresses.filter((st) => user.shipToCode?.includes(st.ShipToCode)).map((shipTo) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(StoreIcon, { "aria-label": "delivery location" }) }),
          /* @__PURE__ */ jsx(TableCell, { align: "center", children: shipTo.ShipToCode }),
          /* @__PURE__ */ jsx(TableCell, { children: shipTo.ShipToName }),
          /* @__PURE__ */ jsxs(TableCell, { children: [
            shipTo.ShipToCity,
            ", ",
            shipTo.ShipToState,
            " ",
            shipTo.ShipToCountryCode
          ] })
        ] }, shipTo.ShipToCode))
      ] })
    ] })
  ] });
};
function CustomerUsers() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectCustomerUsersStatus);
  const customerKey2 = useAppSelector(selectCustomerKey$1);
  const reloadHandler = () => {
    dispatch(loadCustomerUsers());
  };
  return /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, sx: { mt: "2" }, children: [
    /* @__PURE__ */ jsxs(Grid, { size: { xs: 12, sm: 6 }, children: [
      /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "space-between", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "h3", component: "h3", children: "User List" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "text",
            onClick: reloadHandler,
            disabled: status !== "idle" || !customerKey2,
            children: "Reload"
          }
        )
      ] }),
      !["idle", "rejected"].includes(status) && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate", sx: { my: 1 } }),
      /* @__PURE__ */ jsx(CustomerUserTable, {})
    ] }),
    /* @__PURE__ */ jsxs(Grid, { size: { xs: 12, sm: 6 }, children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(Divider, { sx: { my: 3 } }),
      /* @__PURE__ */ jsx(AccountUserPermissions, {})
    ] })
  ] });
}
const DataTableHead = ({
  currentSort,
  fields: fields2,
  onChangeSort
}) => {
  const { field, ascending } = currentSort;
  const sortClickHandler = (sortField) => () => {
    if (sortField === field) {
      onChangeSort({ ...currentSort, ascending: !ascending });
      return;
    }
    onChangeSort({ field: sortField, ascending: !ascending });
  };
  return /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx(TableRow, { children: fields2.map((tableField, index) => /* @__PURE__ */ jsxs(
    TableCell,
    {
      align: tableField.align,
      className: classNames(
        typeof tableField.className === "function" ? { [`text-${tableField.align}`]: !!tableField.align } : tableField.className
      ),
      children: [
        !tableField.sortable && /* @__PURE__ */ jsx(Fragment, { children: tableField.title }),
        tableField.sortable && /* @__PURE__ */ jsx(
          TableSortLabel,
          {
            active: currentSort.field === tableField.field,
            direction: currentSort.ascending ? "asc" : "desc",
            onClick: sortClickHandler(tableField.field),
            children: tableField.title
          }
        )
      ]
    },
    index
  )) }) });
};
const DataTableRow = ({
  className,
  rowClassName,
  selected,
  fields: fields2,
  row,
  trRef,
  onClick = noop,
  ...rest
}) => {
  const clickHandler = () => {
    return onClick ? onClick() : noop();
  };
  const _className = typeof rowClassName === "function" ? rowClassName(row) : rowClassName;
  return /* @__PURE__ */ jsx(
    TableRow,
    {
      ref: trRef,
      className: classNames({ "table-active": selected }, className, _className),
      onClick: clickHandler,
      ...rest,
      children: fields2.map((field, index) => {
        const fieldClassName = typeof field.className === "function" ? field.className(row) : field.className;
        if (typeof field.render === "function") {
          return /* @__PURE__ */ jsx(
            TableCell,
            {
              align: field.align,
              className: classNames(fieldClassName),
              colSpan: field.colSpan,
              children: field.render(row)
            },
            index
          );
        }
        return /* @__PURE__ */ jsx(
          TableCell,
          {
            align: field.align,
            className: classNames(fieldClassName),
            colSpan: field.colSpan,
            children: String(row[field.field] ?? "")
          },
          index
        );
      })
    }
  );
};
const DataTableTBody = ({
  fields: fields2,
  data,
  keyField,
  rowClassName,
  renderRow,
  onSelectRow = noop,
  selected = null,
  children,
  ...rest
}) => {
  return /* @__PURE__ */ jsxs(TableBody, { ...rest, children: [
    data.map((row) => {
      const keyValue = String(typeof keyField === "function" ? keyField(row) : row[keyField]);
      const isSelected = typeof selected === "function" ? selected(row) : keyValue === (selected ?? false);
      if (renderRow) {
        return renderRow(row);
      }
      return /* @__PURE__ */ jsx(
        DataTableRow,
        {
          onClick: () => onSelectRow(row),
          rowClassName,
          fields: fields2,
          row,
          selected: isSelected
        },
        keyValue
      );
    }),
    children
  ] });
};
const DataTable = ({
  fields: fields2,
  data,
  currentSort,
  onChangeSort,
  keyField,
  rowClassName,
  renderRow,
  onSelectRow,
  selected = null,
  className = "",
  tfoot,
  children,
  ...rest
}) => {
  return /* @__PURE__ */ jsxs(Table, { className, ...rest, children: [
    /* @__PURE__ */ jsx(DataTableHead, { currentSort, fields: fields2, onChangeSort }),
    !!data.length && /* @__PURE__ */ jsx(
      DataTableTBody,
      {
        fields: fields2,
        data,
        keyField,
        rowClassName,
        renderRow,
        onSelectRow,
        selected
      }
    ),
    children,
    tfoot
  ] });
};
function OrdersList({
  list,
  fields: fields2
}) {
  const dispatch = useAppDispatch();
  const sort = useAppSelector(selectOpenOrdersSort);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    setPage(0);
  }, [list, sort]);
  const rowsPerPageChangeHandler = (ev) => {
    setRowsPerPage(+ev.target.value);
    setPage(0);
  };
  const sortChangeHandler = (sort2) => {
    dispatch(setSalesOrderSort(sort2));
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      DataTable,
      {
        keyField: "SalesOrderNo",
        data: list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        fields: fields2,
        currentSort: sort,
        onChangeSort: sortChangeHandler
      }
    ),
    /* @__PURE__ */ jsx(
      TablePagination,
      {
        component: "div",
        count: list.length,
        page,
        rowsPerPage,
        onPageChange: (ev, page2) => setPage(page2),
        onRowsPerPageChange: rowsPerPageChangeHandler,
        showFirstButton: true,
        showLastButton: true
      }
    )
  ] });
}
const getSalesOrderPath = (orderType) => {
  switch (orderType) {
    case "cart":
      return "/account/:customerSlug/carts/:salesOrderNo";
    case "past":
    case "invoice":
      return `/account/:customerSlug/invoices`;
    default:
      return `/account/:customerSlug/orders/:salesOrderNo`;
  }
};
const OrderLink = ({ salesOrderNo, orderType }) => {
  const customer = useAppSelector(selectCustomerKey);
  if (!customer || !salesOrderNo) {
    return null;
  }
  const basePath = getSalesOrderPath(orderType);
  const path2 = generatePath(basePath, {
    customerSlug: customerSlug(customer),
    salesOrderNo
  });
  return /* @__PURE__ */ jsx(Link$2, { component: Link$1, to: path2, children: salesOrderNo });
};
const DateString = ({ date = /* @__PURE__ */ new Date(), format = "MM/DD/YYYY" }) => {
  if (date === null) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: dayjs(date).format(format) });
};
const OrderFilter = ({ value, onChange, children, placeholder, className, id, ...rest }) => {
  const _id = useId();
  if (!id) {
    id = _id;
  }
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "space-between", children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        type: "search",
        value,
        onChange,
        variant: "standard",
        size: "small",
        id,
        fullWidth: true,
        slotProps: {
          input: {
            startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(SearchIcon, {}) })
          },
          htmlInput: { ...rest }
        },
        placeholder: placeholder ?? "Order or PO #",
        className
      }
    ),
    children
  ] });
};
function NoOpenOrdersAlert() {
  const length = useAppSelector(selectOpenOrdersLength);
  if (length > 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(Alert, { severity: "info", children: "There are currently no open orders." });
}
function ShipToCustomerLink({ salesOrder }) {
  const currentCustomer = useAppSelector(selectCustomerAccount);
  if (salesOrder.BillToDivisionNo == currentCustomer?.ARDivisionNo && salesOrder.BillToCustomerNo === currentCustomer?.CustomerNo) {
    return /* @__PURE__ */ jsx(CustomerLink, { customer: salesOrder });
  }
  if (salesOrder.ShipToCode) {
    return `${salesOrder.ARDivisionNo}-${salesOrder.CustomerNo}/${salesOrder.ShipToCode}`;
  }
  return `${salesOrder.ARDivisionNo}-${salesOrder.CustomerNo}`;
}
const openOrderFields = [
  {
    field: "SalesOrderNo",
    title: "Order #",
    render: (so) => /* @__PURE__ */ jsx(OrderLink, { salesOrderNo: so.SalesOrderNo, orderType: "open" }),
    sortable: true
  },
  { field: "ShipToCode", title: "Ship To Code", sortable: true, render: (so) => /* @__PURE__ */ jsx(ShipToCustomerLink, { salesOrder: so }) },
  { field: "ShipToName", title: "Ship To", sortable: true },
  {
    field: "ShipToCity",
    title: "Location",
    sortable: true,
    render: (so) => `${so.ShipToCity}, ${so.ShipToState} ${so.ShipToZipCode}`
  },
  { field: "CustomerPONo", title: "PO #", sortable: true },
  {
    field: "OrderDate",
    title: "Ordered",
    sortable: true,
    render: (so) => /* @__PURE__ */ jsx(DateString, { date: so.OrderDate })
  },
  {
    field: "ShipExpireDate",
    title: " Req. Ship Date",
    sortable: true,
    render: (so) => /* @__PURE__ */ jsx(DateString, { date: so.ShipExpireDate })
  },
  {
    field: "NonTaxableAmt",
    title: "Total",
    render: (so) => numeral(new Decimal(so.NonTaxableAmt).add(so.TaxableAmt)).format("0,0.00"),
    align: "right",
    sortable: true
  }
];
const OpenOrdersList = () => {
  const dispatch = useAppDispatch();
  const customerKey2 = useAppSelector(selectOpenOrdersCustomerKey);
  const currentCustomer = useAppSelector(selectCustomerAccount);
  const shipToCode = useAppSelector(selectCustomerShipToCode);
  const orders = useAppSelector(selectOpenOrdersList);
  const status = useAppSelector(selectOpenOrdersStatus);
  const loaded = useAppSelector(selectOpenOrdersLoaded);
  const filter = useAppSelector(selectOpenOrdersFilter);
  const [list, setList] = useState(orders.filter((so) => !shipToCode || so.ShipToCode === shipToCode));
  useEffect(() => {
    if (status === "idle" && !loaded && !!customerKey2) {
      dispatch(loadOpenOrders(customerKey2));
    }
  }, [status, loaded, customerKey2]);
  useEffect(() => {
    setList(orders.filter((so) => !shipToCode || so.ShipToCode === shipToCode));
  }, [orders, shipToCode]);
  const reloadHandler = () => {
    if (customerKey2) {
      dispatch(loadOpenOrders(customerKey2));
    }
  };
  const onChangeOrderFilter = (ev) => {
    dispatch(setOpenOrdersFilter(ev.target.value));
  };
  if (!currentCustomer || !currentCustomer.CustomerNo) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(OrderFilter, { value: filter, onChange: onChangeOrderFilter, maxLength: 30, children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "text", onClick: reloadHandler, children: "Reload" }) }),
    status === "loading" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate", sx: { mb: 1 } }),
    /* @__PURE__ */ jsx(OrdersList, { list, fields: openOrderFields }),
    /* @__PURE__ */ jsx(NoOpenOrdersAlert, {})
  ] });
};
const PATH_INVOICE = "/account/:customerSlug/invoices/:InvoiceType/:InvoiceNo";
const InvoiceLink = ({ invoice }) => {
  if (!invoice || !invoice.InvoiceNo) {
    return null;
  }
  const { InvoiceNo, InvoiceType } = invoice;
  const customerSlug2 = billToCustomerSlug(invoice);
  const path2 = generatePath(PATH_INVOICE, { customerSlug: customerSlug2, InvoiceType, InvoiceNo });
  return /* @__PURE__ */ jsxs(Link$2, { component: Link$1, to: path2, children: [
    InvoiceNo,
    "-",
    InvoiceType
  ] });
};
const InvoiceListFilter = ({ onReload }) => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectInvoicesSearch);
  const shipTo = useAppSelector(selectInvoicesShipToFilter);
  const showPaid = useAppSelector(selectInvoicesShowPaid);
  const searchChangeHandler = (ev) => {
    dispatch(setInvoicesFilterSearch(ev.target.value));
  };
  const shipToChangeHandler = (shipToCode) => {
    dispatch(setInvoicesFilterShipToCode(shipToCode));
  };
  const prepaidChangeHandler = (ev) => {
    dispatch(setShowPaidInvoices(ev.target.checked));
  };
  return /* @__PURE__ */ jsxs(Grid, { container: true, direction: "row", spacing: 2, children: [
    /* @__PURE__ */ jsx(Grid, { sx: { flex: "1 1 auto" }, children: /* @__PURE__ */ jsx(
      TextField,
      {
        type: "search",
        value: search,
        onChange: searchChangeHandler,
        variant: "standard",
        size: "small",
        label: "Search",
        fullWidth: true,
        slotProps: {
          htmlInput: { maxLength: 30 },
          input: {
            startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(SearchIcon, {}) })
          }
        },
        placeholder: "Invoice or PO #"
      }
    ) }),
    /* @__PURE__ */ jsx(Grid, { sx: { flex: "1 1 auto" }, children: /* @__PURE__ */ jsx(
      ShipToSelect,
      {
        value: shipTo ?? allLocationsValue,
        onChange: shipToChangeHandler,
        variant: "standard",
        allowAllLocations: true
      }
    ) }),
    /* @__PURE__ */ jsx(Grid, { sx: { flex: "1 1 auto" }, children: /* @__PURE__ */ jsx(FormGroup, { children: /* @__PURE__ */ jsx(
      FormControlLabel,
      {
        control: /* @__PURE__ */ jsx(Checkbox, { checked: showPaid, onChange: prepaidChangeHandler }),
        label: "Show paid invoices?"
      }
    ) }) }),
    /* @__PURE__ */ jsx(Grid, { children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "text", onClick: onReload, children: "Reload" }) })
  ] });
};
function NoOpenInvoicesAlert() {
  return /* @__PURE__ */ jsx(Alert, { variant: "outlined", color: "info", sx: { mt: 3 }, children: "No open invoices" });
}
const invoiceFields = [
  {
    field: "InvoiceNo",
    title: "Invoice #",
    render: (invoice) => /* @__PURE__ */ jsx(InvoiceLink, { invoice }),
    sortable: true
  },
  {
    field: "InvoiceDate",
    title: "Invoice Date",
    render: (so) => /* @__PURE__ */ jsx(DateString, { date: so.InvoiceDate }),
    sortable: true
  },
  {
    field: "SalesOrderNo",
    title: "Order #",
    // render: (row) => <OrderLink salesOrderNo={row.SalesOrderNo} orderType="past"/>,
    sortable: true
  },
  { field: "CustomerPONo", title: "PO #", sortable: true },
  { field: "OrderDate", title: "Order Date", render: (so) => /* @__PURE__ */ jsx(DateString, { date: so.OrderDate }), sortable: true },
  {
    field: "ShipToName",
    title: "Ship To",
    className: "hidden-xs",
    sortable: true,
    render: (row) => /* @__PURE__ */ jsxs("span", { children: [
      !!row.ShipToCode && /* @__PURE__ */ jsxs("span", { children: [
        "[",
        row.ShipToCode,
        "]"
      ] }),
      " ",
      row.ShipToName
    ] })
  },
  {
    field: "ShipToCity",
    title: "Location",
    className: "hidden-xs",
    render: (so) => `${so.ShipToCity ?? ""}, ${so.ShipToState ?? ""} ${so.ShipToZipCode ?? ""}`,
    sortable: true
  },
  {
    field: "NonTaxableSalesAmt",
    title: "Total",
    render: (so) => numeral(new Decimal(so.NonTaxableSalesAmt ?? 0).add(so.TaxableSalesAmt ?? 0).sub(so.DiscountAmt ?? 0)).format("($0,0.00)"),
    align: "right",
    sortable: true
  },
  {
    field: "Balance",
    title: "Due",
    className: "right",
    render: (row) => numeral(row.Balance).format("($0,0.00)"),
    sortable: true,
    align: "right"
  },
  {
    field: "InvoiceDueDate",
    title: "Due Date",
    render: (so) => /* @__PURE__ */ jsx(
      DateString,
      {
        date: so.InvoiceDueDate
      }
    ),
    sortable: true
  }
];
const InvoicesList = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectFilteredInvoicesList);
  const limit = useAppSelector(selectInvoicesListLimit);
  const limitReached = useAppSelector(selectInvoicesListLimitReached);
  const offset = useAppSelector(selectInvoicesListOffset);
  const invoiceNo = useAppSelector(selectCurrentInvoiceNo);
  const loaded = useAppSelector(selectInvoicesLoaded);
  const status = useAppSelector(selectInvoicesStatus);
  const showPaidInvoices = useAppSelector(selectInvoicesShowPaid);
  const currentCustomer = useAppSelector(selectCustomerAccount);
  const sort = useAppSelector(selectInvoicesSort);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(LocalStore.getItem(STORE_INVOICES_ROWS_PER_PAGE, 10) ?? 10);
  useEffect(() => {
    if (status === "idle" && !loaded && !!currentCustomer) {
      dispatch(loadInvoices({ key: customerKey(currentCustomer), start: 0, limit }));
      setPage(0);
    }
  }, [currentCustomer, status, loaded]);
  useEffect(() => {
    setPage(0);
  }, [sort]);
  const rowsPerPageChangeHandler = (ev) => {
    const rowsPerPage2 = +(ev.target.value ?? 10);
    if (canStorePreferences()) {
      LocalStore.setItem(STORE_INVOICES_ROWS_PER_PAGE, rowsPerPage2);
    }
    setRowsPerPage(rowsPerPage2);
  };
  const reloadHandler = () => {
    if (!currentCustomer) {
      return;
    }
    dispatch(loadInvoices({ key: currentCustomer, start: 0, limit: 500 }));
    setPage(0);
  };
  const loadMoreHandler = () => {
    if (!currentCustomer || limitReached) {
      return;
    }
    dispatch(loadInvoices({ key: currentCustomer, start: offset + limit, limit }));
  };
  if (!currentCustomer || !currentCustomer.CustomerNo) {
    return null;
  }
  const sortChangeHandler = (sort2) => {
    if (canStorePreferences()) {
      LocalStore.setItem(STORE_INVOICES_SORT, sort2);
    }
    dispatch(setInvoicesSort(sort2));
  };
  return /* @__PURE__ */ jsx(
    ErrorBoundary$1,
    {
      fallback: void 0,
      FallbackComponent: () => /* @__PURE__ */ jsx(Alert, { severity: "error", children: "Sorry, an error occurred" }),
      children: /* @__PURE__ */ jsxs(Box, { children: [
        /* @__PURE__ */ jsx(InvoiceListFilter, { onReload: reloadHandler }),
        status === "loading" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate", sx: { mb: 1 } }),
        loaded && !showPaidInvoices && list.length === 0 && /* @__PURE__ */ jsx(NoOpenInvoicesAlert, {}),
        /* @__PURE__ */ jsx(
          DataTable,
          {
            keyField: (row) => invoiceKey(row),
            data: list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
            selected: invoiceNo,
            fields: invoiceFields,
            currentSort: sort,
            onChangeSort: sortChangeHandler
          }
        ),
        /* @__PURE__ */ jsxs(Box, { display: "flex", justifyContent: "flex-end", children: [
          /* @__PURE__ */ jsx(
            TablePagination,
            {
              component: "div",
              count: list.length,
              page,
              onPageChange: (_, page2) => setPage(page2),
              rowsPerPage,
              onRowsPerPageChange: rowsPerPageChangeHandler,
              showFirstButton: true,
              showLastButton: true
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "text",
              onClick: loadMoreHandler,
              disabled: limitReached || status !== "idle",
              children: "Load More"
            }
          )
        ] })
      ] })
    }
  );
};
const ShipToLink = ({ shipTo, children, ...rest }) => {
  const path2 = generatePath(PATH_CUSTOMER_DELIVERY, {
    customerSlug: billToCustomerSlug(shipTo),
    code: encodeURIComponent(shipTo.ShipToCode)
  });
  return /* @__PURE__ */ jsx(Link$2, { component: NavLink, to: path2, ...rest, children });
};
const fields = [
  {
    field: "ShipToCode",
    title: "Code",
    sortable: true,
    render: (row) => /* @__PURE__ */ jsxs(ShipToLink, { shipTo: row, sx: { display: "flex", alignItems: "center" }, children: [
      /* @__PURE__ */ jsx(Box, { sx: { mr: 1 }, component: "span", children: row.ShipToCode }),
      /* @__PURE__ */ jsx(PrimaryShipToIcon, { shipToCode: row.ShipToCode })
    ] })
  },
  {
    field: "ShipToName",
    title: "Name",
    sortable: true,
    render: (row) => /* @__PURE__ */ jsx(ShipToLink, { shipTo: row, children: row.ShipToName })
  },
  { field: "ShipToAddress1", title: "Address", sortable: true, className: "hidden-xs" },
  { field: "ShipToCity", title: "City", sortable: true, className: "hidden-xs" },
  { field: "ShipToState", title: "State", sortable: true, render: (row) => stateCountry(row), className: "hidden-xs" },
  { field: "ShipToZipCode", title: "Postal Code", sortable: true, className: "hidden-xs" },
  {
    field: "EmailAddress",
    title: "Email",
    sortable: true,
    render: (row) => /* @__PURE__ */ jsx("span", { children: !!row.EmailAddress && /* @__PURE__ */ jsx(Link$2, { href: `mailto:${row.EmailAddress}`, target: "_blank", children: row.EmailAddress }) })
  }
];
const ShipToList = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectSortedShipToList);
  const sort = useAppSelector(selectShipToSort);
  const loading = useAppSelector(selectCustomerLoadStatus);
  const primaryShipTo = useAppSelector(selectPrimaryShipTo);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    setPage(0);
  }, [list, sort, rowsPerPage]);
  const sortChangeHandler = (sort2) => {
    dispatch(setShipToSort(sort2));
  };
  const rowClassName = (row) => {
    return classNames({ "table-primary": row.ShipToCode === primaryShipTo?.ShipToCode });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    loading === "loading" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
    /* @__PURE__ */ jsx(
      DataTable,
      {
        data: list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        rowClassName,
        currentSort: sort,
        onChangeSort: sortChangeHandler,
        fields,
        keyField: "ShipToCode"
      }
    ),
    /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, justifyContent: "end", children: [
      /* @__PURE__ */ jsx(
        TablePagination,
        {
          component: "div",
          count: list.length,
          page,
          onPageChange: (_, page2) => setPage(page2),
          rowsPerPage,
          onRowsPerPageChange: (ev) => setRowsPerPage(+ev.target.value),
          showFirstButton: true,
          showLastButton: true
        }
      ),
      /* @__PURE__ */ jsx(ReloadCustomerButton, {})
    ] })
  ] });
};
const chumsRedBase = "#d0112b";
alpha(chumsRedBase, 0.7);
let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    mode: "light",
    primary: {
      light: "#42a5f5",
      main: "#1976d2",
      dark: "#1565c0"
    },
    secondary: {
      light: "#ba68c8",
      main: "#9c27b0",
      dark: "#7b1fa2"
    },
    chumsRed: theme.palette.augmentColor({
      color: {
        light: "#fe3439",
        main: "#d0112a",
        dark: "#c2001e"
      },
      name: "chumsRed"
    }),
    chumsGrey: theme.palette.augmentColor({
      color: {
        light: "#78787b",
        main: "#454547",
        dark: "#232324"
      },
      name: "chumsGrey"
    }),
    error: {
      light: "#fe3439",
      main: "#d0112a",
      dark: "#c2001e"
    }
  }
});
theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          backgroundColor: "#FFFFFF",
          backgroundSize: "cover",
          minHeight: "100%",
          position: "relative"
        },
        body: {
          minHeight: "100vh",
          "#app": {
            boxSizing: "border-box",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            header: {
              flexGrow: 0,
              flexShrink: 0
            },
            main: {
              flexGrow: 1
            },
            footer: {
              flexGrow: 0,
              flexShrink: 0
            }
          }
        }
      }
    },
    MuiTableFooter: {
      styleOverrides: {
        root: {
          th: {
            fontSize: "1rem",
            fontWeight: 700
          },
          td: {
            fontSize: "1rem",
            fontWeight: 700
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: theme.palette.chumsGrey.main
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          opacity: 0.75,
          color: theme.palette.chumsGrey.dark
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          a: {
            color: theme.palette.common.black
          }
        }
      }
    },
    MuiMenuList: {
      styleOverrides: {
        root: {
          a: {
            color: theme.palette.common.black
          }
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {}
      }
    }
  },
  typography: {
    // fontFamily: [
    //     "Roboto Condensed",
    //     '-apple-system',
    //     'BlinkMacSystemFont',
    //     "Segoe UI",
    //     'Roboto',
    //     "Helvetica Neue",
    //     'Arial',
    //     'sans-serif',
    //     "Apple Color Emoji",
    //     "Segoe UI Emoji",
    //     "Segoe UI Symbol"
    // ].join(','),
    fontSize: 16,
    h1: {
      textTransform: "uppercase",
      fontWeight: 300,
      fontSize: 40
    },
    h2: {
      textTransform: "uppercase",
      fontWeight: 600,
      fontSize: 36
    },
    h3: {
      textTransform: "uppercase",
      fontWeight: 600,
      fontSize: 32
    },
    h4: {
      textTransform: "uppercase",
      fontWeight: 600,
      fontSize: 28
    },
    variantButtonText: {
      fontWeight: 500,
      fontSize: 16
    },
    variantButtonPrice: {
      fontWeight: 300,
      fontSize: 14
    },
    bodyMono: {
      fontWeight: 500,
      fontFamily: ["Roboto Mono", "Monaco", "Consolas", "monospace"].join(",")
    }
  }
});
if (globalThis.window) {
  window.theme = theme;
}
const theme$1 = theme;
const isOutsideLink = /([a-z]+:)*\/\//;
function BannerLinkWrapper({ banner, children, ...rest }) {
  if (!banner.url) {
    return children;
  }
  if (isOutsideLink.test(banner.url)) {
    return /* @__PURE__ */ jsx(Link$2, { href: banner.url, underline: "none", target: "_blank", ...rest, children });
  }
  return /* @__PURE__ */ jsx(Link$2, { component: Link$1, to: banner.url, underline: "none", ...rest, children });
}
const defaultSxProps = {
  backgroundColor: "#333333",
  color: "#FFFFFF",
  minHeight: "10rem",
  padding: "3rem",
  "&:hover": {
    backgroundColor: "var(--chums-red)",
    transition: "ease-in-out 350ms"
  }
};
const TextBanner = ({ banner }) => {
  if (!banner.overlay) {
    return null;
  }
  return /* @__PURE__ */ jsx(BannerLinkWrapper, { banner, children: /* @__PURE__ */ jsx(Box, { sx: { ...defaultSxProps, ...banner.sxProps ?? {} }, children: /* @__PURE__ */ jsx(Typography, { variant: "body1", sx: { ...banner.overlay.sxProps ?? {} }, children: banner.overlay.innerText }) }) });
};
const bannerImagePath = (filename) => `/images/chums/homepage/${filename.replace(/^\//, "")}`;
const StyledImg = styled$1.img`
    width: 100%;
    height: auto;
`;
function ImageBanner({ banner }) {
  if (!banner.image || !banner.image.desktop?.filename && !banner.image.mobile?.filename) {
    return null;
  }
  const defaultSxProps2 = {
    position: !!banner.image.desktop?.overlay || !!banner.image.mobile?.overlay ? "relative" : void 0,
    height: "fit-content"
  };
  const desktopSxProps = {
    position: defaultSxProps2.position === "relative" ? "absolute" : void 0,
    display: { xs: "none", sm: "block" },
    ...banner.image.desktop?.overlaySxProps ?? {}
  };
  const mobileSxProps = {
    position: defaultSxProps2.position === "relative" ? "absolute" : void 0,
    display: { xs: "block", sm: "none" },
    ...banner.image.mobile?.overlaySxProps ?? {}
  };
  const src = bannerImagePath(banner.image.desktop?.filename ?? banner.image.mobile?.filename ?? "");
  return /* @__PURE__ */ jsx(BannerLinkWrapper, { banner, children: /* @__PURE__ */ jsxs(Box, { sx: { ...defaultSxProps2, ...banner.sxProps ?? {} }, children: [
    /* @__PURE__ */ jsxs("picture", { children: [
      banner.image.mobile?.filename && /* @__PURE__ */ jsx(
        "source",
        {
          media: `(max-width: ${banner.image.mobile?.width || 480}px)`,
          width: banner.image.mobile?.width || 480,
          height: banner.image.mobile?.height || 680,
          srcSet: bannerImagePath(banner.image.mobile.filename)
        }
      ),
      banner.image.desktop?.filename && /* @__PURE__ */ jsx(
        "source",
        {
          media: `(min-width: ${(banner.image.mobile?.width || 480) + 1}px)`,
          width: banner.image.desktop?.width || 1600,
          height: banner.image.desktop?.height || 500,
          srcSet: bannerImagePath(banner.image.desktop.filename)
        }
      ),
      /* @__PURE__ */ jsx(StyledImg, { src, alt: banner.image.desktop?.altText || banner.image.mobile?.altText || "" })
    ] }),
    banner.image.desktop?.overlay && /* @__PURE__ */ jsx(Typography, { variant: "body1", sx: desktopSxProps, children: banner.image.desktop?.overlay }),
    banner.image.mobile?.overlay && /* @__PURE__ */ jsx(Typography, { variant: "body1", sx: mobileSxProps, children: banner.image.mobile?.overlay })
  ] }) });
}
const HomeBanner = ({ banner }) => {
  if (banner.overlay && banner.overlay.innerText) {
    return /* @__PURE__ */ jsx(TextBanner, { banner });
  }
  if (banner.image) {
    return /* @__PURE__ */ jsx(ImageBanner, { banner });
  }
  return null;
};
const bannersMaxAge = 1e3 * 60 * 30;
const BannersList = () => {
  const dispatch = useAppDispatch();
  const banners = useAppSelector(selectBannersList);
  const loaded = useAppSelector(selectBannersLoaded);
  const updated = useAppSelector(selectBannersUpdated);
  const now = (/* @__PURE__ */ new Date()).valueOf();
  useEffect(() => {
    if (!loaded) {
      dispatch(loadBanners());
    }
  }, [loaded]);
  useEffect(() => {
    if (now - updated > bannersMaxAge) {
      dispatch(loadBanners());
    }
  }, [now, updated]);
  if (!banners.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(Stack, { direction: "column", spacing: 2, sx: { mb: 2 }, children: banners.map((banner) => /* @__PURE__ */ jsx(HomeBanner, { banner }, banner.id)) });
};
const HomeV2 = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle: documentTitles.home }),
    /* @__PURE__ */ jsx(Typography, { component: "h1", variant: "h1", sx: { textAlign: "center", mb: 3 }, children: "Chums Business-to-Business Website" }),
    /* @__PURE__ */ jsx(BannersList, {})
  ] });
};
const RequestPasswordResetForm = () => {
  const dispatch = useAppDispatch();
  const isResettingPassword = useAppSelector(selectResettingPassword);
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [responseType, setResponseType] = useState(null);
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("/login");
  };
  const submitHandler = async (ev) => {
    ev.preventDefault();
    const res = await dispatch(resetPassword(email));
    if (res.payload) {
      setResponse("If your email address is in our database, we will send you an email to reset your password.");
      setResponseType("success");
    } else {
      setResponseType("warning");
      setResponse("Sorry, An error occurred.");
    }
  };
  return /* @__PURE__ */ jsxs(Container, { maxWidth: "sm", children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h1", component: "h1", sx: { my: 3 }, children: "Chums B2B Portal" }),
    /* @__PURE__ */ jsxs(Box, { component: "form", onSubmit: submitHandler, children: [
      /* @__PURE__ */ jsx(Typography, { component: "h2", variant: "h2", children: "Reset Your Password" }),
      responseType !== "success" && /* @__PURE__ */ jsx(Alert, { severity: "info", sx: { mb: 1 }, children: "If your email address is in our database, we will send you an email to reset your password." }),
      /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 1, children: [
        isResettingPassword && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate", title: "Processing Password Rest Request" }),
        /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center" }, children: [
          /* @__PURE__ */ jsx(AccountCircle, { sx: { color: "action.active", mr: 1 } }),
          /* @__PURE__ */ jsx(
            TextField,
            {
              type: "email",
              fullWidth: true,
              variant: "filled",
              label: "Email",
              value: email,
              onChange: (ev) => setEmail(ev.target.value),
              autoComplete: "username",
              slotProps: {
                inputLabel: { shrink: true }
              },
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, useFlexGap: true, justifyContent: "flex-end", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "text", component: Link$1, to: "/login", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "contained", disabled: responseType === "success", children: "Reset Password" })
        ] })
      ] })
    ] }),
    !!response && /* @__PURE__ */ jsx(Alert, { severity: responseType ?? "info", onClose: cancelHandler, children: response }),
    /* @__PURE__ */ jsx(AccessWarningAlert, {})
  ] });
};
const ChangePasswordPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectUserActionStatus);
  const profile = useAppSelector(selectUserProfile);
  const [alert, setAlert2] = useState(null);
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("/profile");
  };
  const onSetPassword = async (arg) => {
    if (!arg.oldPassword || !arg.newPassword) {
      return;
    }
    const res = await dispatch(changePassword(arg));
    if (isErrorResponse(res.payload)) {
      setAlert2(res.payload.error ?? null);
    } else {
      navigate("/login", { state: "Your password has been updated. Please log in again." });
    }
  };
  return /* @__PURE__ */ jsxs(Container, { maxWidth: "sm", children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle: documentTitles.profileChangePassword }),
    /* @__PURE__ */ jsx(Typography, { component: "h1", variant: "h1", sx: { mb: 5 }, children: "Change Password" }),
    loading !== "idle" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
    /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 2, children: [
      !!alert && /* @__PURE__ */ jsx(Alert, { severity: "warning", title: "Reset password error:", children: alert }),
      /* @__PURE__ */ jsx(
        PasswordForm,
        {
          disabled: !profile || loading !== "idle",
          email: profile?.email,
          onSubmit: onSetPassword,
          onCancel: cancelHandler
        }
      )
    ] })
  ] });
};
function AccountUserNewButton({ disabled, onClick }) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outlined",
      type: "button",
      disabled,
      onClick,
      children: "New User"
    }
  );
}
function ConfirmationDialog({ open, onConfirm, onCancel, children }) {
  const id = useId();
  return /* @__PURE__ */ jsxs(Dialog, { open, onClose: onCancel, "aria-describedby": id, children: [
    /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsx(DialogContentText, { id, children }) }),
    /* @__PURE__ */ jsxs(DialogActions, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: onCancel, children: "Cancel" }),
      /* @__PURE__ */ jsx(Button, { onClick: onConfirm ?? onCancel, children: "Agree" })
    ] })
  ] });
}
const newUser = { id: 0, accessId: 0, name: "", email: "", accountType: 4 };
const EditAccountUserForm = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectCustomerUsers);
  const isEmployee = useAppSelector(selectIsEmployee);
  const isRep = useAppSelector(selectIsRep);
  const match = useMatch(customerUserPath);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [addShipTo, setAddShipTo] = useState(false);
  const [disabledShipTo, setDisabledShipTo] = useState([]);
  const [confirmation, setConfirmation] = useState(null);
  const confirmActionHandler = useRef(null);
  useEffect(() => {
    setAddShipTo(false);
    if (match?.params?.id === "new") {
      setUser({ ...newUser });
      setDisabledShipTo([]);
      return;
    }
    const [user2] = users.filter((u) => u.id.toString() === match?.params?.id);
    if (!user2) {
      setUser(null);
      setDisabledShipTo([]);
      return;
    }
    setUser({ ...user2, shipToCode: [] });
    setDisabledShipTo(user2.shipToCode ?? []);
  }, [match?.params?.id, users]);
  useEffect(() => {
    setCanEdit((isEmployee || isRep) && (user?.accountType === 4 || !user));
  }, [isEmployee, isRep, user]);
  const dialogCancelHandler = () => {
    setConfirmation(null);
  };
  const changeHandler = (field) => (ev) => {
    if (!user) {
      return;
    }
    switch (field) {
      case "email":
        setUser({ ...user, [field]: ev.target.value.trim(), changed: true });
        return;
      case "name":
      case "notes":
        setUser({ ...user, [field]: ev.target.value, changed: true });
        return;
      default:
        return;
    }
  };
  const onSetShipToLocation = (shipToCode) => {
    if (!user) {
      return;
    }
    setUser({ ...user, shipToCode: [shipToCode ?? ""], changed: true });
  };
  const submitHandler = async (ev) => {
    ev.preventDefault();
    if (!user) {
      return;
    }
    await dispatch(saveUser(user));
    setUser(null);
    if (match?.params?.customerSlug) {
      navigate(generatePath(customerUserPath, { customerSlug: match?.params?.customerSlug, id: "" }));
    }
  };
  const newUserHandler = () => {
    setConfirmation(null);
    if (!match?.params?.customerSlug) {
      return;
    }
    navigate(generatePath(customerUserPath, { customerSlug: match.params.customerSlug, id: "new" }));
  };
  const onNewUser = () => {
    if (user?.changed) {
      confirmActionHandler.current = newUserHandler;
      setConfirmation("Do you want to cancel your changes?");
      return;
    }
    newUserHandler();
  };
  const cancelHandler = () => {
    setConfirmation(null);
    setUser(null);
    if (!match?.params?.customerSlug) {
      return;
    }
    navigate(generatePath(customerUserPath, { customerSlug: match.params.customerSlug, id: "" }));
  };
  const onCancel = () => {
    if (user?.changed) {
      confirmActionHandler.current = cancelHandler;
      setConfirmation("Do you want to cancel your changes?");
      return;
    }
    cancelHandler();
  };
  const deleteHandler = async () => {
    if (!user) {
      return;
    }
    setConfirmation(null);
    await dispatch(removeUser(user));
    setUser(null);
    if (!match?.params?.customerSlug) {
      return;
    }
    navigate(generatePath(customerUserPath, { customerSlug: match.params.customerSlug, id: "" }));
  };
  const onDeleteUser = async () => {
    if (!user) {
      return;
    }
    confirmActionHandler.current = deleteHandler;
    setConfirmation(`Are you sure you want to remove ${user?.email}?`);
  };
  if (!user) {
    return /* @__PURE__ */ jsx(AccountUserNewButton, { onClick: newUserHandler, disabled: !(isEmployee || isRep) });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: submitHandler, children: [
    /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 2, children: [
      /* @__PURE__ */ jsxs(Typography, { variant: "h3", component: "h3", children: [
        user.id === 0 && /* @__PURE__ */ jsx("span", { children: "New User" }),
        user.id !== 0 && /* @__PURE__ */ jsx("span", { children: "Update User" })
      ] }),
      user.id === 0 && /* @__PURE__ */ jsx(Alert, { severity: "info", children: "An email will be sent to welcome the new user with links to set a password." }),
      /* @__PURE__ */ jsx(
        TextField,
        {
          type: "text",
          fullWidth: true,
          label: "User Name",
          value: user.name,
          onChange: changeHandler("name"),
          variant: "filled",
          slotProps: {
            htmlInput: { maxLength: 45 },
            input: {
              startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(PersonIcon, {}) })
            }
          },
          disabled: user.accountType !== 4,
          required: true,
          helperText: "Please enter the users full name"
        }
      ),
      /* @__PURE__ */ jsx(
        TextField,
        {
          type: "email",
          fullWidth: true,
          label: "Email Address",
          value: user.email,
          onChange: changeHandler("email"),
          variant: "filled",
          slotProps: {
            htmlInput: { maxLength: 255 },
            input: {
              startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(AlternateEmailIcon, {}) })
            }
          },
          disabled: user.accountType !== 4,
          required: true
        }
      ),
      (user.id === 0 || addShipTo) && /* @__PURE__ */ jsx(
        ShipToSelect,
        {
          label: "Access Permissions",
          disabledShipToLocations: disabledShipTo,
          value: user.shipToCode?.[0] ?? null,
          onChange: onSetShipToLocation
        }
      ),
      user.id === 0 && /* @__PURE__ */ jsx(
        TextField,
        {
          multiline: true,
          fullWidth: true,
          label: "Welcome Message",
          value: user.notes,
          onChange: changeHandler("notes"),
          variant: "filled",
          slotProps: {
            input: {
              startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(NotesIcon, {}) })
            }
          },
          disabled: user.accountType !== 4,
          required: true,
          helperText: "Please enter a welcome message to the new user."
        }
      ),
      /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, children: [
        /* @__PURE__ */ jsx(Button, { type: "submit", variant: "contained", disabled: !canEdit, children: "Save" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "text",
            onClick: onCancel,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "text",
            type: "button",
            disabled: !(isEmployee || isRep) || user?.id === 0,
            onClick: onNewUser,
            children: "New User"
          }
        ),
        !!user.id && user.accountType === 4 && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "text",
            type: "button",
            disabled: !(isEmployee || isRep) || user?.id === 0 || user.billTo,
            onClick: () => setAddShipTo(true),
            children: "New Ship-To Location"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "text",
            color: "error",
            disabled: !canEdit || user.id === 0,
            onClick: onDeleteUser,
            children: "Delete"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ConfirmationDialog,
      {
        open: !!confirmation,
        onConfirm: confirmActionHandler.current,
        onCancel: dialogCancelHandler,
        children: confirmation
      }
    )
  ] });
};
function CartsFilter() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectCartsSearch);
  const customerKey2 = useAppSelector(selectCustomerKey);
  const id = useId();
  const changeHandler = (evt) => {
    dispatch(setCartSearch(evt.target.value));
  };
  const reloadHandler = () => {
    dispatch(loadCarts(customerKey2));
  };
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "space-between", children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        type: "search",
        value: search,
        onChange: changeHandler,
        variant: "standard",
        size: "small",
        id,
        fullWidth: true,
        slotProps: {
          input: {
            startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(SearchIcon, {}) })
          }
        },
        placeholder: "Order or PO #"
      }
    ),
    /* @__PURE__ */ jsx(Button, { variant: "text", onClick: reloadHandler, children: "Reload" })
  ] });
}
const CartButton = ({ cartId }) => {
  const dispatch = useAppDispatch();
  const customerKey2 = useAppSelector(selectCustomerKey);
  const activeCartId = useAppSelector(selectActiveCartId);
  const clickHandler = () => {
    if (customerKey2 && cartId) {
      dispatch(loadCart({ customerKey: customerKey2, cartId, setActiveCart: true }));
    }
  };
  return /* @__PURE__ */ jsxs(
    IconButton,
    {
      color: cartId === activeCartId ? "primary" : "default",
      title: cartId === activeCartId ? "Current Cart" : "Make this the current cart",
      onClick: clickHandler,
      children: [
        cartId !== activeCartId && /* @__PURE__ */ jsx(ShoppingCartOutlinedIcon, {}),
        cartId === activeCartId && /* @__PURE__ */ jsx(ShoppingCartIcon, {})
      ]
    }
  );
};
const cartPath = "/account/:customerSlug/carts/:cartId";
function CartLink({ cartId, children }) {
  const customer = useAppSelector(selectCustomerKey);
  if (!customer || !cartId) {
    return null;
  }
  const path2 = generatePath(cartPath, {
    customerSlug: customer,
    cartId: `${cartId}`
  });
  return /* @__PURE__ */ jsx(Link$2, { component: Link$1, to: path2, children: children ?? cartId });
}
const cartFields = [
  { field: "id", title: "Active Cart", render: (cart) => /* @__PURE__ */ jsx(CartButton, { cartId: cart.id }), sortable: false },
  {
    field: "id",
    title: "Cart #",
    render: (cart) => /* @__PURE__ */ jsx(CartLink, { cartId: cart.id, children: cart.id }),
    sortable: true
  },
  { field: "customerPONo", title: "Cart Name", sortable: true },
  {
    field: "dateCreated",
    title: "Cart Created",
    render: (cart) => /* @__PURE__ */ jsx(DateString, { date: cart.dateCreated }),
    sortable: true
  },
  {
    field: "shipToName",
    title: "Ship To",
    sortable: true,
    render: (cart) => /* @__PURE__ */ jsxs("span", { children: [
      !!cart.shipToCode && /* @__PURE__ */ jsxs("span", { children: [
        "[",
        cart.shipToCode,
        "]"
      ] }),
      " ",
      cart.shipToName
    ] })
  },
  {
    field: "ShipToCity",
    title: "Location",
    render: (cart) => shipToLocation(cart),
    sortable: true
  },
  {
    field: "subTotalAmt",
    title: "Total",
    render: (so) => numeral(new Decimal(so.subTotalAmt)).format("0,0.00"),
    align: "right",
    sortable: true
  }
];
function CartsList() {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectFilteredCarts);
  const sort = useAppSelector(selectCartsSort);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    setPage(0);
  }, [list, sort]);
  const rowsPerPageChangeHandler = (ev) => {
    setRowsPerPage(+ev.target.value);
    setPage(0);
  };
  const sortChangeHandler = (sort2) => {
    dispatch(setCartsSort(sort2));
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      DataTable,
      {
        keyField: "id",
        data: list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        fields: cartFields,
        currentSort: sort,
        onChangeSort: sortChangeHandler
      }
    ),
    /* @__PURE__ */ jsx(
      TablePagination,
      {
        component: "div",
        count: list.length,
        page,
        rowsPerPage,
        onPageChange: (_, page2) => setPage(page2),
        onRowsPerPageChange: rowsPerPageChangeHandler,
        showFirstButton: list.length > rowsPerPage,
        showLastButton: list.length > rowsPerPage
      }
    )
  ] });
}
function NoCartsAlert() {
  const length = useAppSelector(selectCartsLength);
  if (length > 0) {
    return /* @__PURE__ */ jsxs(Alert, { severity: "info", children: [
      /* @__PURE__ */ jsx("strong", { className: "me-1", children: "Hint:" }),
      "Select a cart icon to make it your current cart."
    ] });
  }
  return /* @__PURE__ */ jsx(Alert, { severity: "info", children: "You current have no open carts." });
}
function CartsPage() {
  const dispatch = useAppDispatch();
  const cartsStatus = useAppSelector(selectCartsStatus);
  const customerKey2 = useAppSelector(selectCustomerKey);
  useEffect(() => {
    dispatch(loadCarts(customerKey2));
  }, [customerKey2]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(CartsFilter, {}),
    cartsStatus === "loading" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate", sx: { mb: 1 } }),
    /* @__PURE__ */ jsx(CartsList, {}),
    /* @__PURE__ */ jsx(NoCartsAlert, {})
  ] });
}
function CartSkeleton() {
  return /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 2, children: [
      /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 30 }),
      /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 30 }),
      /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 30 })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 2, children: [
      /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 30 }),
      /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 60 }),
      /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 30 })
    ] }) })
  ] });
}
const emptyShippingAccount = {
  value: "",
  enabled: false
};
const CustomerShippingAccountControl = ({ readOnly = false, shipVia }) => {
  const dispatch = useAppDispatch();
  const [shippingMethod, setShippingMethod] = useState(null);
  const shippingAccount = useAppSelector(selectCartShippingAccount);
  const id = useId();
  const ref = useRef(null);
  useEffect(() => {
    if (shipVia) {
      setShippingMethod(ShippingMethods[shipVia] ?? null);
    } else {
      setShippingMethod(null);
    }
  }, [shipVia]);
  const clickHandler = () => {
    if (readOnly) {
      return;
    }
    const enabled = !shippingAccount?.enabled;
    dispatch(setCartShippingAccount({ ...shippingAccount ?? emptyShippingAccount, enabled }));
    if (enabled && ref.current) {
      ref.current.focus();
    }
  };
  const changeHandler = (ev) => {
    if (readOnly || !shippingAccount?.enabled) {
      return;
    }
    dispatch(setCartShippingAccount({ ...shippingAccount ?? emptyShippingAccount, value: ev.target.value }));
  };
  return /* @__PURE__ */ jsxs(
    FormControl,
    {
      variant: "filled",
      fullWidth: true,
      size: "small",
      error: shippingAccount?.enabled && !shippingAccount.value,
      disabled: !shippingMethod?.allowCustomerAccount || !shippingAccount?.enabled,
      children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: id, children: "Use your shipping account" }),
        /* @__PURE__ */ jsx(
          FilledInput,
          {
            type: "text",
            value: shippingAccount?.enabled ? shippingAccount.value : "",
            onChange: changeHandler,
            inputProps: { readOnly, id, ref, maxLength: 9 },
            startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(
              IconButton,
              {
                "aria-label": "toggle use your shipping account",
                disabled: !shippingMethod?.allowCustomerAccount,
                onClick: clickHandler,
                onMouseDown: (ev) => ev.preventDefault(),
                children: shippingAccount?.enabled ? /* @__PURE__ */ jsx(CheckBoxIcon, {}) : /* @__PURE__ */ jsx(CheckBoxOutlineBlankIcon, {})
              }
            ) })
          }
        )
      ]
    }
  );
};
const cartProgress_Cart = 0;
const cartProgress_Delivery = 1;
const cartProgress_Payment = 2;
const cartProgress_Confirm = 3;
function nextCartProgress(cartProgress) {
  if (cartProgress < cartProgress_Confirm) {
    return cartProgress + 1;
  }
  return cartProgress;
}
function ShipDateInput({
  value,
  onChange,
  inputProps,
  readOnly,
  disabled,
  ref,
  ...formControlProps
}) {
  const nextShipDate = useAppSelector(selectNextShipDate);
  const [min, setMin] = useState(nextShipDate ?? dayjs().add(7, "days").format("YYYY-MM-DD"));
  const [anchorEl, setAnchorEl] = useState(null);
  const id = useId();
  const popoverId = useId();
  useEffect(() => {
    setMin(nextShipDate ?? dayjs().add(7, "days").format("YYYY-MM-DD"));
  }, [nextShipDate]);
  const changeHandler = (ev) => {
    const value2 = ev.target.value;
    if (!dayjs(value2).isValid() || dayjs(value2).isBefore(min)) {
      return onChange(dayjs(min).toISOString());
    }
    onChange(dayjs(value2).toISOString());
  };
  const dateValue = (value2) => {
    if (!dayjs(value2).isValid() || dayjs(value2).isBefore(min)) {
      return dayjs(min).format("YYYY-MM-DD");
    }
    const offset = dayjs(value2).toDate().getTimezoneOffset();
    return dayjs(value2).add(offset, "minutes").format("YYYY-MM-DD");
  };
  const buttonClickHandler = (ev) => {
    setAnchorEl(ev.currentTarget);
  };
  const calendarChangeHandler = (value2) => {
    setAnchorEl(null);
    if (!dayjs(value2).isValid() || dayjs(value2).isBefore(min)) {
      return onChange(dayjs(min).toISOString());
    }
    onChange(dayjs(value2).toISOString());
  };
  return /* @__PURE__ */ jsxs(FormControl, { variant: "filled", fullWidth: true, size: "small", ...formControlProps, children: [
    /* @__PURE__ */ jsx(InputLabel, { htmlFor: id, children: "Requested Ship Date" }),
    /* @__PURE__ */ jsx(
      FilledInput,
      {
        type: "date",
        value: dateValue(value),
        inputRef: ref,
        onChange: changeHandler,
        disabled,
        inputProps: {
          readOnly,
          id,
          ref,
          min: dayjs(min).format("YYYY-MM-DD"),
          max: dayjs(min).add(1, "year").format("YYYY-MM-DD"),
          ...inputProps
        },
        startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(
          IconButton,
          {
            "aria-label": "Show available ship dates",
            onClick: buttonClickHandler,
            children: /* @__PURE__ */ jsx(CalendarMonthIcon, {})
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(Popover, { id: popoverId, open: !!anchorEl, anchorEl, onClose: () => setAnchorEl(null), children: /* @__PURE__ */ jsx(DateCalendar, { value: dayjs(dateValue(value)), onChange: calendarChangeHandler, minDate: dayjs(min) }) })
  ] });
}
function ShippingMethodSelect({
  value,
  onChange,
  readOnly,
  required,
  inputProps,
  ref,
  ...formControlProps
}) {
  const labelId = useId();
  const selectId = useId();
  const changeHandler = (ev) => {
    onChange(ev.target.value);
  };
  return /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, variant: "filled", size: "small", ...formControlProps, required, children: [
    /* @__PURE__ */ jsx(InputLabel, { id: labelId, children: "Ship Method" }),
    /* @__PURE__ */ jsxs(
      Select,
      {
        labelId,
        id: selectId,
        inputRef: ref,
        value,
        onChange: changeHandler,
        inputProps,
        readOnly,
        required,
        children: [
          !readOnly && /* @__PURE__ */ jsx(MenuItem, { value: "", children: "Select Shipping Method" }),
          readOnly && /* @__PURE__ */ jsx(MenuItem, { value: "" }),
          Object.keys(ShippingMethods).filter((key) => ShippingMethods[key].enabled).map((key) => {
            return /* @__PURE__ */ jsx(
              MenuItem,
              {
                value: ShippingMethods[key].code,
                children: ShippingMethods[key].description
              },
              key
            );
          })
        ]
      }
    )
  ] });
}
function SendEmailModal() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectSendEmailStatus);
  const error = useAppSelector(selectSendEmailError);
  const response = useAppSelector(selectSendEmailResponse);
  const [open, setOpen] = useState(status !== "idle");
  useEffect(() => {
    setOpen(status !== "idle");
  }, [status]);
  const onClose = () => {
    dispatch(closeEmailResponse());
  };
  return /* @__PURE__ */ jsxs(Dialog, { onClose, open, maxWidth: "sm", children: [
    /* @__PURE__ */ jsx(DialogTitle, { children: "Sending proposed order email" }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      status === "sending" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
      status === "fulfilled" && /* @__PURE__ */ jsx(LinearProgress, { variant: "determinate", value: 100 }),
      !!error && /* @__PURE__ */ jsx(Alert, { severity: "error", children: error }),
      response && /* @__PURE__ */ jsx("table", { className: "table table-sm", children: /* @__PURE__ */ jsxs("tbody", { children: [
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "From" }),
          /* @__PURE__ */ jsx("td", { children: response.envelope.from })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "To" }),
          /* @__PURE__ */ jsx("td", { children: response.envelope.to.join(", ") })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "Accepted" }),
          /* @__PURE__ */ jsx("td", { children: response.accepted.length ? response.accepted.join(", ") : "-" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "Rejected" }),
          /* @__PURE__ */ jsx("td", { children: response.rejected.length ? response.rejected.join(", ") : "-" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(DialogActions, { children: /* @__PURE__ */ jsx(Button, { onClick: onClose, children: "Close" }) })
  ] });
}
function SendEmailButton({ cartId, onClick, disabled, ...props }) {
  const dispatch = useAppDispatch();
  const customerKey2 = useAppSelector(selectCustomerKey);
  const loadingStatus = useAppSelector((state) => selectCartStatusById(state, cartId));
  const sendEmailHandler = async (ev) => {
    if (!customerKey2) {
      return;
    }
    await dispatch(sendCartEmail({ customerKey: customerKey2, cartId }));
    if (onClick) {
      onClick(ev);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        variant: "text",
        onClick: sendEmailHandler,
        disabled: loadingStatus !== "idle" || disabled,
        ...props,
        children: "Send Email"
      }
    ),
    /* @__PURE__ */ jsx(SendEmailModal, {})
  ] });
}
const NumericTextField = styled(TextField)`
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
function ItemAutocomplete({ cartId }) {
  const dispatch = useAppDispatch();
  const customerKey2 = useAppSelector(selectCustomerKey);
  const results = useAppSelector(selectSearchResults$1);
  const loading = useAppSelector(selectSearchLoading$1);
  const fulfilled = useAppSelector(selectSearchFulfilled);
  const cartStatus = useAppSelector((state) => selectCartStatusById(state, cartId));
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm2] = useDebounceValue(inputValue, 500);
  const [options, setOptions] = useState(results ?? []);
  const addToCartHandler = useCallback(async () => {
    if (!value || !customerKey2 || !quantity) {
      return;
    }
    if (globalThis.window?.gtag) {
      globalThis.window.gtag("event", "add_to_cart", {
        items: [{ item_id: value.ItemCode, item_name: value.ItemCodeDesc ?? value.ItemCode, quantity }]
      });
    }
    await dispatch(addToCart({
      cartId,
      customerKey: customerKey2,
      item: {
        itemCode: value.ItemCode,
        itemType: "1",
        unitOfMeasure: value.SalesUnitOfMeasure,
        quantityOrdered: quantity,
        commentText: ""
      }
    }));
  }, [value, customerKey2, quantity]);
  useEffect(() => {
    setOptions(results ?? []);
  }, [results]);
  useEffect(() => {
    setSearchTerm2(inputValue);
  }, [inputValue]);
  useEffect(() => {
    dispatch(loadItemLookup(searchTerm));
  }, [searchTerm]);
  const changeHandler = (_, newValue) => {
    setValue(newValue);
  };
  const inputChangeHandler = (_, value2) => {
    setInputValue(value2);
  };
  const quantityChangeHandler = (ev) => {
    const qty = +ev.target.value;
    setQuantity(Math.max(qty, 1));
  };
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 1, children: [
    /* @__PURE__ */ jsx(
      Autocomplete,
      {
        size: "small",
        sx: { width: 300, display: "inline-block" },
        renderInput: (params) => /* @__PURE__ */ jsx(
          TextField,
          {
            ...params,
            variant: "filled",
            size: "small",
            label: "Search Items",
            fullWidth: true,
            slotProps: {
              input: {
                ...params.InputProps,
                endAdornment: /* @__PURE__ */ jsxs(Fragment, { children: [
                  loading && /* @__PURE__ */ jsx(CircularProgress, { color: "inherit", size: 20 }),
                  params.InputProps.endAdornment
                ] })
              }
            }
          }
        ),
        inputValue,
        onInputChange: inputChangeHandler,
        isOptionEqualToValue: (option, value2) => option.ItemCode === value2.ItemCode,
        options,
        noOptionsText: fulfilled ? "Item Not Found" : null,
        blurOnSelect: true,
        getOptionLabel: (option) => option.ItemCode,
        filterOptions: (x) => x,
        onChange: changeHandler,
        renderOption: (props, option) => {
          const src = CONTENT_PATH_SEARCH_IMAGE.replace(":image", encodeURIComponent(option.filename ?? "missing.png"));
          return /* @__PURE__ */ createElement("li", { ...props, key: option.ItemCode }, /* @__PURE__ */ jsxs("div", { className: "search-result row g-3", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: !!option.filename && /* @__PURE__ */ jsx(
              "img",
              {
                src,
                alt: option.ItemCodeDesc ?? option.ItemCode,
                className: "img-fluid"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "col", children: [
              /* @__PURE__ */ jsx("div", { children: option.ItemCode }),
              !!option.ItemCodeDesc && /* @__PURE__ */ jsx("div", { className: "text-muted small", children: option.ItemCodeDesc })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: option.SalesUnitOfMeasure ?? "EA" })
          ] }));
        },
        value
      }
    ),
    /* @__PURE__ */ jsx(
      NumericTextField,
      {
        size: "small",
        variant: "filled",
        type: "number",
        inputProps: { inputMode: "numeric", min: 1, pattern: "[0-9]*", maxLength: 4 },
        label: "Quantity",
        value: quantity,
        onChange: quantityChangeHandler,
        InputProps: {
          endAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "end", children: value?.SalesUnitOfMeasure ?? "EA" })
        }
      }
    ),
    /* @__PURE__ */ jsx(
      AddToCartButton,
      {
        disabled: !quantity || !value || cartStatus !== "idle",
        type: "button",
        size: "small",
        color: "primary",
        fullWidth: false,
        onClick: addToCartHandler
      }
    ),
    /* @__PURE__ */ jsx("div", {})
  ] });
}
function CartPaymentSelect({
  value,
  onChange,
  readOnly,
  required,
  inputProps,
  ref,
  ...formControlProps
}) {
  const id = useId();
  const paymentCards = useAppSelector(selectActiveCustomerPaymentCards);
  const customerPaymentCardTypes = paymentCards.filter((cc) => PAYMENT_TYPES[cc.PaymentType]?.allowCC && !PAYMENT_TYPES[cc.PaymentType].disabled).map((cc) => {
    const paymentType = PAYMENT_TYPES[cc.PaymentType];
    return {
      ...paymentType,
      code: `${paymentType.code}:${cc.CreditCardID}`,
      customerValue: cc.CreditCardID
    };
  });
  const genericPaymentTypes = Object.values(PAYMENT_TYPES).filter((pt) => !pt.disabled && !pt.allowCC);
  const changeHandler = (ev) => {
    onChange(ev.target.value);
  };
  return /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, variant: "filled", size: "small", ...formControlProps, required, children: [
    /* @__PURE__ */ jsx(InputLabel, { id, children: "Payment Method" }),
    /* @__PURE__ */ jsxs(
      Select,
      {
        onChange: changeHandler,
        value: value ?? "",
        ref,
        labelId: id,
        readOnly,
        required,
        inputProps,
        variant: "filled",
        children: [
          /* @__PURE__ */ jsx(MenuItem, { value: "" }),
          customerPaymentCardTypes.map((pt) => /* @__PURE__ */ jsxs(MenuItem, { value: pt.code, children: [
            pt.description,
            " [",
            pt.customerValue,
            "]"
          ] }, pt.code)),
          genericPaymentTypes.map((pt) => /* @__PURE__ */ jsx(MenuItem, { value: pt.code, children: pt.description }, pt.code))
        ]
      }
    ),
    PAYMENT_TYPES[value]?.message && /* @__PURE__ */ jsx(FormHelperText, { children: PAYMENT_TYPES[value]?.message })
  ] });
}
const cartProgressLabels = ["Cart", "Shipping & Delivery", "Payment", "Confirm Checkout"];
function CartCheckoutProgress({ current, disabled, onChange }) {
  const id = useId();
  const levels = 4;
  const progress = current / (cartProgress_Confirm + 1);
  const value = progress * 100 + 100 / levels / 2;
  const changeHandler = (next) => {
    if (!disabled) {
      onChange(next);
    }
  };
  return /* @__PURE__ */ jsxs(Box, { sx: { width: "100%", mb: 1, mt: 2 }, children: [
    /* @__PURE__ */ jsx(Box, { "aria-label": `Checkout Progress: ${cartProgressLabels[progress]}`, id, children: /* @__PURE__ */ jsx(LinearProgress, { variant: "determinate", value, "aria-labelledby": id }) }),
    /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 1, children: [
      /* @__PURE__ */ jsx(Grid, { size: 3, sx: { textAlign: "center" }, children: /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          size: "small",
          disabled,
          onClick: () => changeHandler(cartProgress_Cart),
          children: "Cart"
        }
      ) }),
      /* @__PURE__ */ jsx(Grid, { size: 3, sx: { textAlign: "center" }, children: /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          disabled: disabled || current < cartProgress_Delivery,
          size: "small",
          onClick: () => changeHandler(cartProgress_Delivery),
          children: "Shipping & Delivery"
        }
      ) }),
      /* @__PURE__ */ jsx(Grid, { size: 3, sx: { textAlign: "center" }, children: /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          disabled: disabled || current < cartProgress_Payment,
          size: "small",
          onClick: () => changeHandler(cartProgress_Payment),
          children: "Payment"
        }
      ) }),
      /* @__PURE__ */ jsx(Grid, { size: 3, sx: { textAlign: "center" }, children: /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          disabled: disabled || current < cartProgress_Confirm,
          size: "small",
          onClick: () => changeHandler(cartProgress_Confirm),
          children: "Confirm"
        }
      ) })
    ] })
  ] });
}
function DeleteCartButton({
  customerKey: customerKey2,
  cartId,
  disabled,
  children,
  ...rest
}) {
  const dispatch = useAppDispatch();
  const header = useAppSelector((state) => selectCartHeaderById(state, cartId));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const confirmHandler = useCallback(async () => {
    if (!header || !customerKey2) {
      return;
    }
    setBusy(true);
    await dispatch(removeCart({ customerKey: customerKey2, cartId: header.id, salesOrderNo: header.salesOrderNo }));
    setOpen(false);
    setBusy(false);
    const path2 = generatePath("/account/:customerSlug/carts", {
      customerSlug: customerKey2
    });
    navigate(path2, { replace: true });
  }, [header, customerKey2]);
  const clickHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => setOpen(false);
  if (!header || !customerKey2) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        variant: "text",
        color: "error",
        onClick: clickHandler,
        disabled,
        ...rest,
        children: children ?? "Delete Cart"
      }
    ),
    /* @__PURE__ */ jsxs(Dialog, { onClose: closeHandler, open, maxWidth: "sm", children: [
      /* @__PURE__ */ jsxs(DialogTitle, { children: [
        "Delete Cart #",
        header.id
      ] }),
      /* @__PURE__ */ jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsxs(DialogContentText, { children: [
          "Are you sure you want to delete cart ",
          /* @__PURE__ */ jsx("strong", { children: header.customerPONo }),
          "?"
        ] }),
        busy && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" })
      ] }),
      /* @__PURE__ */ jsxs(DialogActions, { children: [
        /* @__PURE__ */ jsx(Button, { onClick: confirmHandler, disabled: busy, color: "error", children: "Delete" }),
        /* @__PURE__ */ jsx(Button, { onClick: closeHandler, disabled: busy, autoFocus: true, children: "Cancel" })
      ] })
    ] })
  ] });
}
function CheckoutButton({ cartProgress, type, ...buttonProps }) {
  const buttonText = () => {
    switch (cartProgress) {
      case cartProgress_Cart:
        return "Begin Checkout";
      case cartProgress_Delivery:
        return "Confirm Delivery & Shipping";
      case cartProgress_Payment:
        return "Confirm Payment";
      default:
        return "Submit Order";
    }
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      type: type ?? "button",
      variant: cartProgress === cartProgress_Confirm ? "contained" : "outlined",
      ...buttonProps,
      children: buttonText()
    }
  );
}
function CartCommentInput({ cartId, disabled }) {
  const dispatch = useAppDispatch();
  const customerKey2 = useAppSelector(selectCustomerKey);
  const [text, setText] = useState("");
  useEffect(() => {
    setText("");
  }, [cartId]);
  const saveHandler = async () => {
    if (!customerKey2 || !text.trim()) {
      return;
    }
    await dispatch(addToCart({
      customerKey: customerKey2,
      cartId,
      item: {
        itemType: "4",
        itemCode: "/C",
        commentText: text.trim(),
        quantityOrdered: 0,
        unitOfMeasure: null
      }
    }));
    setText("");
  };
  return /* @__PURE__ */ jsxs(Stack, { spacing: 1, direction: "row", sx: { flex: "1 1 auto" }, children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        label: "Add Cart Comment",
        value: text,
        onChange: (ev) => setText(ev.target.value),
        variant: "filled",
        size: "small",
        multiline: true,
        fullWidth: true
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        color: "primary",
        variant: "text",
        type: "button",
        size: "small",
        onClick: saveHandler,
        disabled: !text || disabled,
        children: "Save"
      }
    )
  ] });
}
function CartOrderHeader() {
  const dispatch = useAppDispatch();
  const customerKey2 = useAppSelector(selectCustomerKey);
  const currentCartId = useAppSelector(selectActiveCartId);
  const header = useAppSelector((state) => selectCartHeaderById(state, currentCartId));
  const detail = useAppSelector((state) => selectCartDetailById(state, currentCartId));
  const loadingStatus = useAppSelector((state) => selectCartStatusById(state, currentCartId));
  const shipDateRef = useRef(null);
  const shipMethodRef = useRef(null);
  const paymentMethodRef = useRef(null);
  const customerPORef = useRef(null);
  const navigate = useNavigate();
  const detailChanged = useAppSelector((state) => selectCartHasChanges(state, currentCartId));
  const shippingAccount = useAppSelector(selectCartShippingAccount);
  const nextShipDate = useAppSelector(selectNextShipDate);
  const [cartHeader, setCartHeader] = useState(header);
  const [cartProgress, setCartProgress] = useState(cartProgress_Cart);
  const promoteCart = useCallback(async () => {
    if (!cartHeader) {
      return;
    }
    const response = await dispatch(processCart(cartHeader));
    console.log("promoteCart", response);
    if (response.payload && typeof response.payload === "string") {
      navigate(generatePath("/account/:customerSlug/orders/:salesOrderNo", {
        customerSlug: customerKey2,
        salesOrderNo: response.payload
      }), { replace: true });
      return;
    }
    navigate(generatePath("/account/:customerSlug/carts", {
      customerSlug: customerKey2
    }), { replace: true });
  }, [dispatch, cartHeader, shippingAccount, customerKey2, navigate]);
  useEffect(() => {
    if (loadingStatus !== "idle") {
      setCartProgress(cartProgress_Cart);
    }
  }, [loadingStatus]);
  useEffect(() => {
    dispatch(loadNextShipDate());
  }, []);
  const validateForm = (cartProgress2) => {
    if (!cartHeader) {
      return cartProgress_Cart;
    }
    if (cartProgress2 >= cartProgress_Cart) {
      const shipExpireDate = dayjs(cartHeader.shipExpireDate);
      if (!cartHeader.shipExpireDate || !shipExpireDate.isValid() || shipExpireDate.isBefore(nextShipDate)) {
        shipDateRef.current?.focus();
        return cartProgress_Delivery;
      }
      if (!cartHeader.shipVia) {
        shipMethodRef.current?.focus();
        return cartProgress_Delivery;
      }
    }
    if (cartProgress2 >= cartProgress_Delivery) {
      if (!cartHeader.PaymentType) {
        paymentMethodRef.current?.focus();
        return cartProgress_Payment;
      }
      if (!cartHeader.customerPONo) {
        customerPORef.current?.focus();
        return cartProgress_Payment;
      }
    }
    return nextCartProgress(cartProgress2);
  };
  useEffect(() => {
    if (!header) {
      setCartHeader(null);
      return;
    }
    setCartHeader({ ...header, shipExpireDate: nextShipDate ?? dayjs().add(7, "days").format("YYYY-MM-DD") });
  }, [header, nextShipDate]);
  if (!customerKey2 || !header || !cartHeader) {
    return null;
  }
  const orderDate = dayjs(cartHeader.dateCreated).format("YYYY-MM-DD");
  const changeHandler = (field) => (ev) => {
    switch (field) {
      case "customerPONo":
      case "promoCode":
        setCartHeader({ ...cartHeader, [field]: ev.target.value, changed: true });
        return;
      case "CancelReasonCode":
        setCartHeader({ ...cartHeader, [field]: ev.target.checked ? "HOLD" : "", changed: true });
        return;
    }
  };
  const valueChangeHandler = (field) => (value) => {
    switch (field) {
      case "shipExpireDate":
        if (dayjs(value).isValid()) {
          switch (dayjs(value).day()) {
            case 0:
              setCartHeader({
                ...cartHeader,
                [field]: dayjs(value).add(1, "day").toISOString(),
                changed: true
              });
              return;
            case 6:
              setCartHeader({
                ...cartHeader,
                [field]: dayjs(value).add(2, "day").toISOString(),
                changed: true
              });
              return;
          }
        }
        setCartHeader({ ...cartHeader, [field]: value ?? "", changed: true });
        return;
      case "shipVia":
      case "PaymentType":
        setCartHeader({ ...cartHeader, [field]: value ?? "", changed: true });
    }
  };
  const shipToChangeHandler = (value, address) => {
    if (!cartHeader) {
      return;
    }
    if (!address) {
      setCartHeader({ ...cartHeader, shipToCode: value, changed: true });
      setCartProgress(cartProgress_Cart);
      return;
    }
    setCartHeader({ ...cartHeader, shipToCode: value, ...address, changed: true });
    setCartProgress(cartProgress_Cart);
  };
  const setCurrentCartHandler = () => {
    if (!customerKey2 || !header) {
      return;
    }
    dispatch(loadCart({ customerKey: customerKey2, cartId: header.id }));
  };
  const reloadHandler = () => {
    setCartProgress(cartProgress_Cart);
    if (!customerKey2 || !header) {
      return;
    }
    dispatch(loadCart({ customerKey: customerKey2, cartId: header?.id }));
    dispatch(loadNextShipDate());
  };
  const saveCartHandler = async () => {
    if (!customerKey2 || !cartHeader) {
      return;
    }
    dispatch(saveCart({ customerKey: customerKey2, cartId: cartHeader.id, body: cartHeader }));
  };
  const submitHandler = async () => {
    if (!cartHeader) {
      return;
    }
    if (cartProgress < cartProgress_Confirm) {
      const next = validateForm(cartProgress);
      console.log("submitHandler", next);
      switch (next) {
        case cartProgress_Delivery:
          ga4BeginCheckout(header, detail);
          break;
        case cartProgress_Payment:
          ga4AddShippingInfo(header, detail);
          break;
        case cartProgress_Confirm:
          ga4AddPaymentInfo(header, detail);
          break;
      }
      setCartProgress(next);
      return;
    }
    ga4Purchase(header, detail);
    await promoteCart();
  };
  return /* @__PURE__ */ jsxs(Box, { component: "div", children: [
    /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, sx: { mb: 1 }, children: [
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "column", children: [
        /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: { xs: "column", lg: "row" }, children: [
          /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Cart Created",
              type: "date",
              fullWidth: true,
              variant: "filled",
              size: "small",
              value: orderDate,
              placeholder: "",
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          ),
          /* @__PURE__ */ jsx(
            TextField,
            {
              label: "Cart Expires",
              type: "date",
              size: "small",
              variant: "filled",
              fullWidth: true,
              value: dayjs(header?.shipExpireDate).format("YYYY-MM-DD"),
              slotProps: {
                htmlInput: { readOnly: true }
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Cart Name",
            type: "text",
            fullWidth: true,
            variant: "filled",
            size: "small",
            value: cartHeader?.customerPONo ?? "",
            required: true,
            onChange: changeHandler("customerPONo"),
            slotProps: {
              htmlInput: { ref: customerPORef, maxLength: 30 }
            }
          }
        ),
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Promo Code",
            type: "text",
            fullWidth: true,
            slotProps: {
              htmlInput: { maxLength: 30 }
            },
            value: cartHeader?.promoCode ?? "",
            onChange: changeHandler("promoCode"),
            variant: "filled",
            size: "small"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "column", children: [
        /* @__PURE__ */ jsx(
          ShipToSelect,
          {
            value: cartHeader?.shipToCode ?? "",
            disabled: loadingStatus !== "idle",
            defaultName: "Default Address",
            onChange: shipToChangeHandler
          }
        ),
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Delivery Address",
            type: "text",
            multiline: true,
            variant: "filled",
            size: "small",
            value: multiLineAddress(addressFromShipToAddress(cartHeader)).join("\n"),
            slotProps: {
              htmlInput: { readOnly: true }
            }
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, sx: { mb: 1 }, children: [
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsx(Collapse, { in: cartProgress >= cartProgress_Delivery, collapsedSize: 0, children: /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "column", children: [
        /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: { xs: "column", md: "row" }, children: [
          /* @__PURE__ */ jsx(
            ShipDateInput,
            {
              value: cartHeader?.shipExpireDate ?? nextShipDate,
              disabled: loadingStatus !== "idle",
              error: !cartHeader?.shipExpireDate || !dayjs(cartHeader.shipExpireDate).isValid() || dayjs(cartHeader?.shipExpireDate).isBefore(nextShipDate),
              onChange: valueChangeHandler("shipExpireDate"),
              inputProps: { required: true },
              ref: shipDateRef
            }
          ),
          /* @__PURE__ */ jsx(FormControl, { variant: "filled", fullWidth: true, children: /* @__PURE__ */ jsx(FormControlLabel, { control: /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: cartHeader?.CancelReasonCode === "HOLD",
              onChange: changeHandler("CancelReasonCode")
            }
          ), label: "Hold for Ship Date" }) })
        ] }),
        /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: { xs: "column", md: "row" }, children: [
          /* @__PURE__ */ jsx(
            ShippingMethodSelect,
            {
              value: cartHeader?.shipVia ?? "",
              required: true,
              disabled: loadingStatus !== "idle",
              error: !cartHeader?.shipVia,
              ref: shipMethodRef,
              onChange: valueChangeHandler("shipVia")
            }
          ),
          /* @__PURE__ */ jsx(CustomerShippingAccountControl, { shipVia: cartHeader?.shipVia })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsx(Collapse, { in: cartProgress >= cartProgress_Payment, collapsedSize: 0, children: /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: "column", children: [
        /* @__PURE__ */ jsx(
          CartPaymentSelect,
          {
            value: cartHeader?.PaymentType ?? "",
            error: !cartHeader?.PaymentType,
            ref: paymentMethodRef,
            required: true,
            disabled: loadingStatus !== "idle",
            onChange: valueChangeHandler("PaymentType")
          }
        ),
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Purchase Order No",
            type: "text",
            fullWidth: true,
            variant: "filled",
            size: "small",
            value: cartHeader?.customerPONo ?? "",
            onChange: changeHandler("customerPONo"),
            slotProps: {
              htmlInput: { maxLength: 30 }
            },
            disabled: loadingStatus !== "idle",
            error: !cartHeader.customerPONo,
            required: true
          }
        )
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx(
      CartCheckoutProgress,
      {
        current: cartProgress,
        disabled: loadingStatus !== "idle",
        onChange: setCartProgress
      }
    ),
    /* @__PURE__ */ jsxs(Stack, { spacing: 2, direction: { sm: "column", md: "row" }, justifyContent: "space-between", children: [
      /* @__PURE__ */ jsx(Stack, { sx: { flex: "1 1 auto" }, children: (detailChanged || cartHeader?.changed) && cartProgress === cartProgress_Cart && /* @__PURE__ */ jsx(Alert, { severity: "warning", children: "Don't forget to save your changes!" }) }),
      /* @__PURE__ */ jsxs(Stack, { spacing: 3, direction: { sm: "column", md: "row" }, sx: { justifyContent: "flex-end" }, children: [
        /* @__PURE__ */ jsx(
          DeleteCartButton,
          {
            customerKey: customerKey2,
            cartId: cartHeader.id,
            disabled: loadingStatus !== "idle" || cartHeader?.changed,
            children: "Delete Cart"
          }
        ),
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "text", onClick: reloadHandler, disabled: loadingStatus !== "idle", children: detailChanged || cartHeader?.changed ? "Cancel Changes" : "Reload" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: (detailChanged || cartHeader?.changed) && cartProgress === cartProgress_Cart ? "contained" : "text",
            color: detailChanged || cartHeader?.changed ? "warning" : "primary",
            onClick: saveCartHandler,
            disabled: loadingStatus !== "idle" || cartProgress !== cartProgress_Cart && !detailChanged,
            children: "Save Cart"
          }
        ),
        /* @__PURE__ */ jsx(
          SendEmailButton,
          {
            cartId: cartHeader.id,
            disabled: cartProgress !== cartProgress_Cart || detailChanged,
            children: "Send Email"
          }
        ),
        /* @__PURE__ */ jsx(
          CheckoutButton,
          {
            cartProgress,
            onClick: submitHandler,
            disabled: loadingStatus !== "idle" || detailChanged
          }
        ),
        cartHeader.id !== currentCartId && /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "contained",
            disabled: loadingStatus !== "idle",
            onClick: setCurrentCartHandler,
            children: "Set Current Cart"
          }
        )
      ] })
    ] }),
    loadingStatus !== "idle" && /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }),
    /* @__PURE__ */ jsx(AlertList, { context: processCart.typePrefix }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsxs(
      Stack,
      {
        spacing: 2,
        direction: { sm: "column", md: "row" },
        justifyContent: "space-between",
        divider: /* @__PURE__ */ jsx(Divider, { orientation: "vertical", flexItem: true }),
        children: [
          /* @__PURE__ */ jsx(ItemAutocomplete, { cartId: header.id }),
          /* @__PURE__ */ jsx(CartCommentInput, { cartId: header.id })
        ]
      }
    )
  ] });
}
function CartCommentLine({
  cartId,
  lineId,
  readOnly,
  ref
}) {
  const dispatch = useAppDispatch();
  const line = useAppSelector((state) => selectCartItemById(state, lineId));
  const [value, setValue] = useState(line.commentText);
  const [commentText, setCommentText] = useDebounceValue(line.commentText, 500);
  useEffect(() => {
    if (readOnly || line.commentText === commentText) {
      return;
    }
    dispatch(setCartItem({ cartHeaderId: cartId, id: lineId, commentText }));
  }, [commentText, line, readOnly]);
  const rowClassName = {
    "table-warning": line.changed,
    "table-info": !line.id
  };
  const changeHandler = (ev) => {
    setValue(ev.target.value);
    setCommentText(ev.target.value);
  };
  const deleteCommentHandler = () => {
    if (readOnly) {
      return;
    }
    dispatch(setCartItem({ cartHeaderId: cartId, id: lineId, commentText: "" }));
  };
  return /* @__PURE__ */ jsxs(TableRow, { className: classNames(rowClassName), children: [
    line.itemType === "4" && /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsx(TextSnippetIcon, {}) }),
    /* @__PURE__ */ jsx(TableCell, { colSpan: 3, children: /* @__PURE__ */ jsx(Box, { sx: { display: "flex", flexDirection: "row" }, children: /* @__PURE__ */ jsx(
      TextField,
      {
        value: value ?? "",
        fullWidth: true,
        size: "small",
        variant: "filled",
        ref,
        label: "Item Comment",
        sx: { flex: "1 1 auto" },
        multiline: true,
        maxRows: 4,
        minRows: 1,
        onChange: changeHandler,
        slotProps: {
          htmlInput: { readOnly, maxLength: 2048 },
          input: {
            endAdornment: /* @__PURE__ */ jsx(
              IconButton,
              {
                size: "small",
                onClick: deleteCommentHandler,
                "aria-label": "remove comment",
                children: /* @__PURE__ */ jsx(ClearIcon, {})
              }
            )
          }
        }
      }
    ) }) }),
    /* @__PURE__ */ jsx(TableCell, { colSpan: 4, children: " " }),
    line.itemType === "4" && /* @__PURE__ */ jsx(TableCell, { children: " " })
  ] });
}
const AvailabilityAlert = ({ quantityOrdered, quantityAvailable, season }) => {
  const canViewAvailable = useAppSelector(selectCanViewAvailable);
  const available = new Decimal(quantityAvailable ?? 0);
  const ordered = new Decimal(quantityOrdered);
  if (season && season.active && !season.available) {
    return /* @__PURE__ */ jsx(Alert, { severity: "info", icon: /* @__PURE__ */ jsx(NewReleasesIcon, {}), children: "Pre-season Item" });
  }
  if (available.gte(ordered)) {
    return null;
  }
  if (available.lte(0) || !canViewAvailable) {
    return /* @__PURE__ */ jsx(AppAlert, { severity: "warning", children: "Not available for immediate delivery." });
  }
  const message = `Only ${available} ${available.eq(1) ? "is" : "are"} available for immediate delivery`;
  return /* @__PURE__ */ jsx(AppAlert, { severity: "warning", message, alertTitle: "Note:" });
};
const CartLineButtons = ({
  onDelete,
  deleteDisabled,
  onAddComment,
  addCommentDisabled,
  onCopyToCart,
  copyToCartDisabled
}) => {
  const actions = [
    {
      icon: /* @__PURE__ */ jsx(AddShoppingCartIcon, {}),
      name: "Add to Cart",
      disabled: !onCopyToCart || copyToCartDisabled,
      onClick: onCopyToCart
    },
    {
      icon: /* @__PURE__ */ jsx(AddCommentIcon, {}),
      name: "Add Comment",
      disabled: !onAddComment || addCommentDisabled,
      onClick: onAddComment
    },
    {
      icon: /* @__PURE__ */ jsx(ClearIcon, { color: "error" }),
      name: "Remove From Cart",
      disabled: !onDelete || deleteDisabled,
      onClick: onDelete
    }
  ];
  return /* @__PURE__ */ jsx(Box, { sx: { position: "relative", height: "calc(0.5rem + 80px + 24px)" }, children: /* @__PURE__ */ jsx(
    SpeedDial,
    {
      ariaLabel: "Cart Item Actions",
      icon: /* @__PURE__ */ jsx(SpeedDialIcon, {}),
      direction: "left",
      sx: { position: "absolute", bottom: 8, right: 0 },
      children: actions.filter((action) => !action.disabled).map((action) => /* @__PURE__ */ jsx(
        SpeedDialAction,
        {
          icon: action.icon,
          slotProps: { tooltip: { title: action.name } },
          onClick: action.onClick
        },
        action.name
      ))
    }
  ) });
};
function CartItemLine({
  cartId,
  lineId,
  readOnly,
  customerPriceLevel,
  onDelete,
  onAddToCart
}) {
  const dispatch = useAppDispatch();
  const line = useAppSelector((state) => selectCartItemById(state, lineId));
  const commentRef = useRef(null);
  const canViewAvailable = useAppSelector(selectCanViewAvailable);
  const [showCommentInput, setShowCommentInput] = useState(!!line.commentText);
  const unitPrice = new Decimal(1).sub(new Decimal(line.lineDiscountPercent ?? 0).div(100)).times(new Decimal(line.unitPrice ?? 0).div(line.unitOfMeasureConvFactor ?? 1));
  const itemPrice = new Decimal(1).sub(new Decimal(line.lineDiscountPercent ?? 0).div(100)).times(line.unitPrice ?? 0);
  const quantityChangeHandler = (quantityOrdered) => {
    if (readOnly || quantityOrdered === line.quantityOrdered) {
      return;
    }
    dispatch(setCartItem({ cartHeaderId: cartId, id: lineId, quantityOrdered }));
  };
  const rowClassName = {
    "table-warning": line.changed
  };
  const addCommentClickHandler = () => {
    setShowCommentInput(true);
    commentRef.current?.focus();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      TableRow,
      {
        sx: {
          '& > *:not([rowspan="2"])': { borderBottom: showCommentInput ? "unset" : void 0 },
          verticalAlign: "top"
        },
        className: classNames(rowClassName),
        children: [
          /* @__PURE__ */ jsx(TableCell, { rowSpan: showCommentInput ? 2 : 1, component: "th", children: /* @__PURE__ */ jsxs(
            ProductLink,
            {
              categoryKeyword: line.cartProduct.categoryKeyword,
              productKeyword: line.cartProduct.productKeyword,
              children: [
                /* @__PURE__ */ jsx(Typography, { variant: "body1", sx: { fontWeight: 700 }, component: "div", children: line.itemCode }),
                line.itemType === "1" && /* @__PURE__ */ jsx(
                  OrderItemImage,
                  {
                    itemCode: line.itemCode,
                    itemCodeDesc: line.itemCodeDesc,
                    image: line.cartProduct.image,
                    colorCode: line.cartProduct.colorCode
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(TableCell, { children: [
            /* @__PURE__ */ jsx(
              ProductLink,
              {
                categoryKeyword: line.cartProduct.categoryKeyword,
                productKeyword: line.cartProduct.productKeyword,
                children: /* @__PURE__ */ jsx(Typography, { variant: "body1", children: line.itemCodeDesc })
              }
            ),
            !!line.cartProduct.upc && /* @__PURE__ */ jsx(FormattedUPC, { value: line.cartProduct.upc }),
            line.cartProduct.requiresCustomization && /* @__PURE__ */ jsx(Alert, { variant: "outlined", color: "info", children: "Product requires customization: UPC Sticker" }),
            !readOnly && canViewAvailable && line.itemType === "1" && /* @__PURE__ */ jsx(
              AvailabilityAlert,
              {
                quantityOrdered: line.quantityOrdered,
                quantityAvailable: line.cartProduct.available,
                season: line.season
              }
            )
          ] }),
          /* @__PURE__ */ jsx(TableCell, { children: line.unitOfMeasure }),
          /* @__PURE__ */ jsxs(TableCell, { align: "right", children: [
            readOnly && /* @__PURE__ */ jsx("span", { children: line.quantityOrdered }),
            !readOnly && /* @__PURE__ */ jsx(
              CartQuantityInput,
              {
                quantity: +line.quantityOrdered,
                min: 0,
                unitOfMeasure: line.unitOfMeasure ?? "EA",
                disabled: readOnly,
                onChange: quantityChangeHandler
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(TableCell, { align: "right", children: [
            /* @__PURE__ */ jsx("div", { children: numeral(unitPrice).format("0,0.00") }),
            !!line.lineDiscountPercent && new Decimal(line.lineDiscountPercent ?? 0).gt(0) && /* @__PURE__ */ jsxs("div", { className: "sale", children: [
              line.lineDiscountPercent,
              "% Off"
            ] }),
            !!line.pricing.priceLevel && line.pricing.priceLevel !== customerPriceLevel && /* @__PURE__ */ jsx(PriceLevelNotice, { priceLevel: line.pricing.priceLevel })
          ] }),
          /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(line.pricing.suggestedRetailPrice).format("0,0.00") }),
          /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(itemPrice).format("0,0.00") }),
          /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(new Decimal(line.quantityOrdered ?? 0).times(itemPrice)).format("0,0.00") }),
          /* @__PURE__ */ jsx(TableCell, { rowSpan: showCommentInput ? 2 : 1, children: /* @__PURE__ */ jsx(
            CartLineButtons,
            {
              onDelete,
              deleteDisabled: readOnly,
              onAddComment: addCommentClickHandler,
              addCommentDisabled: readOnly || showCommentInput || !!line.commentText,
              onCopyToCart: onAddToCart,
              copyToCartDisabled: !line.productType || line.productType === "D" || line.cartProduct.inactiveItem || line.itemType !== "1"
            }
          ) })
        ]
      }
    ),
    showCommentInput && /* @__PURE__ */ jsx(CartCommentLine, { cartId, lineId, ref: commentRef, readOnly })
  ] });
}
function CartKitComponentLine({
  line,
  readOnly,
  onAddToCart
}) {
  const unitPrice = new Decimal(1).sub(new Decimal(line.lineDiscountPercent).div(100)).times(new Decimal(line.unitPrice).div(line.unitOfMeasureConvFactor ?? 1));
  const itemPrice = new Decimal(1).sub(new Decimal(line.lineDiscountPercent).div(100)).times(line.unitPrice);
  const rowClassName = {};
  return /* @__PURE__ */ jsxs(TableRow, { sx: { verticalAlign: "top" }, className: classNames(rowClassName), children: [
    /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(Stack, { direction: "row", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ArrowRightIcon, {}) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { children: line.itemCode }),
        line.itemType === "1" && /* @__PURE__ */ jsx(
          OrderItemImage,
          {
            itemCode: line.itemCode,
            itemCodeDesc: line.itemCodeDesc,
            image: line.cartProduct.image,
            colorCode: line.cartProduct.colorCode
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(TableCell, { children: [
      /* @__PURE__ */ jsx("p", { children: line.itemCodeDesc }),
      !!line.cartProduct.upc && /* @__PURE__ */ jsx("p", { children: UPCA.format(line.cartProduct.upc) }),
      !readOnly && /* @__PURE__ */ jsx(
        AvailabilityAlert,
        {
          quantityOrdered: line.quantityOrdered,
          quantityAvailable: line.cartProduct.available ?? 0
        }
      )
    ] }),
    /* @__PURE__ */ jsx(TableCell, { children: line.unitOfMeasure }),
    /* @__PURE__ */ jsx(TableCell, { align: "center", children: numeral(line.quantityOrdered).format("0,0") }),
    /* @__PURE__ */ jsx(TableCell, { align: "right", children: new Decimal(unitPrice ?? 0).eq(0) ? null : numeral(unitPrice).format("0,0.00") }),
    /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(line.pricing.suggestedRetailPrice).format("0,0.00") }),
    /* @__PURE__ */ jsx(TableCell, { align: "right", children: new Decimal(unitPrice ?? 0).eq(0) ? null : numeral(itemPrice).format("0,0.00") }),
    /* @__PURE__ */ jsx(TableCell, { align: "right", children: new Decimal(unitPrice ?? 0).eq(0) ? null : numeral(new Decimal(line.quantityOrdered).times(itemPrice)).format("0,0.00") }),
    /* @__PURE__ */ jsx(TableCell, { align: "right", children: /* @__PURE__ */ jsx(
      CartLineButtons,
      {
        onCopyToCart: onAddToCart,
        copyToCartDisabled: readOnly || (!line.productType || line.productType === "D" || line.cartProduct.inactiveItem || line.itemType !== "1")
      }
    ) })
  ] });
}
function CartDetailLine({
  line,
  readOnly,
  customerPriceLevel,
  onAddToCart
}) {
  const dispatch = useAppDispatch();
  const customerKey2 = useAppSelector(selectCustomerKey);
  const cartItemStatus = useAppSelector((state) => selectCartItemStatusById(state, line.id));
  const hasChanges = useAppSelector((state) => selectCartHasChanges(state, line.cartHeaderId));
  const commentRef = useRef(null);
  const deleteHandler = () => {
    if (readOnly || !customerKey2) {
      return;
    }
    if (hasChanges) {
      dispatch(setCartItem({ cartHeaderId: line.cartHeaderId, id: line.id, quantityOrdered: 0 }));
      return;
    }
    const item = { quantityOrdered: 0, commentText: "", itemType: line.itemType };
    dispatch(saveCartItem({
      customerKey: customerKey2,
      cartId: line.cartHeaderId,
      cartItemId: line.id,
      item
    }));
  };
  const addToCartHandler = () => {
    if (onAddToCart) {
      onAddToCart(line);
    }
  };
  if (line.soDetail.itemType === "4") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(CartCommentLine, { cartId: line.cartHeaderId, lineId: line.id, ref: commentRef }),
      !!cartItemStatus && cartItemStatus !== "idle" && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 9, children: /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }) }) })
    ] });
  }
  const isKitComponent = !!line.soDetail.salesKitLineKey && line.soDetail.salesKitLineKey !== line.soDetail.lineKey;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !isKitComponent && /* @__PURE__ */ jsx(
      CartItemLine,
      {
        cartId: line.cartHeaderId,
        lineId: line.id,
        customerPriceLevel,
        readOnly,
        onDelete: deleteHandler,
        onAddToCart: addToCartHandler
      }
    ),
    line.soDetail.productType === "K" && line.soDetail.explodedKitItem === "Y" && /* @__PURE__ */ jsxs(TableRow, { sx: { verticalAlign: "top" }, children: [
      /* @__PURE__ */ jsx(TableCell, { children: " " }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 4, children: "Contains:" }),
      /* @__PURE__ */ jsx(TableCell, { children: " " }),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] }),
    isKitComponent && /* @__PURE__ */ jsx(
      CartKitComponentLine,
      {
        line,
        readOnly,
        onAddToCart: addToCartHandler
      }
    ),
    cartItemStatus !== "idle" && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 9, children: /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" }) }) })
  ] });
}
function CartTotal({ cartId }) {
  const header = useAppSelector((state) => selectCartHeaderById(state, cartId));
  const shippingAccount = useAppSelector(selectCartShippingAccount);
  if (!header) {
    return null;
  }
  const subTotal = new Decimal(header.subTotalAmt);
  const total = subTotal.add(header.FreightAmt ?? 0).add(header.SalesTaxAmt ?? 0).sub(header.DepositAmt ?? 0).sub(header.DiscountAmt ?? 0);
  const isFreightTBD = () => {
    return !(getShippingMethod(header.shipVia)?.allowCustomerAccount && shippingAccount?.enabled);
  };
  return /* @__PURE__ */ jsxs(TableFooter, { children: [
    /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { component: "th", scope: "row", colSpan: 5, align: "right", children: "Sub Total" }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(subTotal.toString()).format("$ 0,0.00") }),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] }),
    /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxs(TableCell, { component: "th", scope: "row", colSpan: 5, align: "right", children: [
        "Sales Tax ",
        !new Decimal(header.SalesTaxAmt ?? 0).eq(0) ? header.TaxSchedule : ""
      ] }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: header.SalesTaxAmt === null ? "TBD" : numeral(header.SalesTaxAmt ?? 0).format("$ 0,0.00") }),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] }),
    /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { colSpan: 5, align: "right", children: "Freight" }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: isFreightTBD() ? "TBD" : numeral(header.FreightAmt ?? 0).format("$ 0,0.00") }),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] }),
    !new Decimal(header.DiscountAmt ?? 0).eq(0) && /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { colSpan: 5, align: "right", children: "Discount" }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(header.DiscountAmt).format("$ 0,0.00") }),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] }),
    !new Decimal(header.DepositAmt ?? 0).eq(0) && /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { colSpan: 5, align: "right", children: "Deposit" }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: " " }),
      /* @__PURE__ */ jsx(TableCell, { align: "right", children: numeral(header.DepositAmt).format("$ 0,0.00") }),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] }),
    /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { colSpan: 5, align: "right", children: "Total" }),
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: " " }),
      /* @__PURE__ */ jsx(
        TableCell,
        {
          align: "right",
          children: isFreightTBD() ? "TBD" : numeral(total.toString()).format("$ 0,0.00")
        }
      ),
      /* @__PURE__ */ jsx(TableCell, { children: " " })
    ] })
  ] });
}
function AddToCartDialog({ item, unitOfMeasure, excludeCartId, open, onClose, onDone, onCancel }) {
  const [quantity, setQuantity] = useState(item?.quantity ?? 1);
  if (!item) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Dialog, { open, onClose, children: [
    /* @__PURE__ */ jsxs(DialogTitle, { children: [
      "Add ",
      item?.itemCode,
      " To Cart"
    ] }),
    /* @__PURE__ */ jsx(DialogContent, { children: !!item && /* @__PURE__ */ jsx(
      AddToCartForm,
      {
        cartItem: item,
        unitOfMeasure,
        quantity,
        onChangeQuantity: setQuantity,
        excludeCartId,
        onDone
      }
    ) }),
    /* @__PURE__ */ jsx(DialogActions, { children: /* @__PURE__ */ jsx(Button, { autoFocus: true, onClick: onCancel, children: "Cancel" }) })
  ] });
}
function CartDetail({ cartId }) {
  const detail = useAppSelector((state) => selectCartDetailById(state, cartId));
  const header = useAppSelector((state) => selectCartHeaderById(state, cartId));
  const [cartItem, setCartItem2] = useState(null);
  const [unitOfMeasure, setUnitOfMeasure] = useState("EA");
  useEffect(() => {
    ga4ViewCart(header, detail);
  }, [header, detail]);
  const addToCartHandler = (line) => {
    setUnitOfMeasure(line.unitOfMeasure ?? "EA");
    const item = cartDetailToCartProduct(line);
    if (!item) {
      setCartItem2(null);
      return;
    }
    setCartItem2(item);
  };
  const dialogCloseHandler = () => {
    setCartItem2(null);
  };
  return /* @__PURE__ */ jsxs(TableContainer, { sx: { mt: 3 }, children: [
    /* @__PURE__ */ jsxs(Table, { size: "small", children: [
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: "Item" }),
        /* @__PURE__ */ jsx(TableCell, { children: "Description" }),
        /* @__PURE__ */ jsx(TableCell, { children: "U/M" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "Ordered" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "Unit Price" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "MSRP" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "Item Price" }),
        /* @__PURE__ */ jsx(TableCell, { align: "right", children: "Ext Price" }),
        /* @__PURE__ */ jsx(TableCell, { align: "center", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: detail.map((line) => /* @__PURE__ */ jsx(
        CartDetailLine,
        {
          line,
          onAddToCart: addToCartHandler
        },
        line.id
      )) }),
      /* @__PURE__ */ jsx(CartTotal, { cartId })
    ] }),
    /* @__PURE__ */ jsx(
      AddToCartDialog,
      {
        item: cartItem,
        unitOfMeasure,
        open: !!cartItem,
        onClose: dialogCloseHandler,
        onDone: dialogCloseHandler,
        onCancel: dialogCloseHandler
      }
    )
  ] });
}
function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const customerKey2 = useAppSelector(selectCustomerKey);
  const cartStatus = useAppSelector((state) => selectCartStatusById(state, parseCartId(params.cartId)));
  const cartHeader = useAppSelector((state) => selectCartHeaderById(state, parseCartId(params.cartId)));
  useEffect(() => {
    const cartId = parseCartId(params.cartId);
    if (Number.isNaN(cartId) || !cartId || !customerKey2) {
      return;
    }
    dispatch(loadCart({ cartId, customerKey: customerKey2, setActiveCart: true }));
  }, [params, customerKey2]);
  useEffect(() => {
    if (cartStatus === "not-found") {
      navigate(generatePath("/account/:customerSlug/carts", { customerSlug: billToCustomerSlug(customerKey2) }), { replace: true });
    }
  }, [cartStatus, customerKey2]);
  const documentTitle = `Cart #${params?.cartId}`;
  if (!cartHeader || !customerKey2) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(DocumentTitle, { documentTitle }),
      /* @__PURE__ */ jsx(Typography, { variant: "h3", component: "h2", children: documentTitle }),
      /* @__PURE__ */ jsx(CartSkeleton, {}),
      /* @__PURE__ */ jsx(LinearProgress, { variant: "indeterminate" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(DocumentTitle, { documentTitle }),
    /* @__PURE__ */ jsxs(Typography, { variant: "h3", component: "h2", children: [
      "Cart #",
      cartHeader.id
    ] }),
    /* @__PURE__ */ jsx(CartOrderHeader, {}),
    /* @__PURE__ */ jsx(CartDetail, { cartId: cartHeader.id })
  ] });
}
function ServerApp() {
  const isLoggedIn2 = useSelector(selectLoggedIn);
  const nonce = useSelector(selectAppNonce);
  return /* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(LocalizationProvider, { dateAdapter: AdapterDayjs, children: /* @__PURE__ */ jsx(ThemeProvider, { theme: theme$1, children: /* @__PURE__ */ jsx(CssBaseline, { children: /* @__PURE__ */ jsx(GoogleOAuthProvider, { clientId: GOOGLE_CLIENT_ID, nonce: nonce ?? void 0, children: /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsxs(Route, { path: "/", element: /* @__PURE__ */ jsx(MainOutlet, {}), children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomeV2, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/home", element: /* @__PURE__ */ jsx(HomeV2, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/products", element: /* @__PURE__ */ jsx(ProductRouter, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/products/:category", element: /* @__PURE__ */ jsx(ProductRouter, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/products/:category/:product", element: /* @__PURE__ */ jsx(ProductRouter, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/products/:category/:product/:sku", element: /* @__PURE__ */ jsx(ProductRouter, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/pages/:keyword", element: /* @__PURE__ */ jsx(ContentPage, {}) }),
    !isLoggedIn2 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/set-password/:hash/:key", element: /* @__PURE__ */ jsx(ResetPassword, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/set-password", element: /* @__PURE__ */ jsx(ResetPassword, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/signup/:hash/:key", element: /* @__PURE__ */ jsx(ResetPassword, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/signup", element: /* @__PURE__ */ jsx(SignUp, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/reset-password", element: /* @__PURE__ */ jsx(RequestPasswordResetForm, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(LoginPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(LoginPage, {}) })
    ] }),
    isLoggedIn2 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(LoginPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/logout", element: /* @__PURE__ */ jsx(Logout, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/profile", element: /* @__PURE__ */ jsx(ProfilePage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/profile/set-password", element: /* @__PURE__ */ jsx(ChangePasswordPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/profile/:id", element: /* @__PURE__ */ jsx(AccountListContainer, {}) }),
      /* @__PURE__ */ jsxs(Route, { path: "/account/:customerSlug", element: /* @__PURE__ */ jsx(AccountPage, {}), children: [
        /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(BillToForm, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "delivery", element: /* @__PURE__ */ jsx(ShipToList, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "delivery/:shipToCode", element: /* @__PURE__ */ jsx(ShipToForm, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "users", element: /* @__PURE__ */ jsx(CustomerUsers, {}), children: /* @__PURE__ */ jsx(Route, { path: ":id?", element: /* @__PURE__ */ jsx(EditAccountUserForm, {}) }) }),
        /* @__PURE__ */ jsx(Route, { path: "carts", element: /* @__PURE__ */ jsx(CartsPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "carts/:cartId", element: /* @__PURE__ */ jsx(CartPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "orders", element: /* @__PURE__ */ jsx(OpenOrdersList, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "orders/:salesOrderNo", element: /* @__PURE__ */ jsx(SalesOrderPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "invoices", element: /* @__PURE__ */ jsx(InvoicesList, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "invoices/:type/:invoiceNo", element: /* @__PURE__ */ jsx(InvoicePage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(ContentPage404, {}) })
      ] }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(ContentPage404, {}) })
    ] }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(ContentPage404, {}) })
  ] }) }) }) }) }) }) });
}
const InlineJSHeadContent = (versionNo) => {
  return `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', '${process$1.env.GOOGLE_TAG_ID}');
        
        window.Chums = {"version": "${versionNo}", "gtagID": "${process$1.env.GOOGLE_TAG_ID}"};
        `;
};
function B2BHtml({ url, css, store, manifestFiles, swatchTimestamp, cspNonce }) {
  const state = store.getState() ?? {};
  const preloadedStateJSON = JSON.stringify(state).replace(/</g, "\\u003c");
  return /* @__PURE__ */ jsxs("html", { lang: "en-us", dir: "ltr", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { httpEquiv: "x-ua-compatible", content: "ie-edge" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Chums B2B" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("title", { children: "Chums B2B" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://b2b.chums.com/images/logos/Chums-Logo-Badge-Red-RGB.png" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: "Chums Logo" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://b2b.chums.com/" }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "57x57", href: "/images/icons/apple-touch-icon-57x57.png" }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "60x60", href: "/images/icons/apple-touch-icon-60x60.png" }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "72x72", href: "/images/icons/apple-touch-icon-72x72.png" }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "76x76", href: "/images/icons/apple-touch-icon-76x76.png" }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "114x114", href: "/images/icons/apple-touch-icon-114x114.png" }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "120x120", href: "/images/icons/apple-touch-icon-120x120.png" }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "144x144", href: "/images/icons/apple-touch-icon-144x144.png" }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "152x152", href: "/images/icons/apple-touch-icon-152x152.png" }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "180x180", href: "/images/icons/apple-touch-icon-180x180.png" }),
      /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: css }, nonce: cspNonce }),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          href: `/b2b-swatches/swatches.css?version=${swatchTimestamp}`,
          nonce: cspNonce
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: "/css/has-bootstrap.css", nonce: cspNonce }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }),
      /* @__PURE__ */ jsx(
        "link",
        {
          href: "https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
          nonce: cspNonce,
          rel: "stylesheet"
        }
      ),
      /* @__PURE__ */ jsx("script", { src: "https://accounts.google.com/gsi/client", async: true, defer: true, nonce: cspNonce }),
      state.cookieConsent?.record?.preferences?.analytics && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "script",
          {
            async: true,
            src: `https://www.googletagmanager.com/gtag/js?id=${process$1.env.GOOGLE_TAG_ID}`,
            nonce: cspNonce
          }
        ),
        /* @__PURE__ */ jsx(
          "script",
          {
            dangerouslySetInnerHTML: { __html: InlineJSHeadContent(manifestFiles.version ?? "") },
            nonce: cspNonce
          }
        )
      ] }),
      /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx("div", { id: "root", children: /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(ServerApp, {}) }) }) }),
      /* @__PURE__ */ jsx(
        "script",
        {
          dangerouslySetInnerHTML: { __html: `window.__PRELOADED_STATE__ = ${preloadedStateJSON}` },
          nonce: cspNonce
        }
      ),
      manifestFiles["vendors-react.js"] && /* @__PURE__ */ jsx("script", { src: manifestFiles["vendors-react.js"], nonce: cspNonce }),
      manifestFiles["vendors-mui.js"] && /* @__PURE__ */ jsx("script", { src: manifestFiles["vendors-mui.js"], nonce: cspNonce }),
      manifestFiles["vendors.js"] && /* @__PURE__ */ jsx("script", { src: manifestFiles["vendors.js"], nonce: cspNonce }),
      manifestFiles["chums.js"] && /* @__PURE__ */ jsx("script", { src: manifestFiles["chums.js"], nonce: cspNonce }),
      manifestFiles["main.js"] && /* @__PURE__ */ jsx("script", { src: manifestFiles["main.js"], nonce: cspNonce })
    ] })
  ] });
}
const debug$1 = Debug("chums:server:render");
const validRoutes = /^\/($|home|products|pages|set-password|signup|reset-password|login|logout|profile|account)/;
async function loadMainCSS() {
  try {
    const file = await fs.readFile("./public/css/chums-b2b.css");
    return Buffer.from(file).toString();
  } catch (err) {
    if (err instanceof Error) {
      debug$1("loadMainCSS()", err.message);
      return Promise.reject(err);
    }
    return Promise.reject(new Error(err?.toString()));
  }
}
async function loadVersionNo() {
  try {
    const file = await fs.readFile("./package.json");
    const packageJSON = Buffer.from(file).toString();
    const json = JSON.parse(packageJSON);
    return json?.version ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.debug("loadVersionNo()", err.message);
      return Promise.reject(err);
    }
    console.debug("loadVersionNo()", err);
    return Promise.reject(new Error("Error in loadVersionNo()"));
  }
}
async function getPreloadedState(req, res) {
  try {
    const params = new URLSearchParams();
    if (req.params.keyword) {
      params.set("keyword", req.params.keyword);
    }
    if (req.params.sku) {
      params.set("sku", req.params.sku);
    }
    if (req.query.sku && typeof req.query.sku === "string") {
      params.set("sku", req.query.sku);
    }
    const cookieConsentUUID = req.signedCookies[consentCookieName] ?? res.locals.uuid ?? null;
    if (cookieConsentUUID) {
      params.set("uuid", cookieConsentUUID);
    }
    const nonce = res.locals.cspNonce;
    const preload = await loadJSON(`http://localhost:${API_PORT}/preload/v2/state.json?${params.toString()}`);
    preload.version = {
      versionNo: await loadVersionNo(),
      lastChecked: (/* @__PURE__ */ new Date()).valueOf(),
      ignored: null,
      changed: false,
      loading: false
    };
    preload.app = {
      nonce
    };
    return preload;
  } catch (err) {
    if (err instanceof Error) {
      debug$1("getPreloadedState()", err.message);
      return {};
    }
    debug$1("getPreloadedState()", err);
    return {};
  }
}
async function renderApp(req, res, next) {
  try {
    if (!validRoutes.test(req.path)) {
      debug$1("handleRender() invalid path => 404", req.path);
      next();
      return;
    }
    const keywords = await loadKeywords$1();
    if (req.params.keyword) {
      const keyword = keywords.find((kw) => kw.keyword === req.params.keyword);
      if (!keyword?.status) {
        let redirect2 = "/";
        if (req.params.category) {
          const category = keywords.find((kw) => kw.keyword === req.params.category);
          if (category && category.status) {
            redirect2 = `/products/${category.keyword}`;
          }
        }
        res.redirect(redirect2);
        return;
      }
      if (keyword?.redirect_to_parent) {
        const redirect2 = keywords.find((kw) => kw.id === keyword.redirect_to_parent && kw.pagetype === keyword.pagetype);
        if (redirect2 && redirect2.status) {
          res.redirect(`/products/${redirect2.keyword}`);
          return;
        }
      }
    }
    const manifestFiles = await loadManifest();
    const initialState2 = await getPreloadedState(req, res);
    const store = createServerSideStore(initialState2);
    let swatchMTime = 0;
    try {
      const stat = await fs.stat("./public/b2b-swatches/swatches.css");
      swatchMTime = stat.mtimeMs ?? 0;
    } catch (err) {
    }
    const css = await loadMainCSS();
    const _html = renderToString(/* @__PURE__ */ jsx(
      B2BHtml,
      {
        url: req.url,
        css,
        store,
        cspNonce: res.locals.cspNonce,
        manifestFiles,
        swatchTimestamp: swatchMTime.toString(36)
      }
    ));
    const html = `<!DOCTYPE html>
                    ${_html}
                    `;
    res.send(html);
  } catch (err) {
    if (err instanceof Error) {
      debug$1("renderApp()", err.message);
      console.trace(err.message);
      return res.json({ error: err.message, name: err.name });
    }
    res.json({ error: "unknown error in renderApp" });
  }
}
const debug = Debug("chums:server:index");
const logUsage = (req, res, next) => {
  debug(req.ip, req.method, req.url);
  next();
};
const app = express();
app.set("trust proxy", true);
app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(32).toString("hex");
  next();
});
app.use(helmet(helmetOptions));
app.set("json spaces", 2);
app.use(cookieParser(process.env.COOKIE_SECRET ?? void 0));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(process.cwd(), "./public", "favicon.ico")));
app.use(useCookieGPCHelper());
app.get("/chums.css.map", (req, res) => {
  res.redirect("/css/chums.css.map");
});
app.use("/css", express.static("./public/css", { fallthrough: false }));
app.use("/js", express.static("./public/js", { fallthrough: false }));
app.use("/build", express.static("./public/build", { fallthrough: false }));
app.get("/images", express.static("./public/images", { fallthrough: false }));
app.get("/files", express.static("./files", { fallthrough: false }));
app.get("/pdf", express.static("./pdf", { fallthrough: false }));
app.get("/manifest.json", getManifest);
app.get("/version.js", getVersionJS);
app.get("/version.json", getVersion);
app.get("/version", getVersion);
app.get("/api", getAPIRequest);
app.use(handleInvalidURL);
app.use(logUsage);
app.get("/products/:category/:keyword/:sku", renderApp);
app.get("/products/:category/:keyword", renderApp);
app.get("/products/:keyword", renderApp);
app.get("/products", renderApp);
app.get("/pages/:keyword", renderApp);
app.get("/pages", renderApp);
app.get("/*path.*ext", (req, res) => {
  res.status(404).json({ error: "Not Found", status: 404 });
});
app.get("/*page", renderApp);
app.get("/", renderApp);
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", status: 404 });
});
app.listen(process.env.PORT, function() {
  debug("server running at localhost:" + process.env.PORT);
});
export {
  app as default
};
