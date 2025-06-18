import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

// Importando todos os exemplos
import CalendarExample from "./examples/CalendarExample";
import PracticalExample from "./examples/PracticalExample";
import ExampleWithFeatures from "./examples/ExampleWithFeatures";
import FeatureShowcaseExample from "./examples/FeatureShowcaseExample";
import HolidaysExample from "./examples/HolidaysExample";
import MovableHolidaysExample from "./examples/MovableHolidaysExample";
import HolidayBookingTestExample from "./examples/HolidayBookingTestExample";
import SimpleHolidayTestPage from "./pages/SimpleHolidayTestPage";
import DisabledDatesExample from "./examples/DisabledDatesExample";
import DisabledDatesLabelTest from "./examples/DisabledDatesLabelTest";
import WorkingHoursExample from "./examples/WorkingHoursExample";
import PreviousMonthsExample from "./examples/PreviousMonthsExample";
import ShowExistingEventsExample from "./examples/ShowExistingEventsExample";
import PreviousButtonControlExample from "./examples/PreviousButtonControlExample";
import TodayStyleExample from "./examples/TodayStyleExample";
import { ThemeExample } from "./examples/ThemeExample";
import PurpleThemeExample from "./examples/PurpleThemeExample";
import CustomThemeExample from "./examples/CustomThemeExample";
import CompleteExamplePage from "./examples/CompleteExamplePage";
import CorrectionsDemoExample from "./examples/CorrectionsDemoExample";
import ArgsExample from "./examples/ArgsExample";

import './index.css';

const container = document.getElementById("root") as HTMLElement;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="calendar-example" element={<CalendarExample />} />
          <Route path="practical-example" element={<PracticalExample />} />
          <Route path="example-with-features" element={<ExampleWithFeatures />} />
          <Route path="feature-showcase" element={<FeatureShowcaseExample />} />
          <Route path="holidays-example" element={<HolidaysExample />} />
          <Route path="movable-holidays" element={<MovableHolidaysExample />} />
          <Route path="holiday-booking-test" element={<HolidayBookingTestExample />} />
          <Route path="simple-holiday-test" element={<SimpleHolidayTestPage />} />
          <Route path="disabled-dates" element={<DisabledDatesExample />} />          <Route path="disabled-dates-label" element={<DisabledDatesLabelTest />} />          <Route path="working-hours" element={<WorkingHoursExample />} />          <Route path="previous-months" element={<PreviousMonthsExample />} />
          <Route path="show-existing-events" element={<ShowExistingEventsExample />} />          <Route path="previous-button-control" element={<PreviousButtonControlExample />} />          <Route path="today-style" element={<TodayStyleExample />} />
          <Route path="theme-example" element={<ThemeExample />} />          <Route path="purple-theme" element={<PurpleThemeExample />} />          <Route path="custom-theme" element={<CustomThemeExample />} />
          <Route path="complete-example" element={<CompleteExamplePage />} />
          <Route path="corrections-demo" element={<CorrectionsDemoExample />} />
          <Route path="args-example" element={<ArgsExample />} />
        </Route>
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);