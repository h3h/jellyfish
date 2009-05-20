# Jellyfish

Jellyfish is a framework for writing JavaScript for an entire web site or grouping of pages. Instead of focusing on each page and component individually as is traditional, Jellyfish lets you step back and specify the high-level structure and interaction of your JS across multiple pages from a single JS source file.

## A Complementary Framework

Jellyfish doesn't replace other JS frameworks like jQuery or YUI—it runs right alongside them and complements their functionality with page-level abilities. Jellyfish is most at home with jQuery, but can perform simple duties without any library present. In the future, Jellyfish may be extended to work directly with other JS frameworks.

## Dive In with an Example

    jQuery(document).jellyfish(function () {
    
      bloom('/about', function () {
        sting('#header/click', function (evt) {
          alert("Hi there.");
        });
      });
    
    });

## Concepts

Jellyfish defines a couple of its own concepts to separate page-level interaction from event-level interaction within a page.

### Blooms

Blooms can be thought of as sections of code that are only run if their given URL matches the current URL loaded in the browser. Blooms also provide convenient access to page-level attributes like the query parameters and, optionally, can treat other pieces of the URL as parameters (akin to Rails' routes).

Accordingly, the URL matcher for a bloom can be a simple string, a route-like string with embedded parameters, or a `RegExp` object. Matches from a route string or a RegExp will be passed in to the bloom's executable method for later use.

### Stings

Stings are event-level specifications within a bloom that indicate which event listeners should be added on which elements within a page. Each string has a specification string in the format `"{selector}/{event}"` and a corresponding function to execute when the given event is fired.

## Advanced Usage

### Global Bloom

…

### Loading Other JavaScript Files

…

### Custom Events

…

## Author

Jellyfish was written by Brad Fults—<bfults@gmail.com>.

## Inspiration

Inspiration for this project came from [quirkey's sammy][sammy] and [Sinatra][sinatra], a Ruby microframework.

 [sammy]: http://github.com/quirkey/sammy
 [sinatra]: http://github.com/sinatra/sinatra

## License

Jellyfish is released under the MIT License. See LICENSE for more information.
