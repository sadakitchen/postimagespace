# -*- coding: utf-8 -*-
http_path = "."
# http_dir = "../"
# css_dir = "css"
# sass_dir = "_scss"
# images_dir = "img"
# javascripts_dir = "js"
# output_style = :expanded
# line_comments = false
# cache = false
# asset_cache_buster :none

on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename

    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    end
  end
end


# 指定パスのファイルの10進数MD5を返す
# def make_query_str(path, digit=16)
#   Digest::MD5.file(path).hexdigest.hex.to_s[0, digit]
# end

# # Make a copy of sprites with a name that has no uniqueness of the hash.
# on_sprite_saved do |filename|
#   if File.exists?(filename)
#     FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
#   end
# end

# # Replace in stylesheets generated references to sprites
# # by their counterparts without the hash uniqueness.
# on_stylesheet_saved do |filename|
#   if File.exists?(filename)
#     css = File.read filename

#     # CSSから画像URLを抽出してMD5のクエリストリングのハッシュを作る
#     urls = css.scan(%r{url\(\s*'([^']*)'\s*\)})
#     query_hash = {}
#     urls.each do |url|
#       url = url[0]
#       # クライアント側の桁数制限のため先頭9桁を使う
#       query_hash[url] = make_query_str url.gsub(http_path, ''), 9
#     end

#     File.open(filename, 'w+') do |f|
#       # 生成されたCSSに先程作ったクエリストリングを付与する
#       tmp = css.gsub(%r{(url\(\s*['])([^']*)([']\s*\))}) do |match|
#         $1 + $2 + "?" + query_hash[$2] + $3
#       end
#       # ファイル名末尾についているハッシュ値を削除
#       tmp = tmp.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
#       f << tmp
#     end
#   end
# end
