# FloodRSS: Flood Resilience Support System

FloodRSS (Flood Resilience Support System) is a web-based interactive tool designed to support community-based flood risk awareness and communication. The application provides a user-friendly interface for visualizing flood susceptibility maps using fuzzy logic integrated with geospatial analysis. Users can explore real-time or scenario-based flood classifications through intuitive sliders and map overlays.

## 🌐 Website Access

[Live Demo](https://github.com/uihilab/FloodRSS/)

## 📂 Features

- Interactive flood susceptibility classification based on:
  - **Physical Indicators**: DEM (Elevation), Slope, Soil type, Land Use / Land Cover (LULC), River drainage density
  - **Socio-Economic Indicators**: Population density, Median household income, Road distance, Child and aged population, Renter percentage
- Multiple vulnerability map layers (Physical, Socio-Economic, Integrated)
- Slider-based control for real-time scenario adjustments with customizable weights
- Interactive Google Maps visualization with GeoJSON-based spatial data rendering
- Data service page for querying and downloading CSV data
- Statistics page with vulnerability distribution charts
- Responsive map overlays and visual legends
- Client-side data processing (no backend required)

## 📁 Folder Structure

```
FloodRSS/
│
├── index.html             # Main interactive map page
├── services/             # Service pages
│   ├── about.html        # About page with methodology
│   ├── dataservice.html  # Data query and CSV export
│   ├── stat.html         # Statistics and charts
│   ├── help.html         # Help documentation
│   └── home-page.html    # Alternative home page
├── css/                  # Stylesheets
│   ├── style_1.css       # Main application styles
│   ├── bootstrap.min.css
│   ├── bootstrap-icons.css
│   └── templatemo-tiya-golf-club.css
├── js/                   # JavaScript files
│   ├── script_1.js       # Main map logic and calculations
│   └── *.js              # Additional libraries
├── data/                 # Geospatial and dataset files
│   ├── cr_dataset.csv    # Main flood vulnerability dataset
│   ├── cedarRapids2.json # GeoJSON map data
│   └── *.geojson         # Additional geospatial data
├── images/               # Image assets
│   ├── icons/            # Navigation and UI icons
│   ├── maps/             # Map overlay images
│   ├── docs/             # Documentation images
│   └── people/           # Team photos
├── fonts/                # Custom fonts
└── README.md             # This file
```

## 🛠️ Technologies Used

- **HTML5**, **CSS3**, **JavaScript**
- **Google Maps JavaScript API** for interactive mapping
- **Google Charts API** for statistical visualization
- **GeoJSON** for spatial data
- **jQuery** for DOM manipulation
- **Bootstrap** for UI components
- Client-side CSV processing

## 👩‍💼 Authors & Credits

This application was developed by Samiul Hasan as part of a community-oriented flood risk communication tool under the guidance of the Hydroinformatics Lab at the University of Iowa.

Special thanks to:
- **Dr. Ibrahim Demir**
- **Yusuf** (Deployment support)

## 📜 License

This project is open source under the [MIT License](LICENSE).

---

*For questions or contributions, please contact the development team or open an issue in this repository.*
