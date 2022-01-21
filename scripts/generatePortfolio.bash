# use pandoc to convert portfolio.md to html(taking css), then to pdf
# pandoc --css src/css/portfolio.css portfolio.md -o documents/portfolio.pdf

# wkhtml approach
cwd=$(pwd)
cp build/portfolio/index.html build/portfolio/index_print.html
sed -i '' "s|=\"\/|=\"$cwd\/src\/|g" build/portfolio/index_print.html
wkhtmltopdf --enable-local-file-access build/portfolio/index_print.html documents/portfolio.pdf
rm build/portfolio/index_print.html
