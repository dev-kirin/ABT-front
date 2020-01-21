##########################################################################
# Base image begin
##########################################################################
FROM devkirin/abt-front:latest
##########################################################################
# Base image end
##########################################################################



##########################################################################
# ENV VAR begin
##########################################################################
# ARG RAILS_ENV=development
ENV DEBIAN_FRONTEND noninteractive
##########################################################################
# ENV VAR end
##########################################################################



##########################################################################
# Setup app begin
# Private stuff below, do not include for building base image
# Below adds app code to the image, so do not include in public image
##########################################################################
# setup nginx
RUN rm /etc/nginx/sites-available/default
RUN rm /etc/nginx/sites-enabled/default
COPY config/nginx/sites-enabled/ /etc/nginx/sites-enabled/

# copy src code
COPY . /app/ABT-front

# compile assets
RUN yarn build
##########################################################################
# Setup app end
##########################################################################



##########################################################################
# Starting commands begin
##########################################################################
# start null service
CMD ["tail", "-f", "/dev/null"]

# start web service with nginx
# CMD ["sh", "-c", "service nginx restart && tail -f /dev/null"]
##########################################################################
# Starting commands end
##########################################################################

