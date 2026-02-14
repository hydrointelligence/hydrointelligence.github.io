# Community-Oriented Flood Information System

A web-based platform for real-time flood inundation mapping and hydrological data analysis. Integrates multiple federal datasets to provide on-demand flood scenario modeling in the browser.

## Overview

This platform leverages National Water Model forecasts and Office of Water Prediction Flood Inundation Mapping products to create interactive flood maps and hydrological analyses. Built with modern web technologies for exploring watershed boundaries, stream networks, elevation data, and flood scenarios.

## Features

### Interactive Mapping

- Multi-layer visualization of hydrological and geographic data
- Standard map controls: pan, zoom, coordinate tracking
- Custom polygon drawing for area analysis

### Data Layers

**Watershed Boundary Dataset (WBD)**

- HUC-2 through HUC-12 hierarchical navigation
- Interactive selection and spatial filtering
- Optimized geobuf data loading

**NHDPlus Hydrography**

- Flowlines, catchments, and waterbodies
- Stream order classification
- COMID-based stream segment analysis

**Digital Elevation Model (DEM)**

- USGS 3DEP elevation data integration
- Color-coded elevation visualization
- Terrain context for flood modeling

**Flood Inundation Mapping (FIM)**

- Office of Water Prediction flood maps
- Historical reference data
- Real-time flood scenario generation

**Station Data**

- USGS stream gages with real-time and historical data
- NWPS gage sites
- Rain gauge meteorological observations
- Interactive modals with time series visualization

### Data Services

**National Water Model (NWM)**

- Historical streamflow analysis (2008-present)
- Real-time and forecast predictions
- Multi-COMID extraction and time series visualization

**NLDI (National Linked Data Infrastructure)**

- Upstream/downstream flow path navigation
- Automatic watershed delineation
- Related feature discovery

**Search & Discovery**

- Location search by name or coordinates
- HUC code lookup
- Address geocoding

### Analysis Tools

- Polygon area, perimeter, and centroid calculations
- Interactive time series charts
- Data export in multiple formats
- Flexible unit conversion

## Getting Started

### Access

1. Help modal appears on first visit
2. Enter NWM API key when prompted (stored in localStorage)

### Navigation

**Map Controls**

- Pan: Click and drag
- Zoom: Mouse wheel or zoom controls
- Coordinates: Displayed in bottom-right corner

**Layer Management**

- Use sidebar to enable/disable layers
- Toggle individual layer visibility
- Layers render in optimized order

**Drawing Tools**

- Draw custom polygons for analysis
- Edit polygons by dragging vertices
- Clear selections as needed

**Keyboard Shortcuts**

- `?`: Toggle help modal
- `Esc`: Close modals, clear selections
- `Alt` + Click: Quick feature selection

## Usage

### Exploring Watersheds

1. Click HUC-2 region boundary
2. Navigate hierarchy via sidebar (HUC-4 through HUC-12)
3. Click HUC-12 for detailed information
4. Use sidebar panels for characteristics and metrics

### Analyzing Stream Networks

1. Enable NHDPlus layers (flowlines, catchments, waterbodies)
2. Click stream segment to select COMID
3. View flowline data in modal
4. Extract streamflow using NWM services

### Custom Analysis Areas

1. Draw polygon using drawing tool
2. View calculated metrics (area, perimeter)
3. Analyze features within polygon
4. Export results

### Station Data Access

1. Enable USGS or NWPS station layers
2. Click station marker
3. Access station information and historical data
4. View time series charts

### Flood Scenario Analysis

1. Select area (polygon or watershed)
2. Enable FIM layers
3. Configure parameters (water level, date range)
4. Generate flood scenarios
5. Analyze flood extents

## Technical Architecture

### Performance

- Web workers for parallel processing and non-blocking UI
- Geobuf compression for fast watershed data loading
- Spatial indexing with bounding box queries
- Progressive loading and intelligent caching

### Scalability

- Modular service architecture
- Auto-generated service workers and registries
- Code splitting and dynamic imports
- On-demand component and data loading

### Data Sources

- National Water Model (NWM): NOAA streamflow data
- NHDPlus: National Hydrography Dataset Plus
- WBD: Watershed Boundary Dataset (USGS)
- 3DEP: USGS 3D Elevation Program
- FIM: Office of Water Prediction Flood Inundation Mapping
- USGS: Stream gages
- NWPS: National Water Prediction Service
- NLDI: National Linked Data Infrastructure

### Browser Compatibility

- Modern browsers: Chrome, Firefox, Safari, Edge (latest versions)
- ES6+ JavaScript, Web Workers, Fetch API
- No plugins required

## Configuration

### API Keys

- NWM API Key: Required for National Water Model services
  - Enter when prompted on first use
  - Stored in browser localStorage
  - Updateable via settings

## Data Formats

**Supported Formats**

- GeoJSON: Features and geometries
- Geobuf: Compressed binary geospatial data
- Zarr: Multi-dimensional arrays for time series
- GeoTIFF: Raster elevation data
- CSV: Tabular data exports

**Export Options**

- GeoJSON: Feature collections
- CSV: Tabular data with coordinates
- JSON: Structured data

## Development

**Technologies**

- Preact: Lightweight React alternative
- Vite: Build tool and dev server
- Leaflet: Interactive mapping
- Turf.js: Geospatial analysis
- Chart.js: Data visualization
- Web Workers: Background processing

**Build Process**

- Production build: Optimized, minified bundle
- Asset hashing for cache-busting
- Automatic code splitting
- Source maps available

## Developers

- Kento Sugiyama
- Carlos Erazo Ramirez
- Ibrahim Demir

## Notes

**Performance**

- Large polygons may require longer processing time
- Multiple simultaneous layers may impact performance
- Initial data loads cached for subsequent access

**Limitations**

- Large datasets use IndexedDB; ensure sufficient storage
- Requires internet connection for data services
- API rate limits handled automatically via queuing

## License & Attribution

**Data Sources**

- USGS: Public domain data
- NOAA: Public domain data
- Federal Agencies: Public domain datasets

Version: Production Build  
Last Updated: February 2026
