import React from 'react';
import './index.css';
import FourRings from "./FourRings";

import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<FourRings />);