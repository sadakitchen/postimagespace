module Jekyll
  class SetEnvGenerator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      site.config['env'] = ENV['JEKYLL_ENV'] || 'development'
    end
  end
end