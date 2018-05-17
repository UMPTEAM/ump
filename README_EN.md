# ump-master #
The web management system solution based on Vue2 and Element-UI。

## Donation
![WeChat]

## Preface ##
As a framework of UMP unified management platform, the scheme is suitable for the development of management systems used inside the company. Based on vue.js, vue-cli scaffold is used to quickly generate project directory, and Element UI component library is used to facilitate the development of fast, simple and beautiful components. Thank you for the Daniel on GitHub here.

## Function ##
- [x] homepage
- [x] resourcequery
- [x] tools
- [x] gratuity


## Directory structure ##

	|-- build                            // Webpack configuration file
	|-- config                           // Project package path
	|-- src                              // Source directory
	|   |-- components                   // Components
	|       |-- common                   // Common component
	|           |-- bus.js           	 // Event Bus
	|           |-- Header.vue           // Header component
	|           |-- Home.vue           	 // Home component
	|           |-- Sidebar.vue          // Sidebar component
	|           |-- Tags.vue
	|       |-- page                   	 // Router page
	|           |-- 403.vue
	|           |-- 404.vue
	|           |-- BaseCharts.vue       // BaseCharts
	|           |-- BaseForm.vue         // BaseForm
	|           |-- BaseTable.vue        // BaseTable
	|           |-- Login.vue          	 // Login
	|           |-- Dashboard.vue
	|           |-- DragList.vue
	|           |-- Markdown.vue         // Markdown
	|           |-- Premission.vue
	|           |-- Upload.vue           // Upload
	|           |-- VueEditor.vue        // VueEditor
	|   |-- App.vue                      // Main component
	|   |-- main.js                      // Entry file
	|-- .babelrc                         // ES6 syntax compiler configuration
	|-- .editorconfig                    // Code specification
	|-- .gitignore                       // Ignored file
	|-- index.html                       // Entry HTML file
	|-- package.json                     // Dependent configuration file
	|-- README.md                        // Readme


## Installation steps ##

	git clone https://github.com/UMPTEAM/ump.git  		// Clone templates
	cd ump-master										// Enter template directory
	npm install											// Installation dependency

## Local development ##

	// Open server and access http://localhost:8080 in browser
	npm run dev

## Constructing production ##

	// Constructing project
	npm run build



